<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton text="Назад" />
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <QuestCard />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import BackButton from "@/components/BackButton";
import QuestCard from "@/components/quests/QuestCard/QuestCard";

export default {
    name: "QuestScreen",
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton,
        QuestCard
    },
}
</script>

<style scoped>

</style>
