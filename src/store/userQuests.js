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
        }
    },
    persist: {
        enabled: true,
    },
})
