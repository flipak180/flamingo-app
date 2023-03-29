<template>
    <ion-page ref="page">
        <ion-header>
            <ion-toolbar>
                <ion-title>Места</ion-title>
                <ion-buttons slot="primary">
                    <ion-button id="open-modal">
                        <ion-icon slot="icon-only" :icon="mapOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
                <ion-refresher-content />
            </ion-refresher>
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>

            <div id="container">
                <strong>{{ store.coords.latitude }}</strong> <br>
                <strong>{{ store.coords.longitude }}</strong>
            </div>

            <ion-modal ref="modal" trigger="open-modal" :presenting-element="presentingElement">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Modal</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="dismiss()">Close</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content>
                    <YandexMap :settings="settings" :coordinates="[store.coords.latitude, store.coords.longitude]" :zoom="14" :controls="['zoomControl']">
                        <YandexMarker :coordinates="[store.coords.latitude, store.coords.longitude]" :marker-id="1" />
                    </YandexMap>
                </ion-content>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonTitle,
    IonToolbar
} from '@ionic/vue';
import {mapOutline} from 'ionicons/icons';
import {Geolocation} from '@capacitor/geolocation';
import {onMounted, ref} from "vue";
import {useMainStore} from "@/store";
import { YandexMap, YandexMarker } from 'vue-yandex-maps';

const store = useMainStore()

const isLoading = ref(false);
const presentingElement = ref(null);
const modal = ref(null)
const page = ref(null)

const settings = {
    apiKey: '048d2b9a-9e4a-481c-9799-c8f42c0ce65a', // Индивидуальный ключ API
    lang: 'ru_RU', // Используемый язык
    coordorder: 'latlong', // Порядок задания географических координат
    debug: false, // Режим отладки
    version: '2.1' // Версия Я.Карт
}

onMounted(() => {
    printCurrentPosition();
    presentingElement.value = page.value.$el;
})

const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: false,
        maximumAge: 5000,
    });

    console.log('Current position:', coordinates);
    store.setCoords(coordinates.coords.latitude, coordinates.coords.longitude);
}

const refresh = (event) => {
    event.target.complete();
}

const dismiss = () => {
    modal.value.$el.dismiss();
}

</script>

<style scoped>
#container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
}

#container a {
    text-decoration: none;
}

.yandex-container {
    height: 100%;
}
</style>
