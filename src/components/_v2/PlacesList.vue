<template>
    <div class="places-list" v-if="places.length">
        <PlaceItem v-for="place in places" :key="place.id" :place="place" />
    </div>
    <div v-if="places.length > 2" class="more-places">...</div>
</template>

<script>
import PlaceItem from "@/components/_v2/PlaceItem";

export default {
    name: "PlacesList",
    props: ['places'],
    components: {
        PlaceItem
    }
}
</script>

<style scoped lang="scss">
.places-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 15px;
    background: #fff;

    @media (prefers-color-scheme: dark) {
        background: var(--black-light);
    }
}

.more-places {
    text-align: center;
    margin-top: -10px;
    padding-bottom: 10px;
}
</style>
