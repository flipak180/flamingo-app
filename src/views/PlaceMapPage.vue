<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton />
                </ion-buttons>
                <ion-title>Карта</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div id="map"></div>
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import {YmapSettings} from "@/models/Ymap";
import BackButton from "@/components/BackButton";
import axios from "axios";
import {mapState} from "pinia";
import {useMainStore} from "@/store";

let map;

export default {
    name: "PlaceMapPage",
    components: {
        IonButtons,
        BackButton,
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
    },
    data() {
        return {
            settings: YmapSettings,
            place: null,
        }
    },
    mounted() {
        ymaps.ready(() => {
            this.setupMap();
            this.fetch();
        })
    },
    computed: {
        ...mapState(useMainStore, ['coords'])
    },
    methods: {
        fetch() {
            if (!this.$route.params.place_id) {
                return;
            }

            axios.get(`https://flamingo.spb.ru/api/places/${this.$route.params.place_id}`).then(res => {
                this.place = res.data;
                this.renderLocation();
            });
        },
        setupMap() {
            map = new ymaps.Map('map', {
                center: [59.938955, 30.315644],
                zoom: 11,
                controls: ['zoomControl', 'geolocationControl'],
            });

            map.geoObjects.removeAll();
        },
        renderLocation() {
            const location = this.place.location[0];
            const polygon = new ymaps.Polygon([location], {}, {
                fillColor: '#e05baa',
                fillOpacity: 0.4,
                strokeColor: '#212529',
                strokeWidth: 1
            });
            map.geoObjects.add(polygon);

            const placemark = new ymaps.Placemark([this.coords.latitude, this.coords.longitude], {}, {
                preset: "islands#circleDotIcon",
                iconColor: '#ff0000'
            });
            map.geoObjects.add(placemark);

            setTimeout(() => {
                map.setBounds(polygon.geometry.getBounds(), {
                    checkZoomRange: true,
                    zoomMargin: 10
                });
            }, 500)
        }
    }
}
</script>

<style scoped>
#map,
.yandex-container {
    height: 100%;
}
</style>
