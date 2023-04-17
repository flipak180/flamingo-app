<template>
    <div class="places-grid">
        <PlacesGridItem v-for="place in places" :key="place.place_id" :place="place" />
    </div>
</template>

<script>
import PlacesGridItem from "@/components/places/PlacesGridItem";
import {mapOutline} from "ionicons/icons";

export default {
    name: "PlacesGrid",
    components: { PlacesGridItem },
    props: ['places'],
    data() {
        return {
            mapOutline,
        }
    },
}
</script>

<style lang="scss" scoped>
    .places-grid {
        padding: 15px;
    }
</style>
