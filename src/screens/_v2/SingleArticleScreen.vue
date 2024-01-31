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
                            <yandex-map-default-scheme-layer :settings="{ theme: isDarkMode ? 'dark' : 'light' }" />
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

<script>
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/css/pagination';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonicSlides,
    IonPage,
    IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/vue";
import BackButton from "@/components/BackButton";
import {StatusBar} from "@capacitor/status-bar";
import {Capacitor} from "@capacitor/core";
import {Swiper, SwiperSlide} from "swiper/vue";
import CloseButton from "@/components/CloseButton.vue";
import {Pagination} from "swiper/modules";
import api from "@/plugins/api";
import CollapsedText from "@/components/common/CollapsedText.vue";
import ArticlePlaceItem from "@/components/_v2/ArticlePlaceItem.vue";
import {YMAP_API_KEY} from "@/constants";
import {YandexMap, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapMarker} from "vue-yandex-maps";
import {mapState} from "pinia";
import {useMainStore} from "@/store";
import {shareOutline} from "ionicons/icons";
import {Share} from "@capacitor/share";

export default {
    name: "SingleArticleScreen",
    components: {
        IonSpinner,
        CloseButton, Swiper, SwiperSlide,
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon,
        CollapsedText, ArticlePlaceItem,
        YandexMap, YandexMapDefaultSchemeLayer, YandexMapMarker, YandexMapDefaultFeaturesLayer
    },
    ionViewWillEnter() {
        if (Capacitor.isNativePlatform()) {
            StatusBar.hide();
        }
    },
    ionViewWillLeave() {
        if (Capacitor.isNativePlatform()) {
            StatusBar.show();
        }
    },
    data() {
        return {
            id: this.$route.params.id,
            article: null,
            isLoading: false,
            slider: null,
            modules: [IonicSlides, Pagination],
            shareOutline,

            YMAP_API_KEY,
            map: null,
            markers: [
                {
                    coordinates: [51.789682128109, 55.140428698122],
                    onClick: this.handleClick,
                },
                {
                    coordinates: [54.76778893634, 57.108481458691],
                    onClick: this.handleClick,
                },
            ]
        }
    },
    computed: {
        ...mapState(useMainStore, ['isDarkMode']),
        place() {
            return this.article.places.length > 0 ? this.article.places[0] : null
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        handleScroll(e) {
            this.emitter.emit('scroll', e.detail);
        },
        fetch() {
            this.isLoading = true;
            return api.get(`/articles/details?id=${this.id}`).then(res => {
                this.article = res.data;
            }).finally(() => this.isLoading = false);
        },
        refresh(event) {
            this.fetch(false).then(() => {
                event.target.complete();
            });
        },
        setSwiperInstance(swiper){
            this.slider = swiper;
        },
        handleClick(event) {
            console.log(event);
        },
        async share() {
            await Share.share({
                title: this.article.title,
                //text: 'Захватывающее путешествие по местам, где разворачивались главные события романа',
                url: `https://flamingo.spb.ru/tabs/home/single-article/${this.id}`,
                dialogTitle: 'Поделиться с друзьями',
            });
        },
    }
}
</script>

<style scoped lang="scss">

</style>
