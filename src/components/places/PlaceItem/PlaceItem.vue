<template>
    <div class="place-item">
        <div class="place-item__image" :style="{ background: place.image }" v-once></div>
        <div class="place-item__title">{{ place.title }}</div>
        <div class="place-item__actions">
            <ion-button size="small" v-if="!place.lastVisit">Я тут</ion-button>
            <ion-button size="small" color="success" v-else>
                <ion-icon slot="icon-only" :icon="checkmarkOutline" />
            </ion-button>
        </div>
    </div>
</template>

<script>
import {checkmarkOutline} from "ionicons/icons";

export default {
    name: "PlaceItem",
    props: ['place'],
    data() {
        return {
            checkmarkOutline
        }
    }
}
</script>

<style scoped lang="scss" src="./PlaceItem.scss">

</style>
