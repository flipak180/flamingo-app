<template>
    <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content />
    </ion-refresher>
    <div class="ion-margin-top ion-text-center" v-if="isLoading">
        <ion-spinner />
    </div>

    <div class="places-grid">
        <PlacesGridItem v-for="place in places" :key="place.place_id" :place="place" />
    </div>
</template>

<script>
import {IonRefresher, IonRefresherContent, IonSpinner, toastController} from "@ionic/vue";
import PlacesGridItem from "@/components/places/PlacesGridItem";
import {mapOutline} from "ionicons/icons";
import {atPlace} from "@/models/Place";
import {mapState} from "pinia";
import {useProfileStore} from "@/store/profile";
import api from "@/plugins/api";

export default {
    name: "PlacesGrid",
    components: {
        PlacesGridItem, IonSpinner, IonRefresher, IonRefresherContent,
    },
    props: ['category_id'],
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
            return api.get(`/places/list?category_id=${this.category_id}`).then(res => {
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

<style lang="scss" scoped>
    .places-grid {
        padding: 15px;
    }
</style>
