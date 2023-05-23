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
    components: {
        IonIcon, IonButton, PlacesList
    },
}
</script>

<style scoped lang="scss" src="./CardItem.scss"></style>
