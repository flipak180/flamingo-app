<template>
    <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content />
    </ion-refresher>
    <div class="ion-margin-top ion-text-center" v-if="isLoading">
        <ion-spinner />
    </div>

    <ion-card v-for="category in categories" :key="category.category_id" :router-link="`/tabs/categories/${category.category_id}`">
        <img :src="'https://flamingo.spb.ru' + category.image" :alt="category.title" v-if="category.image" />
        <ion-card-header>
            <ion-card-title>{{ category.title }}</ion-card-title>
        </ion-card-header>
    </ion-card>

<!--    <p class="ion-padding" v-if="!isLoading && !categories.length">Здесь пока пусто.</p>-->
</template>

<script>
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
    IonSpinner
} from "@ionic/vue";
import {mapOutline} from "ionicons/icons";
import api from "@/plugins/api";

export default {
    name: "Categories",
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonButton,
        IonIcon,
        IonSpinner, IonRefresher, IonRefresherContent
    },
    props: ['parent_id'],
    data() {
        return {
            mapOutline,
            categories: [],
            isLoading: true,
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            return api.get(`/categories/list?parent_id=${this.parent_id}`).then(res => {
                this.categories = res.data;
            }).finally(() => this.isLoading = false);
        },
        refresh(event) {
            this.fetch(false).then(() => {
                event.target.complete();
            });
        },
    }
}
</script>

<style scoped>

</style>
