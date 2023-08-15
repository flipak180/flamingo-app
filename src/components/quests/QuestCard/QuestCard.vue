<template>
    <div class="quest-card ion-padding">
        <div class="quest-card__header">
            <div class="quest-card__image" :style="{ backgroundImage: `url(${require('@/assets/2.jpg')})` }">

            </div>
            <div class="quest-card__heading">
                <div class="quest-card__title">Король и Шут. Между Купчино и Ржевкой</div>
                <div class="quest-card__category">Исторические личности</div>
                <div class="quest-card__actions">
                    <ion-button size="small">Начать</ion-button>
                    <!-- <ion-icon :icon="shareOutline"></ion-icon> -->
                    <ion-button size="small" color="light" @click="share">
                        <ion-icon slot="icon-only" :icon="shareOutline" />
                    </ion-button>
                </div>
            </div>
        </div>
        <PropsList />
        <div class="content-section">
            <div class="content-section__title">Сюжет</div>
            <CollapsedText>
                <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).</p>
            </CollapsedText>
        </div>
        <div class="content-section">
            <div class="content-section__title">Задания</div>
            <PlacesGrid :places="places" />
        </div>
    </div>
</template>

<script>
import {shareOutline} from "ionicons/icons";
import {IonButton, IonIcon} from "@ionic/vue";
import PropsList from "@/components/common/PropsList/PropsList";
import CollapsedText from "@/components/common/CollapsedText/CollapsedText";
import PlacesGrid from "@/components/places/PlacesGrid";
import Cards from "@/utils/data/Cards";
import {Share} from "@capacitor/share";

export default {
    name: "QuestCard",
    components: { IonButton, IonIcon, PropsList, CollapsedText, PlacesGrid },
    data() {
        return {
            shareOutline,
            places: Cards[0].places
        }
    },
    methods: {
        async share() {
            await Share.share({
                title: 'Король и Шут. Между Купчино и Ржевкой',
                text: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться',
                url: 'https://flamingo.spb.ru/tabs/home/quest',
                dialogTitle: 'Поделиться с друзьями',
            });
        }
    }
}
</script>

<style scoped lang="scss" src="./QuestCard.scss">

</style>
