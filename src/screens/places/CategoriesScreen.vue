<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton />
                </ion-buttons>
                <ion-title>Места</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <MyCoordinates />
            <Categories :parent_id="category_id" />
            <Places :category_id="category_id" />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import MyCoordinates from "@/components/MyCoordinates";
import Categories from "@/components/Categories";
import Places from "@/components/Places";
import BackButton from "@/components/BackButton";

export default {
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        MyCoordinates,
        Categories,
        Places,
        IonButtons,
        BackButton,
    },
    data() {
        return {
            category_id: this.$route.params.category_id
        }
    }
}
</script>

<style scoped>

</style>
