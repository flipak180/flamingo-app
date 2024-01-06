<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Flamin<span class="highlighted">GO</span></ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="categories">
                <div class="categories__item" v-for="category in categories" :key="category.id">
                    <div class="categories__image" :style="{ backgroundImage: `url(https://flamingo.spb.ru/${category.image})` }"></div>
                    <div class="categories__title">{{ category.title }}</div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/vue";
import BackButton from "@/components/BackButton";
import CardModal from "@/components/CardModal.vue";
import CardsList from "@/components/_v2/CardsList.vue";
import api from "@/plugins/api";
import CardItem from "@/components/_v2/CardItem.vue";

export default {
    name: "HomeScreen",
    components: {
        CardItem,
        IonRefresher, CardsList, IonRefresherContent, IonSpinner, CardModal,
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton,
    },
    data() {
        return {
            categories: [],
            isLoading: false,
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            this.isLoading = true;
            return api.get(`/categories/list`).then(res => {
                this.categories = res.data;
            }).finally(() => this.isLoading = false);
        }
    }
}
</script>

<style lang="scss" scoped>

.categories {

    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;

    &__item {
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.12) 0 4px 16px;
        overflow: hidden;
        transition: transform 0.4s;
        position: relative;
    }

    &__image {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        height: 300px;
        position: relative;
    }

    &__title {
        background: rgba(255, 255, 255, .4);
        padding: 10px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;

        @media (prefers-color-scheme: dark) {
            background: rgba(var(--black-rgba), .4);
        }
    }
}

</style>
