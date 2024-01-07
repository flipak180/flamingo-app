<template>
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
        <!-- <ArticlePlaceItem :place="place.places[0]" v-if="place.places.length" /> -->
    </div>
</template>

<script>
import CloseButton from "@/components/CloseButton";
import CollapsedText from "@/components/common/CollapsedText/CollapsedText";
import ArticlePlaceItem from "@/components/_v2/ArticlePlaceItem";
import api from "@/plugins/api";
import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/css/pagination';
import {IonicSlides} from "@ionic/vue";
import {Pagination} from "swiper/modules";

export default {
    name: "SinglePlace",
    components: { CloseButton, CollapsedText, ArticlePlaceItem, Swiper, SwiperSlide },
    data() {
        return {
            place_id: this.$route.params.place_id,
            place: null,
            slider: null,
            modules: [IonicSlides, Pagination],
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            return api.get(`/events/details?id=${this.place_id}`).then(res => {
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

<style scoped lang="scss">
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
        height: 300px;
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
