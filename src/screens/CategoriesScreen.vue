<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Категории</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding">
            <div class="panel">
                <div class="panel__title">
                    Достопримечательности
                </div>
            </div>
            <div class="panel">
                <div class="panel__title">
                    Пешеходные квесты
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import BackButton from "@/components/BackButton.vue";

export default {
    name: "HomeScreen",
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton,
    },
    data() {
        return {

        }
    },
}
</script>

<style lang="scss" scoped>

</style>
