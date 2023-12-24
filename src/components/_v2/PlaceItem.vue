<template>
    <div class="place-item" @click="$router.push({ name: 'placeDetails', params: { place_id: place.id } });">
        <div class="place-item__image" :style="{ background: place.image }" v-once></div>
        <div class="place-item__title">{{ place.title }}</div>
        <div class="place-item__actions">
            <ion-button size="small" color="default">
                <ion-icon slot="icon-only" :icon="chevronForwardOutline" />
            </ion-button>
            <!--<ion-button size="small" v-if="!place.lastVisit" :color="place.atPlace ? 'primary' : 'light'"
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
            </ion-button>-->
        </div>
    </div>
</template>

<script>
import {checkmarkOutline, chevronForwardOutline} from "ionicons/icons";
import {IonButton, IonIcon} from "@ionic/vue";
import {visit} from "@/models/Place";

export default {
    name: "PlaceItem",
    props: ['place'],
    components: { IonButton, IonIcon },
    data() {
        return {
            checkmarkOutline,
            chevronForwardOutline
        }
    },
    methods: {
        onButtonClick() {
            visit(this.place);
        }
    }
}
</script>

<style scoped lang="scss">
.place-item {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    //border-bottom: 1px solid var(--grey);
    padding-bottom: 10px;
    position: relative;

    &:after {
        content: '';
        width: 85%;
        height: 1px;
        background: var(--grey);
        position: absolute;
        bottom: 0;
        right: 0;
    }

    &:last-child {
        // border: none;
        // padding-bottom: 0;

        &:after {
            display: none;
        }
    }

    &__image {
        display: block;
        flex: 0 0 35px;
        height: 35px;
        border-radius: 5px;
    }

    &__title {
        font-weight: 700;
        min-height: 35px;
        font-size: 14px;
        color: var(--ion-text-color, #000);
        flex-grow: 1;
        padding-top: 5px;
    }

    &__actions {

        ion-button {
            --color: var(--black);

            @media (prefers-color-scheme: dark) {
                --color: #FFFFFF;
            }
        }
    }
}
</style>
