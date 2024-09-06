// стор - список таких объектов. Записать, получить весь, удалить один, обновить один, очистить весь  список
import {defineStore} from "pinia";
import {ISavedHeroTypes} from "../utils/types/hero-types.ts";
import {ref, Ref} from "vue";

export const useHeroesHistoryList = defineStore('heroesHistoryList', () => {
        const heroesList: Ref<Array<ISavedHeroTypes>> = ref([]);

        function pushHero(hero: ISavedHeroTypes) {
            heroesList.value.push(hero)
        }

        return {
            heroesList,
            pushHero
        }
    },
    {
        persist: true,
    }
)
