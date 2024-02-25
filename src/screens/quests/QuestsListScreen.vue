<script setup>
import {IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonSpinner, IonToolbar} from "@ionic/vue";
import CardModal from "@/components/CardModal.vue";
import api from "@/plugins/api";
import QuestListItem from "@/components/quests/QuestListItem.vue";
import {onMounted, ref} from "vue";
import FlamingoTitle from "@/components/FlamingoTitle.vue";

const quests = ref([])
const isLoading = ref(false)

function fetch() {
    isLoading.value = true;
    return api.get(`/quests/list`).then(res => {
        quests.value = res.data;
    }).finally(() => isLoading.value = false);
}

function refresh(event) {
    fetch(false).then(() => {
        event.target.complete();
    });
}

onMounted(() => {
    fetch();
})
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <FlamingoTitle />
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
                <ion-refresher-content />
            </ion-refresher>
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>
            <div class="cards-list">
                <QuestListItem v-for="quest in quests" :key="quest.id" :quest="quest" />
            </div>
            <p class="the-end">На этом пока всё</p>
        </ion-content>
        <CardModal />
    </ion-page>
</template>

<style lang="scss" scoped>
.cards-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    margin-bottom: 50px;
}
</style>
