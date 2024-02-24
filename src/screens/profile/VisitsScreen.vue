<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton text="Назад" />
                </ion-buttons>
                <ion-title>Визиты</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <Visits />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import Visits from "@/components/Visits.vue";
import BackButton from "@/components/BackButton.vue";

export default {
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        Visits,
        IonButtons,
        BackButton
    },
}
</script>

<style scoped>

</style>
