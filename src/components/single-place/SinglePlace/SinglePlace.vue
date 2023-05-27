<template>
    <div class="single-place">
        <div class="single-place__image" :style="{ backgroundImage: `url(${require('@/assets/images/3.jpg')})` }">
            <CloseButton />
        </div>
        <div class="single-place__header">
            <div class="single-place__type">Достопримечательность</div>
            <div class="single-place__title">Люблю тебя, Петра творенье</div>
        </div>
        <div class="single-place__content ion-padding-horizontal">
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
import Cards from "@/utils/data/Cards";
import PlaceItem from "@/components/places/PlaceItem/PlaceItem";

export default {
    name: "SinglePlace",
    components: { CloseButton, PlacesGrid, CollapsedText, PlaceItem },
    data() {
        return {
            place: Cards[0].places[0]
        }
    },
}
</script>

<style scoped lang="scss" src="./SinglePlace.scss">

</style>
