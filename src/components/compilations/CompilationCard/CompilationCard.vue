<template>
    <div class="compilation-card">
        <div class="compilation-card__image" :style="{ backgroundImage: `url(${require('@/assets/images/1.jpg')})` }">
            <CloseButton />
        </div>
        <div class="compilation-card__header" @click="$router.go(-1)">
            <div class="compilation-card__type">Подборка</div>
            <div class="compilation-card__title">Никто не забыт, ничто не забыто!</div>
        </div>
    </div>
</template>

<script>
import CloseButton from "@/components/CloseButton";

export default {
    name: "CompilationCard",
    components: { CloseButton },
}
</script>

<style scoped lang="scss" src="./CompilationCard.scss">

</style>
