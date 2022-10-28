import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useSettingsStore } from '@/stores/settings'

import type { AnswerList, Answer } from '@/assets/types/list-types'
import { ModeName } from '@/assets/types/mode-types'

import {
  randomNumber,
  normalizeString,
  shuffleArray,
} from '@/utils/quiz-utils'

export const useGameStore = defineStore('game', () => {
  const settingsStore = useSettingsStore()

  const currentDeck: Ref<AnswerList|[]> = ref([])
  const questionIndex: Ref<number> = ref(0)

  const currentQuestion = computed(():Answer|null => currentDeck.value[questionIndex.value])

  const currentAnswerIsValid = (answer:string|null):boolean => {
    if (!currentQuestion.value) return false

    const normalizedAnswers: string[] = []
    currentQuestion.value.answers.forEach((answer) => {
      normalizedAnswers.push(normalizeString(answer))
    })
    const normalizedCurrentAnswer = normalizeString(answer)

    return normalizedAnswers.includes(normalizedCurrentAnswer)
  }

  const changeQuestionIndex = ():void => {
    switch(settingsStore.mode) {
      case ModeName.RELAX:
      case ModeName.TIME:
        questionIndex.value = randomNumber(currentDeck.value.length)
        break
      case ModeName.SCORE:
      case ModeName.HARDCORE:
        if (questionIndex.value < (currentDeck.value.length - 1)) {
          questionIndex.value += 1
        }
        break
      default:
    }
  }

  const initGame = ():void => {
    switch(settingsStore.mode) {
      case ModeName.RELAX:
      case ModeName.TIME:
        currentDeck.value = [...settingsStore.getCurrentDeck]
        changeQuestionIndex()
        break
      case ModeName.SCORE:
      case ModeName.HARDCORE:
        currentDeck.value = shuffleArray([...settingsStore.getCurrentDeck])
        break
      default:
    }
  }

  return { currentDeck, questionIndex, currentQuestion, currentAnswerIsValid, changeQuestionIndex, initGame }
})
