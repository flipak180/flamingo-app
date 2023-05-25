<template>
    <div class="close-button" @click="$router.go(-1)">
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
            closeOutline
        }
    }
}
</script>

<style scoped>
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
}
</style>
