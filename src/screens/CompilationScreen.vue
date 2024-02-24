<template>
    <ion-page>
        <!--<ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton text="Назад" />
                </ion-buttons>
            </ion-toolbar>
        </ion-header>-->
        <ion-content :scroll-events="true" @ionScroll="handleScroll($event)">
            <CompilationCard />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import BackButton from "@/components/BackButton.vue";
import CompilationCard from "@/components/compilations/CompilationCard/CompilationCard.vue";
import {StatusBar} from "@capacitor/status-bar";

export default {
    name: "CompilationScreen",
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton,
        CompilationCard
    },
    ionViewWillEnter() {
        StatusBar.hide();
    },
    ionViewWillLeave() {
        StatusBar.show();
    },
    methods: {
        handleScroll(e) {
            this.emitter.emit('scroll', e.detail);
        },
    }
}
</script>

<style scoped>

</style>
