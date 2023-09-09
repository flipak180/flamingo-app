<template>
    <div class="places-filter">
        <ion-button size="small" color="light">
            <ion-icon slot="icon-only" :icon="searchOutline"></ion-icon>
        </ion-button>
        <ion-button size="small" color="light">
            <ion-icon slot="icon-only" :icon="filterOutline"></ion-icon>
        </ion-button>
        <ion-button size="small" color="light">
            Тип события
            <ion-icon slot="end" :icon="chevronDownOutline"></ion-icon>
        </ion-button>
    </div>
</template>

<script>
import {IonButton, IonIcon} from "@ionic/vue";
import {chevronDownOutline, filterOutline, searchOutline} from "ionicons/icons";

export default {
    name: "PlacesFilter",
    components: {
        IonButton, IonIcon
    },
    data() {
        return {
            searchOutline,
            filterOutline,
            chevronDownOutline,
        }
    }
}
</script>

<style scoped lang="scss">
.places-filter {
    //position: fixed;
    //top: calc(-75px + var(--ion-safe-area-top));
    //left: calc(0 + var(--ion-safe-area-left));
    //padding: 10px 15px;
    //width: 100%;
    //z-index: 10;
    //background: var(--ion-background-color);
    //transition: top 0.3s;
    //
    //&.visible {
    //    top: calc(0 + var(--ion-safe-area-top));
    //}
}
</style>
