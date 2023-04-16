<template>
    <ion-page>
        <ion-header @click="onHeaderClick">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton />
                </ion-buttons>
                <ion-title>Места</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
                <ion-refresher-content />
            </ion-refresher>
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>

            <MyCoordinates v-show="showMyCoords" />
            <CategoriesGrid :parent_id="category_id" />
            <PlacesGrid :category_id="category_id" />
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/vue";
import MyCoordinates from "@/components/MyCoordinates";
import BackButton from "@/components/BackButton";
import PlacesGrid from "@/components/places/PlacesGrid";
import CategoriesGrid from "@/components/categories/CategoriesGrid";
import api from "@/plugins/api";

export default {
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton,
        IonSpinner, IonRefresher, IonRefresherContent,
        MyCoordinates,CategoriesGrid, PlacesGrid,
    },
    data() {
        return {
            category_id: this.$route.params.category_id,
            isLoading: true,

            showMyCoords: false,
            totalClicks: 0,
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        onHeaderClick() {
            this.totalClicks++;
            if (this.totalClicks >= 3) {
                this.showMyCoords = true;
            }
        },
        fetch() {
            return api.get(`/categories/${this.category_id}?expand=parent,children,places`).then(res => {
                console.log(res.data);
                //this.places = res.data;
            }).finally(() => this.isLoading = false);
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
