<template>
    <div class="single-place" v-if="place">
        <div class="single-place__image" :style="{ backgroundImage: `url(${require('@/assets/3.jpg')})` }">
            <CloseButton />
        </div>
        <div class="single-place__header">
            <div class="single-place__type">Достопримечательность</div>
            <div class="single-place__title">{{ place.title }}</div>
        </div>
        <div class="single-place__content ion-padding-horizontal">
            <div id="place-details-map"></div>
            <div v-html="place.description"></div>
        </div>
    </div>
</template>

<script>
import CloseButton from "@/components/CloseButton";
import PlacesGrid from "@/components/places/PlacesGrid";
import CollapsedText from "@/components/common/CollapsedText/CollapsedText";
import api from "@/plugins/api";

let map;

export default {
    name: "PlaceDetails",
    components: { CloseButton, PlacesGrid, CollapsedText },
    data() {
        return {
            place_id: this.$route.params.place_id,
            place: null,
        }
    },
    mounted() {
        this.fetch();
        ymaps.ready(() => {
            //this.setupMap();
        })
    },
    methods: {
        fetch() {
            return api.get(`/places/details?id=${this.place_id}`).then(res => {
                this.place = res.data;
            }).finally(() => this.isLoading = false);
        },
        setupMap() {
            map = new ymaps.Map('place-details-map', {
                center: [59.938955, 30.315644],
                zoom: 11,
                controls: ['zoomControl', 'geolocationControl'],
            });

            map.geoObjects.removeAll();

            this.renderLocation();
        },
        renderLocation() {
            const location = this.place.location[0];
            const polygon = new ymaps.Polygon([location], {}, {
                fillColor: '#e05baa',
                fillOpacity: 0.4,
                strokeColor: '#212529',
                strokeWidth: 1
            });
            map.geoObjects.add(polygon);
            this.setCenter(polygon);
        },
        setCenter(geoObject) {
            setTimeout(() => {
                map.setBounds(geoObject.geometry.getBounds(), {
                    checkZoomRange: true,
                    zoomMargin: 10
                });
            }, 500)
        }
    }
}
</script>

<style scoped lang="scss" src="./PlaceDetails.scss">

</style>
