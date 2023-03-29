<template>
    <ion-page ref="page">
        <ion-header>
            <ion-toolbar>
                <ion-title>Tab 2</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content >
            <ion-card v-for="place in places" :key="place.id">
                <ion-card-header>
                    <ion-card-title>{{ place.title }}</ion-card-title>
                    <ion-card-subtitle>{{ place.coords.latitude }}, {{ place.coords.longitude }}</ion-card-subtitle>
                </ion-card-header>

                <ion-button :disabled="isDisabled(place)">Я тут</ion-button>
                <ion-button @click="openModal(place)">
                    <ion-icon slot="icon-only" :icon="mapOutline"></ion-icon>
                </ion-button>
            </ion-card>

            <ion-modal ref="modal" :presenting-element="presentingElement" :is-open="isOpen">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Modal</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="isOpen = false">Close</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content>
                    <YandexMap :settings="settings" :coordinates="[latitude, longitude]" :zoom="14" :controls="['zoomControl']">
                        <YandexMarker :coordinates="[latitude, longitude]" :marker-id="1" />
                    </YandexMap>
                </ion-content>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonButtons,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonModal,
} from '@ionic/vue';
import {onMounted, ref} from "vue";
import {useMainStore} from "@/store";
import axios from "axios";
import {mapOutline} from 'ionicons/icons';
import Place, {ApiPlace, GeoPoint} from "@/models/Place";
import { YandexMap, YandexMarker } from 'vue-yandex-maps';

const store = useMainStore()

const places = ref<Place[]>([]);
const presentingElement = ref(null);
const modal = ref(null)
const page = ref(null)
const isOpen = ref(false)
const latitude = ref(0)
const longitude = ref(0)

const settings = {
    apiKey: '048d2b9a-9e4a-481c-9799-c8f42c0ce65a', // Индивидуальный ключ API
    lang: 'ru_RU', // Используемый язык
    coordorder: 'latlong', // Порядок задания географических координат
    debug: false, // Режим отладки
    version: '2.1' // Версия Я.Карт
}

const openModal = (place: Place) => {
    isOpen.value = true;
    latitude.value = place.coords.latitude;
    longitude.value = place.coords.longitude;
}

onMounted(() => {
    presentingElement.value = page.value.$el;
})

axios.get('https://flamingo.spb.ru/api/places').then(res => {
    res.data.forEach((place: ApiPlace) => {
        places.value.push({
            id: place.id,
            title: place.title,
            coords: { latitude: place.latitude, longitude: place.longitude },
            radius: place.radius || 100
        });
    })
});

function isDisabled(place: Place): boolean {
    const distance = calcCrow(place.coords, store.coords);
    return distance > place.radius;
}

//This function takes in latitude and longitude of two locations
// and returns the distance between them as the crow flies (in meters)
function calcCrow(coords1: GeoPoint, coords2: GeoPoint) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(coords2.latitude - coords1.latitude); // deg2rad below
    const dLon = deg2rad(coords2.longitude - coords1.longitude);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(coords1.latitude)) * Math.cos(deg2rad(coords2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 1000;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
}
</script>

<style scoped>
.yandex-container {
    height: 100%;
}
</style>
