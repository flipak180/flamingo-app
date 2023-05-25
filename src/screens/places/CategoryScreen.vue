<template>
    <ion-page>
        <ion-header @click="onHeaderClick">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton />
                </ion-buttons>
                <ion-title>{{ category?.title || '' }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
                <ion-refresher-content />
            </ion-refresher>
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>

            <div v-if="category" class="ion-padding">
                <CatalogCategory :category="category" v-if="category && category.type === TYPE_CATALOG" />
                <RouteCategory :category="category" v-if="category && category.type === TYPE_ROUTE" />
                <QuestCategory :category="category" v-if="category && category.type === TYPE_QUEST" />
            </div>
        </ion-content>
        <CardModal />
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
import BackButton from "@/components/BackButton";
import api from "@/plugins/api";
import {TYPE_CATALOG, TYPE_QUEST, TYPE_ROUTE} from "@/models/Category";
import CatalogCategory from "@/components/categories/CatalogCategory";
import RouteCategory from "@/components/categories/RouteCategory";
import QuestCategory from "@/components/categories/QuestCategory";
import CardModal from "@/components/CardModal";

export default {
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton,
        IonSpinner, IonRefresher, IonRefresherContent,
        CatalogCategory, RouteCategory, QuestCategory, CardModal
    },
    data() {
        return {
            category_id: this.$route.params.category_id,
            category: null,
            isLoading: true,

            showMyCoords: false,
            totalClicks: 0,

            TYPE_CATALOG,
            TYPE_ROUTE,
            TYPE_QUEST,
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
            return api.get(`/categories/details?id=${this.category_id}&expand=parent,children,places`).then(res => {
                this.category = res.data;
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
