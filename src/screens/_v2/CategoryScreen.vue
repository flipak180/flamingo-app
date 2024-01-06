<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Flamin<span class="highlighted">GO</span></ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">

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
            category_id: this.$route.params.category_id,
            places: [],
            isLoading: false,
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            this.isLoading = true;
            return api.get(`/places/list?category_id=${this.category_id}`).then(res => {
                this.places = res.data;
            }).finally(() => this.isLoading = false);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
