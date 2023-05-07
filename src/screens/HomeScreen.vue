<template>
    <ion-page>
        <ion-header @click="onHeaderClick">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton />
                </ion-buttons>
                <ion-title>Главная</ion-title>
                <ion-buttons slot="primary" v-show="isAdminMode">
                    <ion-button @click="$router.push({ name: 'system' })">
                        <ion-icon slot="icon-only" :icon="settingsOutline"></ion-icon>
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
            <CategoriesGrid :categories="categories" />
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonIcon,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/vue";
import MyCoordinates from "@/components/MyCoordinates";
import BackButton from "@/components/BackButton";
import CategoriesGrid from "@/components/categories/CategoriesGrid";
import api from "@/plugins/api";
import {TYPE_CATALOG, TYPE_QUEST, TYPE_ROUTE} from "@/models/Category";
import CatalogCategory from "@/components/categories/CatalogCategory";
import RouteCategory from "@/components/categories/RouteCategory";
import QuestCategory from "@/components/categories/QuestCategory";
import {settingsOutline} from "ionicons/icons";

export default {
    name: "HomeScreen",
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton,
        IonSpinner, IonRefresher, IonRefresherContent,
        MyCoordinates, CategoriesGrid,
        CatalogCategory, RouteCategory, QuestCategory,
    },
    data() {
        return {
            categories: [],
            isLoading: true,

            isAdminMode: false,
            totalClicks: 0,

            TYPE_CATALOG,
            TYPE_ROUTE,
            TYPE_QUEST,

            settingsOutline,
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        onHeaderClick() {
            this.totalClicks++;
            if (this.totalClicks >= 3) {
                this.isAdminMode = true;
            }
        },
        fetch() {
            return api.get(`/categories/list`).then(res => {
                this.categories = res.data;
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
