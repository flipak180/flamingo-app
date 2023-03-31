<template>
    <ion-app>
        <ion-router-outlet/>
    </ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {loadYmap} from "vue-yandex-maps";
import {YmapSettings} from "@/models/Ymap";

export default {
    components: {
        IonApp,
        IonRouterOutlet,
    },
    async mounted() {
        await loadYmap(YmapSettings);
    },
}
</script>
