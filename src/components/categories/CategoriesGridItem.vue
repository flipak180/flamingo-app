<template>
    <div class="category" @click="onClick">
        <div class="image" :style="{ backgroundImage: 'url(https://flamingo.spb.ru' + category.image + ')' }"></div>
        <div class="title">{{ category.title }}</div>
    </div>
</template>

<script>
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon} from "@ionic/vue";

export default {
    name: "Categories",
    components: {
        IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
        IonButton, IonIcon,
    },
    props: ['category'],
    data() {
        return {

        }
    },
    methods: {
        onClick() {
            this.$router.push(`/tabs/categories/${this.category.category_id}`);
        }
    }
}
</script>

<style scoped lang="scss">
    .category {
        background: var(--ion-card-background, var(--ion-item-background, var(--ion-background-color, #fff)));
        box-shadow: rgba(0, 0, 0, 0.12) 0 4px 16px;
        border-radius: 10px;
        overflow: hidden;

        .image {
            height: 115px;
            background-size: cover;
            background-position: center;
            border-radius: 10px;
            box-shadow: 0 5px 5px -5px rgba(34, 60, 80, 0.6);
        }
        .title {
            font-size: 14px;
            font-weight: 700;
            padding: 5px 10px 10px;
            color: var(--ion-text-color, #000);
        }
    }
</style>
