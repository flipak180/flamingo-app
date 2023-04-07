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
        <YandexMap :settings="settings" :coordinates="[59.938955, 30.315644]" :zoom="11" :controls="['zoomControl']" @created="onInit">
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

let map;

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
    props: ['location'],
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
            map = e;
            // console.log(this.location);

            map.geoObjects.removeAll();

            if (this.location.length === 1) {
                console.log([59.938955, 30.315644]);
                console.log(this.location[0]);
                const circle = new ymaps.Circle([this.location[0], 15], {}, {
                    geodesic: true
                });
                map.geoObjects.add(circle);
                console.log('circle');
            }

            if (this.location.length > 1) {
                const polygon = new ymaps.Polygon([this.location], {}, {
                    fillColor: '#e05baa',
                    fillOpacity: 0.4,
                    strokeColor: '#212529',
                    strokeWidth: 1
                });
                map.geoObjects.add(polygon);
                console.log('polygon');
            }

            map.setBounds(map.geoObjects.getBounds(), {
                checkZoomRange: true,
                zoomMargin: 10
            });
        }
    }
}
</script>

<style scoped>
.yandex-container {
    height: 100%;
}
</style>
