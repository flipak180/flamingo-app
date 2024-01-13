<template>
    <ion-page>
        <ion-content :scroll-events="true" @ionScroll="handleScroll($event)">
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>
            <div v-else>
                <div class="single-place" v-if="place">
                    <CloseButton />
                    <div class="single-place__top">
                        <swiper class="single-place__images" @swiper="setSwiperInstance" :modules="modules" :pagination="place.images.length > 1">
                            <swiper-slide class="single-place__image" v-for="image in place.images" :key="image" :style="{ backgroundImage: `url(https://flamingo.spb.ru/${image})` }"></swiper-slide>
                        </swiper>
                        <div class="single-place__img-controls">
                            <div class="single-place__prev-img" @click="slider.slidePrev()"></div>
                            <div class="single-place__next-img" @click="slider.slideNext()"></div>
                        </div>
                    </div>
                    <div class="single-place__header">
                        <div class="single-place__type">{{ place.type }}</div>
                        <div class="single-place__title">{{ place.title }}</div>
                    </div>
                    <div class="single-place__content ion-padding-horizontal" v-html="place.description"></div>
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
import {heartOutline, shareOutline} from "ionicons/icons";
import {Capacitor} from "@capacitor/core";
import CloseButton from "@/components/CloseButton.vue";
import api from "@/plugins/api";
import {Swiper, SwiperSlide} from "swiper/vue";
import {Pagination} from "swiper/modules";
import CollapsedText from "@/components/common/CollapsedText.vue";

export default {
    name: "PlaceDetailsScreen",
    components: {
        IonSpinner,
        CloseButton, Swiper, SwiperSlide,
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, CollapsedText
    },
    data() {
        return {
            heartOutline,
            shareOutline,

            place_id: this.$route.params.place_id,
            place: null,
            isLoading: false,

            slider: null,
            modules: [IonicSlides, Pagination],
        }
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
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            this.isLoading = true;
            return api.get(`/places/details?id=${this.place_id}`).then(res => {
                this.place = res.data;
            }).finally(() => this.isLoading = false);
        },
        handleScroll(e) {
            this.emitter.emit('scroll', e.detail);
        },
        setSwiperInstance(swiper){
            this.slider = swiper;
        }
    }
}
</script>

<style scoped lang="scss">

</style>
