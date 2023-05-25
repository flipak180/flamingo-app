<template>
    <ion-page>
        <!--<ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton text="Назад" />
                </ion-buttons>
            </ion-toolbar>
        </ion-header>-->
        <ion-content>
            <CompilationCard />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import BackButton from "@/components/BackButton";
import CompilationCard from "@/components/compilations/CompilationCard/CompilationCard";

export default {
    name: "CompilationScreen",
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton,
        CompilationCard
    },
}
</script>

<style scoped>

</style>
