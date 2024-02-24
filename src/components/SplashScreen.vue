<template>
    <div class="splash" v-show="!hideSplash">
        <div class="logo"><img :src="require('@/assets/flamingo2x.png')" alt=""></div>
        <div class="title">Flamin<span>GO</span></div>
        <Loader />
    </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import {mapState} from "pinia";
import {useSettingsStore} from "@/store/settings";

export default {
    name: "SplashScreen",
    components: {
        Loader
    },
    computed: {
        ...mapState(useSettingsStore, ['hideSplash'])
    },
}
</script>

<style lang="scss" scoped>
.splash {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #FFDCEC;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &.fadeout {
        animation: fadeout 1s forwards;
    }

    @keyframes fadeout {
        to {
            opacity: 0;
            visibility: hidden;
        }
    }

    .logo {
        background: #fff;
        padding: 70px;
        border-radius: 50%;
        position: relative;
        width: 300px;
        height: 300px;
        margin-bottom: 60px;

        img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 155px;
            height: 171px;
        }
    }

    .title {
        font-size: 48px;
        font-weight: bold;
        color: var(--black);

        span {
            color: var(--pink);
        }
    }

    .loader {
        position: fixed;
        bottom: 50px;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>
