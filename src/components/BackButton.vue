<template>
    <ion-back-button :icon="arrowBack" text="&nbsp;&nbsp;&nbsp;" style="padding-left: 7px;" class="backButton"></ion-back-button>
</template>

<script>
import {arrowBack} from "ionicons/icons";
import {IonBackButton, useBackButton} from "@ionic/vue";

export default {
    name: "BackButton",
    components: {IonBackButton},
    data() {
        return {
            arrowBack
        }
    },
    mounted() {
        useBackButton(101, () => {
            // .can-go-back:not(.ion-page-hidden) .backButton
            const backBtn = document.querySelector('.can-go-back:not(.ion-page-hidden) .backButton');
            // const backBtn = document.getElementById('backButton');
            if (backBtn) backBtn.click();
        });
    }
}
</script>

<style scoped>

</style>
