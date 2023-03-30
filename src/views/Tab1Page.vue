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
                    <YandexMap :settings="settings" :coordinates="[coords.latitude, coords.longitude]" :zoom="14" :controls="['zoomControl']" @created="onInit">
                        <YandexMarker :coordinates="[coords.latitude, coords.longitude]" :marker-id="1" />
                    </YandexMap>
                </ion-content>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
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

const store = useMainStore()

const settings = {
    apiKey: '048d2b9a-9e4a-481c-9799-c8f42c0ce65a', // Индивидуальный ключ API
    lang: 'ru_RU', // Используемый язык
    coordorder: 'latlong', // Порядок задания географических координат
    debug: false, // Режим отладки
    version: '2.1' // Версия Я.Карт
}

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
            mapInstance: null,
            YMap: null,
            mapOutline,
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
        await loadYmap(settings);
        // eslint-disable-next-line no-undef
        this.YMap = ymaps;
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
            this.modal.$el.dismiss();
        },
        onInit(e) {
            this.mapInstance = e;
            console.log(e);
            console.log(this.mapInstance);
            console.log(this.YMap);

            const circle = new this.YMap.Circle([[50, 75], 1000000], {}, {
                geodesic: true
            });
            this.mapInstance.geoObjects.add(circle);
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
