<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>Карта</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="dismiss()">Закрыть</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <YandexMap :settings="settings" :coordinates="[this.lat, this.lon]" :zoom="16" :controls="['zoomControl']" @created="onInit">
            <!--                        <YandexMarker :coordinates="[coords.latitude, coords.longitude]" :marker-id="1" type="Circle" />-->
        </YandexMap>
    </ion-content>
</template>

<script>
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonTitle,
    IonToolbar,
    modalController
} from "@ionic/vue";
import {YandexMap, YandexMarker} from "vue-yandex-maps";
import {YmapSettings} from "@/models/Ymap";

let mapInstance;

export default {
    name: "MapModal",
    components: {
        IonButtons,
        IonButton,
        IonModal,
        YandexMap,
        // eslint-disable-next-line vue/no-unused-components
        YandexMarker,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonContent,
    },
    props: ['lat', 'lon'],
    data() {
        return {
            settings: YmapSettings,
        }
    },
    methods: {
        dismiss() {
            modalController.dismiss(null, 'cancel');
        },
        onInit(e) {
            console.log(e);

            mapInstance = e;
            const circle = new ymaps.Circle([[this.lat, this.lon], 100], {}, {
                geodesic: true
            });
            mapInstance.geoObjects.add(circle);
        }
    }
}
</script>

<style scoped>
.yandex-container {
    height: 100%;
}
</style>
