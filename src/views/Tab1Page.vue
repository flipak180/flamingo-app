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
            <div id="container">
                <strong>{{ coords.latitude }}</strong> <br>
                <strong>{{ coords.longitude }}</strong>
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
                    <YandexMap :settings="settings" :coordinates="[coords.latitude, coords.longitude]" :zoom="16" :controls="['zoomControl']" @created="onInit">
<!--                        <YandexMarker :coordinates="[coords.latitude, coords.longitude]" :marker-id="1" type="Circle" />-->
                    </YandexMap>
                </ion-content>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>

<script>
/* eslint-disable */
import {Geolocation} from '@capacitor/geolocation';
import {useMainStore} from "@/store";
import {loadYmap, YandexMap, YandexMarker} from 'vue-yandex-maps';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/vue";
import {mapOutline} from "ionicons/icons";
import {mapState} from "pinia";
import {toRaw} from "vue";

const store = useMainStore()

let mapInstance;

export default {
    components: {
        IonButtons,
        IonButton,
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonIcon,
        IonModal,
        YandexMap,
        YandexMarker
    },
    data() {
        return {
            presentingElement: null,
            modal: null,
            page: null,
            YMap: null,
            mapOutline,
            settings: {
                apiKey: '048d2b9a-9e4a-481c-9799-c8f42c0ce65a', // Индивидуальный ключ API
                lang: 'ru_RU', // Используемый язык
                coordorder: 'latlong', // Порядок задания географических координат
                debug: false, // Режим отладки
                version: '2.1' // Версия Я.Карт
            }
        }
    },
    computed: {
        ...mapState(useMainStore, {
            coords: "coords",
        })
    },
    async mounted() {
        this.presentingElement = this.$refs.page.$el;
        await this.printCurrentPosition();
        await loadYmap(this.settings);
    },
    methods: {
        async printCurrentPosition() {
            const coordinates = await Geolocation.getCurrentPosition({
                enableHighAccuracy: false,
                maximumAge: 5000,
            });

            console.log('Current position:', coordinates);
            store.setCoords(coordinates.coords.latitude, coordinates.coords.longitude);
        },
        refresh(e) {
            e.target.complete();
        },
        dismiss() {
            this.$refs.modal.$el.dismiss();
        },
        onInit(e) {
            mapInstance = e;

            const circle = new ymaps.Circle([[this.coords.latitude, this.coords.longitude], 100], {}, {
                geodesic: true
            });
            mapInstance.geoObjects.add(circle);
        }
    }
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
