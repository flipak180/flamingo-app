<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Места</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <MyCoordinates />
            <PlacesGrid />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import MyCoordinates from "@/components/MyCoordinates";
import PlacesGrid from "@/components/places/PlacesGrid";

export default {
    components: {
        PlacesGrid,
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        MyCoordinates,
    },
}
</script>

<style scoped>

</style>
