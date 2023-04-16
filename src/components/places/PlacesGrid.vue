<template>
    <div class="places-grid">
        <PlacesGridItem v-for="place in places" :key="place.place_id" :place="place" />
    </div>
</template>

<script>
import PlacesGridItem from "@/components/places/PlacesGridItem";
import {mapOutline} from "ionicons/icons";
import api from "@/plugins/api";

export default {
    name: "PlacesGrid",
    components: {
        PlacesGridItem,
    },
    props: ['category_id'],
    data() {
        return {
            mapOutline,
            places: [],
            isLoading: true,
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            return api.get(`/places/list?category_id=${this.category_id}`).then(res => {
                this.places = res.data;
            }).finally(() => this.isLoading = false);
        },
    }
}
</script>

<style lang="scss" scoped>
    .places-grid {
        padding: 15px;
    }
</style>
