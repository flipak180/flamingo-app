<script setup>
import {IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/vue";
</script>

<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
        </ion-tabs>
    </ion-page>
</template>

<style scoped lang="scss">
ion-tab-bar {
    --background: var(--grey-light);

    @media (prefers-color-scheme: dark) {
        --background: var(--black-light);
    }
}
ion-tab-button {
    --color: var(--black);
    --color-focused: var(--pink-light);
    --ripple-color: var(--pink-light);
    --color-selected: var(--pink);

    @media (prefers-color-scheme: dark) {
        --color: #A2A2A2;
        --color-focused: #A2A2A2;
        --ripple-color: #A2A2A2;
        --color-selected: #FFFFFF;
    }
}

//ion-tab-button.hidden {
//    opacity: 0;
//    visibility: hidden;
//}
</style>
