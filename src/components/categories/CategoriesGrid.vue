<template>
    <div class="places">
        <div class="place" v-for="category in categories" :key="category.category_id">
            <div class="place__image" :style="{ backgroundImage: 'url(https://flamingo.spb.ru' + category.image + ')' }"></div>
            <div class="place__info">
                <div class="place__title">{{ category.title }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CategoriesGrid",
    props: ['categories'],
}
</script>

<style lang="scss" scoped>
.places {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 15px;
}

.place {
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(var(--black-rgba), 0.1);
    // padding: 5px;

    &__image {
        height: 135px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;

        //box-shadow: 0 5px 5px -5px rgba(34, 60, 80, 0.6);
        //border-radius: 5px;
    }

    &__info {
        padding: 10px 5px;
    }

    &__type {
        color: rgba(var(--black-rgba), 0.6);
        text-transform: uppercase;
        font-weight: bold;
        font-size: 10px;
        margin-bottom: 10px;
    }

    &__title {
        font-size: 14px;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        //padding: 10px;
    }
}
</style>
