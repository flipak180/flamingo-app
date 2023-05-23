<template>
    <div class="card-item" :class="{'card-item_active': isActive}" @click="$router.push('/tabs/categories/2')"
         @mousedown="startTouch" @mouseup="endTouch" @mouseout="endTouch"
         @touchstart="startTouch" @touchend="endTouch" @touchmove="endTouch"  >
        <div class="card-item__header">
            <div class="card-item__type">{{ card.type }}</div>
            <div class="card-item__title">{{ card.title }}</div>
        </div>
        <div class="card-item__content">
            <div class="card-item__image" :style="{ backgroundImage: `url(${require('@/assets/' + card.image)})` }"></div>
        </div>
        <div class="card-item__footer">
            <PlacesList :places="card.places" />
        </div>
    </div>
</template>

<script>
import {IonButton, IonIcon} from "@ionic/vue";
import PlacesList from "@/components/places/PlacesList/PlacesList";

export default {
    name: "CardItem",
    props: ['card'],
    data() {
        return {
            isActive: false,
        }
    },
    components: {
        IonIcon, IonButton, PlacesList
    },
    methods: {
        startTouch() {
            this.isActive = true;
        },
        endTouch() {
            this.isActive = false;
        }
    }
}
</script>

<style scoped lang="scss" src="./CardItem.scss"></style>
