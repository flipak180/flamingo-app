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
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/css/pagination';
import {IonButtons, IonContent, IonHeader, IonicSlides, IonPage, IonSpinner, IonTitle, IonToolbar} from "@ionic/vue";
import BackButton from "@/components/BackButton";
import {StatusBar} from "@capacitor/status-bar";
import {Capacitor} from "@capacitor/core";
import {Swiper, SwiperSlide} from "swiper/vue";
import CloseButton from "@/components/CloseButton.vue";
import {Pagination} from "swiper/modules";
import api from "@/plugins/api";
import CollapsedText from "@/components/common/CollapsedText/CollapsedText.vue";
import ArticlePlaceItem from "@/components/_v2/ArticlePlaceItem.vue";
import {YMAP_API_KEY} from "@/constants";

export default {
    name: "SingleArticleScreen",
    components: {
        IonSpinner,
        CloseButton, Swiper, SwiperSlide,
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton,
        CollapsedText, ArticlePlaceItem
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

            YMAP_API_KEY,
        }
    },
    computed: {
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
        }
    }
}
</script>

<style scoped lang="scss">

</style>
