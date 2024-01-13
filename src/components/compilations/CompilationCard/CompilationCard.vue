<template>
    <div class="compilation-card">
        <div class="compilation-card__image" :style="{ backgroundImage: `url(${require('@/assets/1.jpg')})` }">
            <CloseButton />
        </div>
        <div class="compilation-card__header">
            <div class="compilation-card__type">Подборка</div>
            <div class="compilation-card__title">Никто не забыт, ничто не забыто!</div>
        </div>
        <div class="compilation-card__content ion-padding-horizontal">
            <CollapsedText>
                <p>Равным образом укрепление и развитие структуры в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. </p>
                <p>Товарищи! дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. </p>
                <p>Идейные соображения высшего порядка, а также постоянный количественный рост и сфера.</p>
                <p>Идейные соображения высшего порядка, а также постоянный количественный рост и сфера.</p>
                <p>Идейные соображения высшего порядка, а также постоянный количественный рост и сфера.</p>
            </CollapsedText>
            <div class="content-section">
                <div class="content-section__title">Места</div>
                <PlacesGrid :places="places" />
            </div>
        </div>
    </div>
</template>

<script>
import CloseButton from "@/components/CloseButton";
import PlacesGrid from "@/components/places/PlacesGrid";
import Cards from "@/utils/data/Cards";
import CollapsedText from "@/components/common/CollapsedText";

export default {
    name: "CompilationCard",
    components: { CloseButton, PlacesGrid, CollapsedText },
    data() {
        return {
            places: Cards[0].places
        }
    },
}
</script>

<style scoped lang="scss" src="./CompilationCard.scss">

</style>
