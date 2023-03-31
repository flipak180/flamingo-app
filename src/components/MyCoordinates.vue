<template>
    <div class="my-coordinates">
        {{ coords.latitude }}, {{ coords.longitude }}
        <ion-button size="small" @click="openMap">
            <ion-icon slot="icon-only" :icon="mapOutline"></ion-icon>
        </ion-button>
    </div>
</template>

<script>
import {mapState} from "pinia";
import {useMainStore} from "@/store";
import {IonButton, IonIcon, modalController} from "@ionic/vue";
import {mapOutline} from "ionicons/icons";
import MapModal from "@/components/MapModal";

export default {
    name: "MyCoordinates",
    components: {
        IonButton,
        IonIcon,
    },
    data() {
        return {
            mapOutline,
        }
    },
    computed: {
        ...mapState(useMainStore, {
            coords: "coords",
        })
    },
    methods: {
        async openMap() {
            const modal = await modalController.create({
                component: MapModal,
                componentProps: {
                    lat: this.coords.latitude,
                    lon: this.coords.longitude,
                },
                presentingElement: document.querySelector('.page-wrap'),
            });
            await modal.present();
        }
    }
}
</script>

<style scoped>
.my-coordinates {
    background-color: var(--ion-color-medium);
    color: var(--ion-color-medium-contrast);
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    align-items: center;
}
</style>
