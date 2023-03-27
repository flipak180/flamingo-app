<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Tab 2</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Tab 2</ion-title>
                </ion-toolbar>
            </ion-header>

            <ion-card v-for="place in places" :key="place.id">
                <ion-card-header>
                    <ion-card-title>{{ place.title }}</ion-card-title>
                    <ion-card-subtitle>{{ place.coords.latitude }}, {{ place.coords.longitude }}</ion-card-subtitle>
                </ion-card-header>

                <ion-button :disabled="isDisabled(place)">Я тут</ion-button>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/vue';
import {ref} from "vue";
import {useMainStore} from "@/store";
import axios from "axios";
import Place, {ApiPlace, GeoPoint} from "@/models/Place";

const store = useMainStore()

const places = ref<Place[]>([]);

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
