import { createRouter, createWebHistory } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import { useGameStore } from '@/stores/game'

import { RoutesName } from '@/assets/types/routes'
import { ModeName } from '@/assets/types/mode-types'

import ModeSelection from '../views/ModeSelection.vue'
import DeckSelection from '../views/DeckSelection.vue'

import RelaxGame from '@/views/games/RelaxGame.vue'
import TimeGame from '@/views/games/TimeGame.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: `${RoutesName.MODE_SELECTION}`,
      component: ModeSelection
    },
    {
      path: '/deck',
      name: `${RoutesName.DECK_SELECTION}`,
      component: DeckSelection,
      beforeEnter: (to, from, next) => {
        const settingsStore = useSettingsStore()
        if (!settingsStore.mode) {
          settingsStore.clearSettings()
          next({ name: RoutesName.MODE_SELECTION })
        }
        next()
      },
    },
    {
      path: '/relax_game',
      name: `${ModeName.RELAX}`,
      component: RelaxGame,
      beforeEnter: (to, from, next) => {
        const settingsStore = useSettingsStore()
        const gameStore = useGameStore()
        if (!settingsStore.mode) {
          settingsStore.clearSettings()
          next({ name: RoutesName.MODE_SELECTION })
        }
        if (!settingsStore.deck) {
          next({ name: RoutesName.DECK_SELECTION })
        }
        gameStore.initGame()
        next()
      },
    },
    {
      path: '/time_game',
      name: `${ModeName.TIME}`,
      component: TimeGame,
      beforeEnter: (to, from, next) => {
        const settingsStore = useSettingsStore()
        const gameStore = useGameStore()
        if (!settingsStore.mode) {
          settingsStore.clearSettings()
          next({ name: RoutesName.MODE_SELECTION })
        }
        if (!settingsStore.deck) {
          next({ name: RoutesName.DECK_SELECTION })
        }
        gameStore.initGame()
        next()
      },
    }
  ]
})

export default router
