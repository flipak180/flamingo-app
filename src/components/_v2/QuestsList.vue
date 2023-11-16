<template>
    <div class="cards-list">
        <QuestItem v-for="card in Quests" :key="card.id" :card="card" />
    </div>
</template>

<script>
import QuestItem from "@/components/_v2/QuestItem.vue";
import Quests from "@/utils/data/Quests";

export default {
    name: "CardsList",
    props: ['quests'],
    components: { QuestItem },
    data() {
        return {
            Quests
        }
    },
}
</script>

<style lang="scss" scoped>
    .cards-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;
        margin-bottom: 50px;
    }
</style>
