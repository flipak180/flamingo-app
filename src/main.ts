import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router';
import VueTheMask from 'vue-the-mask';

import {IonicVue} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/main.scss';
import storage from "@/plugins/storage";
import {useProfileStore} from "@/store/profile";
import {useMainStore} from "@/store";
import {piniaCapacitorPersist} from "pinia-plugin-capacitor-persist";
import {useSettingsStore} from "@/store/settings";
import {createYmaps} from "vue-yandex-maps";
import {useUserQuestsStore} from "@/store/userQuests";
import {emitter} from "@/plugins/emitter";

//
(async function () {
    // await SplashScreen.show({
    //     autoHide: false,
    // });

    const pinia = createPinia()
    pinia.use(piniaCapacitorPersist);

    const phone = await storage.get('phone');
    const onBoardingComplete = await storage.get('onboarding');

    const app = createApp(App)
        .use(IonicVue)
        .use(router)
        .use(pinia)
        .use(VueTheMask);

    app.use(createYmaps({
        apikey: '048d2b9a-9e4a-481c-9799-c8f42c0ce65a',
    }));

    app.config.globalProperties.emitter = emitter;

    const mainStore = useMainStore();
    mainStore.onBoardingComplete = !!onBoardingComplete;

    const profileStore = useProfileStore();
    profileStore.phone = phone;

    const settingsStore = useSettingsStore();
    await settingsStore.restored;

    const userQuestsStore = useUserQuestsStore();
    await userQuestsStore.restored;

    await router.isReady();

    app.mount('#app');

    // await SplashScreen.hide();
}());
