<template>
    <ion-list>
<!--        <ion-list-header>-->
<!--            <ion-label>Личное</ion-label>-->
<!--        </ion-list-header>-->
        <ion-item button router-link="/tabs/profile/visits">
            <ion-label>Визиты</ion-label>
        </ion-item>
        <ion-item button router-link="/tabs/profile/planning">
            <ion-label>Планирование</ion-label>
        </ion-item>
    </ion-list>
</template>

<script>
import {IonItem, IonLabel, IonList, IonListHeader} from "@ionic/vue";

export default {
    name: "Profile",
    components: { IonList, IonListHeader, IonItem, IonLabel }
}
</script>

<style scoped>

</style>
