<template>
    <ion-page>
        <!--<ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton text="Назад" />
                </ion-buttons>
            </ion-toolbar>
        </ion-header>-->
        <ion-content :scroll-events="true" @ionScroll="handleScroll($event)">
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
                <!-- <PlaceItem :place="place.places[0]" v-if="place.places.length" /> -->
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButtons, IonContent, IonHeader, IonicSlides, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import BackButton from "@/components/BackButton";
import {StatusBar} from "@capacitor/status-bar";
import SinglePlace from "@/components/_v2/SinglePlace";
import {Capacitor} from "@capacitor/core";
import {Swiper, SwiperSlide} from "swiper/vue";
import CloseButton from "@/components/CloseButton.vue";
import {Pagination} from "swiper/modules";
import api from "@/plugins/api";
import CollapsedText from "@/components/common/CollapsedText/CollapsedText.vue";
import PlaceItem from "@/components/_v2/PlaceItem.vue";

export default {
    name: "SingleArticleScreen",
    components: {
        CloseButton, Swiper, SwiperSlide,
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton,
        SinglePlace, CollapsedText, PlaceItem
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
            place: null,
            slider: null,
            modules: [IonicSlides, Pagination],
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
            return api.get(`/articles/details?id=${this.id}`).then(res => {
                this.place = res.data;
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

<style lang="scss">
.single-place {
    margin-bottom: 75px;
    position: relative;

    &__top {
        position: relative;
        flex-grow: 1;
    }

    &__img-controls {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    &__next-img,
    &__prev-img {
        width: 100%;
        height: 100%;
        z-index: 10;
    }

    &__image {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        height: 300px !important;
    }

    &__header {
        padding: 15px;
    }

    &__type {
        color: rgba(var(--black-rgba), 0.5);
        text-transform: uppercase;
        font-weight: bold;
        font-size: 13px;
        margin-bottom: 10px;
        letter-spacing: 0.5px;

        @media (prefers-color-scheme: dark) {
            color: var(--grey);
        }
    }

    &__title {
        color: var(--black);
        font-size: 20px;
        font-weight: 700;

        @media (prefers-color-scheme: dark) {
            color: #fff;
        }
    }

    blockquote {
        border-left: 3px solid var(--pink);
        margin-left: 0;
        margin-right: 0;
        background: rgba(var(--pink-light-rgba), 0.4);
        padding: 10px 30px 10px 10px;
        border-radius: 5px;
        position: relative;
        font-size: 90%;

        &:after {
            content: '';
            background-color: var(--pink);
            background-repeat: no-repeat;
            -webkit-mask-image: url('~@/assets/icons/quote.svg');
            mask-image: url('~@/assets/icons/quote.svg');
            background-size: cover;
            width: 16px;
            height: 16px;
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }

    .place-item {
        position: fixed;
        bottom: 50px;
        left: 0;
        width: calc(100% - 30px);
        background: var(--pink-light);
        border-radius: 10px;
        padding: 10px;
        margin: 0 15px;

        @media (prefers-color-scheme: dark) {
            background: var(--black-light);
        }
    }
}
</style>
