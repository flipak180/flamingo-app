<template>
    <ion-app>
        <ion-router-outlet/>
        <SplashScreen :class="{ fadeout: !isLoading }" />
    </ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import SplashScreen from "@/components/SplashScreen";

export default {
    components: {
        IonApp,
        IonRouterOutlet,
        SplashScreen
    },
    data() {
        return {
            isLoading: true,
        }
    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false;
        }, 1500);
    }
}
</script>
