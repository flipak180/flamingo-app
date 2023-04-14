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
            <MyCoordinates v-show="showMyCoords" />
            <CategoriesGrid :parent_id="category_id" />
            <PlacesGrid :category_id="category_id" />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import MyCoordinates from "@/components/MyCoordinates";
import BackButton from "@/components/BackButton";
import PlacesGrid from "@/components/places/PlacesGrid";
import CategoriesGrid from "@/components/categories/CategoriesGrid";

export default {
    components: {
        CategoriesGrid,
        PlacesGrid,
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        MyCoordinates,
        IonButtons,
        BackButton,
    },
    data() {
        return {
            category_id: this.$route.params.category_id,
            showMyCoords: false,
            totalClicks: 0,
        }
    },
    methods: {
        onHeaderClick() {
            this.totalClicks++;
            if (this.totalClicks >= 3) {
                this.showMyCoords = true;
            }
        }
    }
}
</script>

<style scoped>

</style>
