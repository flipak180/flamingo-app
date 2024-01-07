<template>
    <div class="category-item"
         :class="{'category-item_active': isActive}" @click="onClick"
         @mousedown="startTouch" @mouseup="endTouch" @mouseout="endTouch"
         @touchstart="startTouch" @touchend="endTouch" @touchmove="endTouch">
        <div class="category-item__image" :style="{ backgroundImage: `url(https://flamingo.spb.ru/${category.image})` }"></div>
        <div class="category-item__title">{{ category.title }}</div>
    </div>
</template>

<script>
import {IonButton, IonIcon} from "@ionic/vue";
import PlacesList from "@/components/_v2/ArticlePlacesList.vue";

export default {
    name: "CategoryItem",
    props: ['category'],
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
        },
        onClick() {
            this.$router.push('/tabs/categories/' + this.category.category_id);
        }
    }
}
</script>

<style scoped lang="scss">
.category-item {
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 0 4px 16px;
    overflow: hidden;
    transition: transform 0.4s;
    position: relative;

    &_active {
        transform: scale(0.97);
    }

    &__image {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        height: 300px;
        position: relative;
    }

    &__title {
        background: rgba(255, 255, 255, .7);
        padding: 10px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        font-size: 20px;
        font-weight: 700;

        @media (prefers-color-scheme: dark) {
            background: rgba(var(--black-rgba), .7);
        }
    }
}
</style>
