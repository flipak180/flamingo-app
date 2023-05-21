<template>
    <div class="card-item" @click="$router.push('/tabs/categories/2')">
        <div class="card-item__header">
            <div class="card-item__type">{{ card.type }}</div>
            <div class="card-item__title">{{ card.title }}</div>
        </div>
        <div class="card-item__content">
            <div class="card-item__image" :style="{ backgroundImage: `url(${require('@/assets/' + card.image)})` }"></div>
        </div>
        <div class="card-item__footer">
            <div class="places-list" v-if="card.places.length">
                <div class="place-item" v-for="place in card.places">
                    <div class="place-item__image" :style="{ background: place.image }" v-once></div>
                    <div class="place-item__title">{{ place.title }}</div>
                    <div class="place-item__actions">
                        <ion-button size="small" v-if="!place.lastVisit">Я тут</ion-button>
                        <ion-button size="small" color="success" v-else>
                            <ion-icon slot="icon-only" :icon="checkmarkOutline" />
                        </ion-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {IonButton, IonIcon} from "@ionic/vue";
import {checkmarkOutline} from "ionicons/icons";

export default {
    name: "CardItem",
    props: ['card'],
    components: {
        IonIcon, IonButton,
    },
    data() {
        return {
            checkmarkOutline
        }
    }
}
</script>

<style scoped lang="scss" src="./CardItem.scss"></style>
