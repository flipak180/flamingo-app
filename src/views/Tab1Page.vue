<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Tab 1</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Tab 1</ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="container">
                <strong>{{ latitude }}</strong> <br>
                <strong>{{ longitude }}</strong>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/vue';
import {Geolocation} from '@capacitor/geolocation';
import {onMounted, ref} from "vue";

const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        maximumAge: 5000,
    });

    console.log('Current position:', coordinates);

    latitude.value = coordinates.coords.latitude;
    longitude.value = coordinates.coords.longitude;
}

onMounted(() => {
    printCurrentPosition();
})

const latitude = ref(0)
const longitude = ref(0)
</script>

<style scoped>
#container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>
