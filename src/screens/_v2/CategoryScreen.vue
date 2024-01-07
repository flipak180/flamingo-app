<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton />
                </ion-buttons>
                <ion-title>{{ category?.title || '' }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" :fullscreen="true">
            <PlacesList :places="places" />
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/vue";
import BackButton from "@/components/BackButton";
import CardModal from "@/components/CardModal.vue";
import CardsList from "@/components/_v2/ArticlesList.vue";
import api from "@/plugins/api";
import CategoryItem from "@/components/_v2/CategoryItem.vue";
import PlacesList from "@/components/_v2/PlacesList.vue";

export default {
    name: "HomeScreen",
    components: {
        PlacesList,
        CategoryItem,
        IonRefresher, CardsList, IonRefresherContent, IonSpinner, CardModal,
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton,
    },
    data() {
        return {
            category_id: this.$route.params.category_id,
            category: null,
            places: [],
            isLoading: false,
        }
    },
    mounted() {
        this.fetchPlaces();
        this.fetchCategory();
    },
    methods: {
        fetchCategory() {
            return api.get(`/categories/details?id=${this.category_id}`).then(res => {
                this.category = res.data;
            });
        },
        fetchPlaces() {
            this.isLoading = true;
            return api.get(`/places/list?category_id=${this.category_id}`).then(res => {
                this.places = res.data;
            }).finally(() => this.isLoading = false);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
