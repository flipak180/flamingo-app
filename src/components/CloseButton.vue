<template>
    <div class="close-button" :class="{'inverted': inverted}" @click="$router.go(-1)">
        <ion-icon :icon="closeOutline"></ion-icon>
    </div>
</template>

<script>
import {closeOutline} from "ionicons/icons";
import {IonIcon} from "@ionic/vue";

export default {
    name: "BackButton",
    components: {IonIcon},
    data() {
        return {
            inverted: false,
            closeOutline,
        }
    },
    mounted() {
        this.emitter.on('scroll', (e) => {
            if (e.scrollTop >= 300) {
                this.inverted = true;
            } else {
                this.inverted = false;
            }
        });
    },
}
</script>

<style scoped lang="scss">
.close-button {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: calc(10px + var(--ion-safe-area-bottom));
    right: calc(10px + var(--ion-safe-area-right));
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    font-size: 20px;
    color: var(--black);
    transition: all .3s;

    &.inverted {
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
    }
}
</style>
