<template>
    <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content />
    </ion-refresher>
    <div class="ion-margin-top ion-text-center" v-if="isLoading">
        <ion-spinner />
    </div>

    <ion-list>
        <ion-item v-for="visit in visits" :key="visit.visit_id">
            <ion-label>
                <h3>{{ visit.place }}</h3>
                <p>{{ visit.date }}</p>
            </ion-label>
        </ion-item>
    </ion-list>

    <p class="ion-padding" v-if="!isLoading && !visits.length">Пока пусто. Посетите место!</p>
</template>

<script>
import {IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, IonSpinner} from "@ionic/vue";
import {useProfileStore} from "@/store/profile";
import api from "@/plugins/api";

export default {
    name: "Visits",
    components: { IonList, IonItem, IonLabel, IonSpinner, IonRefresher, IonRefresherContent },
    data() {
        return {
            visits: [],
            isLoading: true,
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            const store = useProfileStore();
            return api.post('/users/visits', {
                'phone': store.phone,
            }).then(res => {
                this.visits = res.data;
            }).finally(() => this.isLoading = false)
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
