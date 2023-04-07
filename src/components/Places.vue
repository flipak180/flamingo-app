<template>
    <ion-card v-for="place in places" :key="place.id">
        <ion-card-header>
            <ion-card-title>{{ place.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-button size="small" :disabled="!atPlace(place)" @click="visit(place)">Я тут</ion-button>
            <ion-button size="small" @click="openMap(place)">
                <ion-icon slot="icon-only" :icon="mapOutline"></ion-icon>
            </ion-button>
        </ion-card-content>
    </ion-card>
</template>

<script>
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    toastController
} from "@ionic/vue";
import {mapOutline} from "ionicons/icons";
import axios from "axios";
import {atPlace} from "@/models/Place";

export default {
    name: "Places",
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonButton,
        IonIcon,
    },
    data() {
        return {
            mapOutline,
            places: [],
            atPlace,
        }
    },
    mounted() {
        this.loadPlaces();
    },
    methods: {
        loadPlaces() {
            axios.get('https://flamingo.spb.ru/api/places').then(res => {
                this.places = res.data;
            });
        },
        async openMap(place) {
            this.$router.push({ name: 'map', params: { place_id: place.id } });
        },
        async visit(place) {
            await axios.get(`https://flamingo.spb.ru/api/places/visit?place_id=${place.id}`).then(res => {

            });

            const toast = await toastController.create({
                message: 'Визит сохранен',
                duration: 1500,
            });

            await toast.present();
        }
    }
}
</script>

<style scoped>

</style>
