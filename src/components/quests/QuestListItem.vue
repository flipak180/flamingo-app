<script>
import PropsList from "@/components/common/PropsList/PropsList.vue";
import {IonProgressBar} from "@ionic/vue";
import {mapState} from "pinia";
import {useUserQuestsStore} from "@/store/userQuests";

export default {
    name: "QuestListItem",
    components: {IonProgressBar, PropsList},
    props: ['quest'],
    computed: {
        ...mapState(useUserQuestsStore, ['userQuests']),
        userQuest() {
            return this.userQuests.find(item => item.id === this.quest.id);
        },
        progress() {
            return (this.userQuest.step - 1) / 100 * this.quest.total_places;
        }
    }
}
</script>

<template>
    <div class="card-item" @click="$router.push({ name: 'quest', params: { quest_id: quest.id } })">
        <div class="card-item__header">
            <div class="card-item__type">{{ quest.type }}</div>
            <div class="card-item__title">{{ quest.title }}</div>
        </div>
        <div class="card-item__content">
            <div class="card-item__image" :style="{ backgroundImage: `url(https://flamingo.spb.ru/${quest.image})` }"></div>
            <div class="card-item__tags">
                <div class="card-item__tag" v-for="tag in quest.tags" :key="tag">{{ tag }}</div>
            </div>
            <ion-progress-bar :value="progress" v-if="userQuest"></ion-progress-bar>
        </div>
        <div class="card-item__footer">
            <PropsList />
        </div>
    </div>
</template>

<style scoped lang="scss">
.card-item {
    $this: &;

    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 0 4px 16px;
    overflow: hidden;
    transition: transform 0.4s;

    @media (prefers-color-scheme: dark) {
        box-shadow: none;
    }

    &_active {
        transform: scale(0.97);
    }

    &__header {
        background: #fff;
        padding: 15px;
        width: 100%;

        @media (prefers-color-scheme: dark) {
            background: var(--black-light);
        }
    }

    &__content {
        position: relative;
    }

    &__footer {
        background: #fff;

        @media (prefers-color-scheme: dark) {
            background: var(--black-light);
        }
    }

    &__image {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        height: 300px;
        position: relative;
    }

    &__type {
        color: rgba(var(--black-rgba), 0.5);
        text-transform: uppercase;
        font-weight: bold;
        font-size: 13px;
        margin-bottom: 10px;
        letter-spacing: 0.5px;

        @media (prefers-color-scheme: dark) {
            color: var(--grey);
        }
    }

    &__title {
        color: var(--black);
        font-size: 20px;
        font-weight: 700;

        @media (prefers-color-scheme: dark) {
            color: #fff;
        }
    }

    &__tags {
        position: absolute;
        bottom: 15px;
        left: 10px;
        display: flex;
        gap: 10px;
        z-index: 15;
    }
    &__tag {
        background: var(--pink);
        font-size: 13px;
        font-weight: 600;
        color: #fff;
        border-radius: 10px;
        padding: 4px 10px;
    }

    &__info {
        padding: 15px;
        width: 100%;

        &_position_bottom {
            position: absolute;
            bottom: 0;
        }

        &_color_light {
            #{$this}__type {

            }

            #{$this}__title {
                color: #fff;
            }
        }

        &_color_dark {
            #{$this}__type {

            }

            #{$this}__title {
                color: #000;
            }
        }

        &_type_bg {
            // background: rgba(0, 0, 0, 0.5);
            background: #fff;
            color: #000;

            @media (prefers-color-scheme: dark) {
                background: #000;
                color: #fff;
            }
        }
    }
}
</style>
