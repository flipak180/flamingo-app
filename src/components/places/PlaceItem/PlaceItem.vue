<template>
    <div class="place-item">
        <div class="place-item__image" :style="{ background: place.image }" v-once></div>
        <div class="place-item__title">{{ place.title }}</div>
        <div class="place-item__actions">
            <ion-button size="small" v-if="!place.lastVisit" :color="place.atPlace ? 'primary' : 'light'"
                        @click.stop="onButtonClick"
                        @mousedown.stop @mouseup.stop @mouseout.stop
                        @touchstart.stop @touchend.stop @touchmove.stop>
                Я тут
            </ion-button>
            <ion-button size="small" color="success" v-else
                        @click.stop="onButtonClick"
                        @mousedown.stop @mouseup.stop @mouseout.stop
                        @touchstart.stop @touchend.stop @touchmove.stop>
                <ion-icon slot="icon-only" :icon="checkmarkOutline" />
            </ion-button>
        </div>
    </div>
</template>

<script>
import {checkmarkOutline} from "ionicons/icons";
import {IonButton, IonIcon} from "@ionic/vue";
import {visit} from "@/models/Place";

export default {
    name: "PlaceItem",
    props: ['place'],
    components: { IonButton, IonIcon },
    data() {
        return {
            checkmarkOutline
        }
    },
    methods: {
        onButtonClick() {
            visit(this.place);
        }
    }
}
</script>

<style scoped lang="scss" src="./PlaceItem.scss">

</style>
