import {defineStore} from "pinia";

export const useUserQuestsStore = defineStore('user-quests', {
    state: () => ({
        userQuests: [],
    }),
    actions: {
        startQuest(quest) {
            if (this.userQuests.find(item => item.id === quest.id)) {
                return;
            }

            const firstPlace = quest.places[0];
            const step = firstPlace?.number || 1;
            // if (!firstPlace) {
            //     return;
            // }

            this.userQuests.push({
                id: quest.id,
                step: step,
                opened_places: firstPlace?.quiz ? [] : [step],
            });
        },
        resetQuest(quest) {
            this.userQuests = this.userQuests.filter(item => item.id !== quest.id);
        },
        openQuestPlace(quest) {
            this.userQuests = this.userQuests.map(item => {
                if (item.id === quest.id) {
                    item.opened_places.push(item.step)
                }
                return item;
            });
        },
        nextQuestPlace(quest) {
            this.userQuests = this.userQuests.map(item => {
                if (item.id === quest.id) {
                    item.step += 1;
                }
                const nextPlace = quest.places[item.step - 1];
                if (nextPlace && !nextPlace.quiz) {
                    item.opened_places.push(nextPlace.number);
                }
                return item;
            });
        }
    },
    persist: {
        enabled: true,
    },
})
