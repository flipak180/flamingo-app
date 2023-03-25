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
                </ion-card-header>

                <ion-button :disabled="isDisabled(place)">Я тут</ion-button>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardHeader, IonButton} from '@ionic/vue';
import {ref} from "vue";
import {useMainStore} from "@/store";

const store = useMainStore()

const places = ref([
    { id: 1, title: 'Областная 1', coords: { latitude: 59.91663480805622, longitude: 30.507474479558404 }, radius: 30 },
    { id: 2, title: 'Ростелеком', coords: { latitude: 60.0211456, longitude: 30.3497216 }, radius: 30 },
    { id: 3, title: 'Прибрежная 1', coords: { latitude: 59.837910, longitude: 30.509150 }, radius: 30 },
    { id: 4, title: 'Цех', coords: { latitude: 59.912761, longitude: 30.506377 }, radius: 30 },
    { id: 5, title: 'Каток', coords: { latitude: 59.884099, longitude: 30.438722 }, radius: 30 },
]);

function isDisabled(place: any): boolean {
    const distance = calcCrow(place.coords, store.coords);
    console.log(calcCrow(place.coords, store.coords));
    return distance > place.radius;
}

//This function takes in latitude and longitude of two locations
// and returns the distance between them as the crow flies (in meters)
function calcCrow(coords1: any, coords2: any) {
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

function deg2rad(deg:number):number {
    return deg * (Math.PI / 180)
}
</script>
