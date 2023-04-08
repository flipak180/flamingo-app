<template>
    <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content />
    </ion-refresher>
    <div class="ion-margin-top ion-text-center" v-if="isLoading">
        <ion-spinner />
    </div>
    <ion-list>
        <ion-item v-for="visit in visits" :key="visit.id">
            <ion-label>
                <h3>{{ visit.place }}</h3>
                <p>{{ visit.date }}</p>
            </ion-label>
        </ion-item>
    </ion-list>
</template>

<script>
import {IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, IonSpinner} from "@ionic/vue";
import axios from "axios";
import {useProfileStore} from "@/store/profile";

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
            return axios.post('https://flamingo.spb.ru/api/users/visits', {
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
