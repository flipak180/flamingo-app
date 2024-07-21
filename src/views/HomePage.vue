<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Главная</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Главная</ion-title>
                </ion-toolbar>
            </ion-header>

            <swiper :slidesPerView="'auto'" :centeredSlides="true" :spaceBetween="30"
                    :modules="[Autoplay, Pagination]" :autoplay="{delay: 10000}" :pagination="{clickable: true}">
                <swiper-slide v-for="place in places" :key="place.id">
                    <ion-card button>
                        <img :alt="place.title" :src="'https://flamingo.spb.ru' + place.image" />
                        <ion-card-header>
                            <ion-card-title>{{ place.title }}</ion-card-title>
                            <ion-card-subtitle>{{ place.type }}</ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content v-html="place.description"></ion-card-content>
                    </ion-card>
                </swiper-slide>
            </swiper>

            <div class="ion-padding-horizontal">
                <h3>Интересные места</h3>
            </div>

            <ion-card button v-for="place in places" :key="place.id">
                <img :alt="place.title" :src="'https://flamingo.spb.ru' + place.image" />
                <ion-card-header>
                    <ion-card-title>{{ place.title }}</ion-card-title>
                    <ion-card-subtitle>{{ place.type }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content v-html="place.description"></ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/vue';
import {Swiper, SwiperSlide} from 'swiper/vue';

// import places from "@/data/places.js";
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/css/pagination';

import {ref} from "vue";
import {Autoplay, Pagination} from "swiper/modules";

const places = ref([]);

fetch('https://flamingo.spb.ru/api/articles/list')
    .then(res => res.json())
    .then(data => places.value = data);

</script>

<style scoped>

</style>
