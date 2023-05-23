<template>
    <div class="places-list" v-if="places.length">
        <PlaceItem v-for="place in places" :key="place.id" :place="place" />
    </div>
</template>

<script>
import PlaceItem from "@/components/places/PlaceItem/PlaceItem";

export default {
    name: "PlacesList",
    props: ['places'],
    components: {
        PlaceItem
    }
}
</script>

<style scoped lang="scss" src="./PlacesList.scss">

</style>
