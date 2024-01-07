<template>
    <div class="places-list">
        <PlaceItem v-for="place in places" :key="place.id" :place="place" />
    </div>
</template>

<script>
import PlaceItem from "@/components/_v2/PlaceItem.vue";

export default {
    name: "PlacesList",
    props: ['places'],
    components: { PlaceItem },
    data() {
        return {

        }
    },
}
</script>

<style lang="scss">
    .places-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;
        margin-bottom: 30px;

        .place-item:last-child {
            padding-bottom: 0;
        }
    }
</style>
