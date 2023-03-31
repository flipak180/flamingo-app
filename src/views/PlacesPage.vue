<template>
    <ion-page class="page-wrap">
        <ion-header>
            <ion-toolbar>
                <ion-title>Места</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <MyCoordinates />
            <Places />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import MyCoordinates from "@/components/MyCoordinates";
import Places from "@/components/Places";

export default {
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        MyCoordinates,
        Places,
    },
}
</script>

<style scoped>

</style>
