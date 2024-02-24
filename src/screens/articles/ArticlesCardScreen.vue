<template>
    <ion-page>
        <ion-content :scroll-events="true" @ionScroll="handleScroll($event)">
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>
            <div v-else>
                <div class="single-place" v-if="article">
                    <CloseButton />
                    <div class="single-place__top">
                        <swiper class="single-place__images" @swiper="setSwiperInstance" :modules="modules" :pagination="article.images.length > 1">
                            <swiper-slide class="single-place__image" v-for="image in article.images" :key="image" :style="{ backgroundImage: `url(https://flamingo.spb.ru/${image})` }"></swiper-slide>
                        </swiper>
                        <div class="single-place__img-controls">
                            <div class="single-place__prev-img" @click="slider.slidePrev()"></div>
                            <div class="single-place__next-img" @click="slider.slideNext()"></div>
                        </div>
                    </div>
                    <div class="single-place__header">
                        <div class="single-place__type">{{ article.type }}</div>
                        <div class="single-place__title">{{ article.title }}</div>
                    </div>
                    <div class="single-place__content ion-padding-horizontal" v-html="article.description"></div>
    <!--                <div class="single-place__map" v-if="place && place.coords">-->
    <!--                    <img :src="`https://static-maps.yandex.ru/v1?ll=${place.coords.reverse().join(',')}&apikey=${YMAP_API_KEY}&z=15`" alt="">-->
    <!--                </div>-->
    <!--                 <ArticlePlaceItem :place="place" v-if="place" />-->

                    <div class="single-place__map">
                        <yandex-map v-model="map" :settings="{location: {center: [30.251378, 59.932160], zoom: 17}}" width="100%" height="200px">
                            <yandex-map-default-scheme-layer :settings="{ theme: mainStore.isDarkMode ? 'dark' : 'light' }" />
                            <yandex-map-default-features-layer/>
                            <yandex-map-marker :settings="{coordinates: [30.251378, 59.932160], onClick: handleClick}"
                            >
                                <div class="marker"/>
                            </yandex-map-marker>
                        </yandex-map>
                    </div>

                    <hr>

                    <div class="text-center" style="margin-top: 50px;">
                        <ion-button color="light" @click="share">
                            <ion-icon slot="start" :icon="shareOutline"></ion-icon>
                            Поделиться статьей
                        </ion-button>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/css/pagination';
import {
    IonButton,
    IonContent,
    IonIcon,
    IonicSlides,
    IonPage,
    IonSpinner,
    onIonViewWillEnter,
    onIonViewWillLeave
} from "@ionic/vue";
import {StatusBar} from "@capacitor/status-bar";
import {Capacitor} from "@capacitor/core";
import {Swiper, SwiperSlide} from "swiper/vue";
import CloseButton from "@/components/CloseButton.vue";
import {Pagination} from "swiper/modules";
import api from "@/plugins/api";
import {YandexMap, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapMarker} from "vue-yandex-maps";
import {shareOutline} from "ionicons/icons";
import {Share} from "@capacitor/share";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useMainStore} from "@/store";
import {useEmitter} from "@/plugins/emitter";

const route = useRoute()
const mainStore = useMainStore()
const { emitter } = useEmitter()

const id = ref(route.params.id)
const article = ref(null)
const isLoading = ref(false)
const slider = ref(null)
const modules = ref([IonicSlides, Pagination])
const map = ref(null)
// const markers = ref([
//     {
//         coordinates: [51.789682128109, 55.140428698122],
//         onClick: handleClick,
//     },
//     {
//         coordinates: [54.76778893634, 57.108481458691],
//         onClick: handleClick,
//     },
// ])

// const place = computed(() => {
//     return article.value.places.length > 0 ? article.value.places[0] : null
// })

function handleScroll(e) {
    emitter.emit('scroll', e.detail);
}

function fetch() {
    isLoading.value = true;
    return api.get(`/articles/details?id=${id.value}`).then(res => {
        article.value = res.data;
    }).finally(() => isLoading.value = false);
}

// function refresh(event) {
//     fetch(false).then(() => {
//         event.target.complete();
//     });
// }

function setSwiperInstance(swiper){
    slider.value = swiper;
}

function handleClick(event) {
    console.log(event);
}

async function share() {
    await Share.share({
        title: article.value.title,
        text: article.value.type,
        url: `https://flamingo.spb.ru/tabs/articles/${id.value}`,
        dialogTitle: 'Поделиться с друзьями',
    });
}

onMounted(() => {
    fetch();
})

onIonViewWillEnter(() => {
    if (Capacitor.isNativePlatform()) {
        StatusBar.hide();
    }
});

onIonViewWillLeave(() => {
    if (Capacitor.isNativePlatform()) {
        StatusBar.show();
    }
});
</script>

<style scoped lang="scss">

</style>
