<template>
    <div class="single-place" v-if="place">
        <div class="single-place__image" :style="{ backgroundImage: `url(https://flamingo.spb.ru/${place.image})` }">
            <CloseButton />
        </div>
        <div class="single-place__header">
            <div class="single-place__type">{{ place.type }}</div>
            <div class="single-place__title">{{ place.title }}</div>
        </div>
        <div class="single-place__content ion-padding-horizontal" v-html="place.description"></div>
        <PlaceItem :place="place.places[0]" v-if="place.places.length" />
    </div>
</template>

<script>
import CloseButton from "@/components/CloseButton";
import PlacesGrid from "@/components/places/PlacesGrid";
import CollapsedText from "@/components/common/CollapsedText/CollapsedText";
import PlaceItem from "@/components/places/PlaceItem/PlaceItem";
import api from "@/plugins/api";

export default {
    name: "SinglePlace",
    components: { CloseButton, PlacesGrid, CollapsedText, PlaceItem },
    data() {
        return {
            place_id: this.$route.params.place_id,
            place: null,
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            return api.get(`/events/details?id=${this.place_id}`).then(res => {
                this.place = res.data;
            }).finally(() => this.isLoading = false);
        },
        refresh(event) {
            this.fetch(false).then(() => {
                event.target.complete();
            });
        },
    }
}
</script>

<style scoped lang="scss" src="./SinglePlace.scss">

</style>
