<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <LogoutButton />
                <ion-title>Профиль</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <Visits />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import Visits from "@/components/Visits";
import LogoutButton from "@/components/LogoutButton";

export default {
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        Visits,
        LogoutButton,
    },
}
</script>

<style scoped>

</style>
