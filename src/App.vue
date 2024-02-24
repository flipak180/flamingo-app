<template>
    <ion-app>
        <ion-router-outlet/>
        <SplashScreen :class="{ fadeout: !isLoading }" />
    </ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import SplashScreen from "@/components/SplashScreen.vue";
import {App} from "@capacitor/app";

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

        App.addListener('appUrlOpen', (event) => {
            const domain = 'flamingo.spb.ru';
            const slug = event.url.split(domain).pop();
            if (slug) {
                this.$router.push({
                    path: slug,
                });
            }
        });
    }
}
</script>
