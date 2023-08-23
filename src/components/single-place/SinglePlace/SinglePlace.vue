<template>
    <div class="single-place" v-if="place">
        <CloseButton />
        <swiper class="single-place__images" :modules="modules" :pagination="{dynamicBullets: true}">
            <swiper-slide class="single-place__image" v-for="image in place.images" :key="image" :style="{ backgroundImage: `url(https://flamingo.spb.ru/${image})` }"></swiper-slide>
        </swiper>
        <div class="single-place__header">
            <div class="single-place__type">{{ place.type }}</div>
            <div class="single-place__title">{{ place.title }}</div>
        </div>
        <div class="single-place__content ion-padding-horizontal" v-html="place.description"></div>
        <PlaceItem :place="place.places[0]" v-if="place.places.length" />
    </div>
</template>

<script>
import CloseButton from "@/components/CloseButton";
import PlacesGrid from "@/components/places/PlacesGrid";
import CollapsedText from "@/components/common/CollapsedText/CollapsedText";
import Cards from "@/utils/data/Cards";
import PlaceItem from "@/components/places/PlaceItem/PlaceItem";
import api from "@/plugins/api";
import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/css/pagination';
import {IonicSlides} from "@ionic/vue";
import {Pagination} from "swiper";

export default {
    name: "SinglePlace",
    components: { CloseButton, PlacesGrid, CollapsedText, PlaceItem, Swiper, SwiperSlide },
    data() {
        return {
            place_id: this.$route.params.place_id,
            place: null,
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
    }
}
</script>

<style scoped lang="scss" src="./SinglePlace.scss">

</style>
