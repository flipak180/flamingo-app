<template>
    <div class="collapsed-text" :class="{'collapsed-text__full': isFull}">
        <slot></slot>
        <span class="collapsed-text__more" @click="showMore" v-if="!isFull">ещё</span>
    </div>
</template>

<script>
export default {
    name: "CollapsedText",
    data() {
        return {
            isFull: false,
        }
    },
    methods: {
        showMore() {
            this.isFull = true;
        }
    }
}
</script>

<style lang="scss" src="./CollapsedText.scss">

</style>
