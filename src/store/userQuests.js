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

            this.userQuests.push({
                id: quest.id,
                step: 1,
            });
        },
        resetQuest(quest) {
            this.userQuests = this.userQuests.filter(item => item.id !== quest.id);
        },
        nextQuestPlace(quest) {
            this.userQuests = this.userQuests.map(item =>
                item.id === quest.id ? { ...item, step: item.step + 1 } : item
            );
            console.log(quest);
            console.log(this.userQuests);
        }
    },
    persist: {
        enabled: true,
    },
})
