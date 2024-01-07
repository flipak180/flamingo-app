<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Flamin<span class="highlighted">GO</span></ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="categories">
                <CategoryItem v-for="category in categories" :key="category.id" :category="category" />
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
import CardsList from "@/components/_v2/ArticlesList.vue";
import api from "@/plugins/api";
import CategoryItem from "@/components/_v2/CategoryItem.vue";

export default {
    name: "HomeScreen",
    components: {
        CategoryItem,
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
}

</style>
