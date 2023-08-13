<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton />
                </ion-buttons>
                <ion-title>{{ category?.title || 'Каталог мест' }}</ion-title>
                <ion-buttons slot="primary">
                    <ion-button id="open-filters-modal">
                        <ion-icon slot="icon-only" :icon="filterOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="ion-padding">
                <PlacesGrid :places="places" />
            </div>
            <FiltersModal />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import BackButton from "@/components/BackButton";
import PlacesGrid from "@/components/places/PlacesGrid";
import PlacesMock from "@/utils/data/PlacesMock";
import {filterOutline} from 'ionicons/icons';
import FiltersModal from "@/components/catalog/FiltersModal";

export default {
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonButton, IonIcon,
        FiltersModal, PlacesGrid
    },
    data() {
        return {
            category: null,
            places: PlacesMock,
            filterOutline
        }
    },
}
</script>

<style scoped>

</style>
