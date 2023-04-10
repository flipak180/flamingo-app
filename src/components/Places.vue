<template>
    <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content />
    </ion-refresher>
    <div class="ion-margin-top ion-text-center" v-if="isLoading">
        <ion-spinner />
    </div>

    <ion-card v-for="place in places" :key="place.place_id">
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

    <p class="ion-padding" v-if="!isLoading && !places.length">Здесь пока пусто.</p>
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
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    toastController
} from "@ionic/vue";
import {mapOutline} from "ionicons/icons";
import {atPlace} from "@/models/Place";
import {useProfileStore} from "@/store/profile";
import api from "@/plugins/api";
import {mapState} from "pinia";

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
        IonSpinner, IonRefresher, IonRefresherContent
    },
    data() {
        return {
            mapOutline,
            places: [],
            isLoading: true,
            atPlace,
        }
    },
    computed: {
        ...mapState(useProfileStore, ['phone'])
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            return api.get('/places').then(res => {
                this.places = res.data;
            }).finally(() => this.isLoading = false);
        },
        async openMap(place) {
            this.$router.push({ name: 'map', params: { place_id: place.place_id } });
        },
        async visit(place) {
            await api.post('/places/visit', {
                place_id: place.place_id,
                phone: this.phone,
            }).then(async (res) => {
                const toast = await toastController.create({
                    message: 'Визит сохранен',
                    duration: 1500,
                });
                await toast.present();
            }).catch(async (res) => {
                const toast = await toastController.create({
                    message: res?.response?.data?.message || 'Произошла ошибка',
                    color: 'danger',
                    duration: 1500,
                });
                await toast.present();
            });
        },
        refresh(event) {
            this.fetch(false).then(() => {
                event.target.complete();
            });
        },
    }
}
</script>

<style scoped>

</style>
