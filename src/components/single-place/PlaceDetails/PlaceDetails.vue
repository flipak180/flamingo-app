<template>
    <div class="single-place">
        <div class="single-place__image" :style="{ backgroundImage: `url(${require('@/assets/images/3.jpg')})` }">
            <CloseButton />
        </div>
        <div class="single-place__header">
            <div class="single-place__type">Достопримечательность</div>
            <div class="single-place__title">{{ place.title }}</div>
        </div>
        <div class="single-place__content ion-padding-horizontal">
            <div id="place-details-map"></div>

            <p>Равным образом укрепление и развитие структуры в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. </p>
            <p>Товарищи! дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. </p>
            <p>Идейные соображения высшего порядка, а также постоянный количественный рост и сфера.</p>
            <p>Равным образом укрепление и развитие структуры в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. </p>
            <p>Товарищи! дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. </p>
            <p>Идейные соображения высшего порядка, а также постоянный количественный рост и сфера.</p>
            <p>Равным образом укрепление и развитие структуры в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. </p>
            <p>Товарищи! дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. </p>
            <p>Идейные соображения высшего порядка, а также постоянный количественный рост и сфера.</p>
        </div>
        <PlaceItem :place="place" />
    </div>
</template>

<script>
import CloseButton from "@/components/CloseButton";
import PlacesGrid from "@/components/places/PlacesGrid";
import CollapsedText from "@/components/common/CollapsedText/CollapsedText";
import PlaceItem from "@/components/places/PlaceItem/PlaceItem";
import PlacesMock from "@/utils/data/PlacesMock";

let map;

export default {
    name: "PlaceDetails",
    components: { CloseButton, PlacesGrid, CollapsedText, PlaceItem },
    data() {
        return {
            place: {}
        }
    },
    mounted() {
        this.place = PlacesMock[Math.floor(Math.random() * PlacesMock.length)];
        console.log(this.place);
        ymaps.ready(() => {
            this.setupMap();
        })
    },
    methods: {
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
