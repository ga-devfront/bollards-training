import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import bollards from '@/assets/data/bollards-list'
import poles from '@/assets/data/poles-list'
import mixed from '@/assets/data/mixed-list'

import type { AnswerList } from '@/assets/types/list-types'
import type { ModeName } from '@/assets/types/mode-types'

import { DeckNames } from '@/assets/types/list-types'

export const useSettingsStore = defineStore('settings', () => {
  const mode: Ref<ModeName|null> = ref(null)
  const deck: Ref<DeckNames|null> = ref(null)
  const decks : { [key in DeckNames]: AnswerList } = {
    [DeckNames.BOLLARDS]: bollards,
    [DeckNames.POLES]: poles,
    [DeckNames.MIXED]: mixed
  }

  const getCurrentDeck = computed((): AnswerList | [] => deck.value ? decks[deck.value] : [])

  const changeMode = (modeChoice:ModeName | null):void => {
    mode.value = modeChoice
  }
  const changeDeck = (deckChoice:DeckNames | null):void => {
    deck.value = deckChoice
  }

  const clearSettings = ():void => {
    changeMode(null)
    changeDeck(null)
  }

  return { mode, deck, getCurrentDeck, changeMode, changeDeck, clearSettings }
})
