<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <flamingo-title />
            </ion-toolbar>
        </ion-header>
        <ion-content>

        </ion-content>
    </ion-page>
</template>

<script setup>
import {IonContent, IonHeader, IonPage, IonToolbar} from '@ionic/vue';
import FlamingoTitle from "@/components/FlamingoTitle.vue";
</script>

<style scoped>
flamingo-title {
    --color: #fff;
    font-size: 24px;
}
</style>
