<template>
  <div class="bollards-quiz">
    <div class="bollards-quiz-image-container" :class="answerClass">
      <transition name="switch">
        <img v-if="gameStore.currentQuestion" :key="gameStore.questionIndex" :src="gameStore.currentQuestion.img" alt="do not cheat" />
      </transition>
    </div>
    <div class="bollards-quiz-answer-container">
      <div class="bollards-quiz-answer">
        <transition mode="out-in" name="vanish-bottom">
          <span v-if="displaySpoil" key="spoil" class="bollards-quiz-spoil">{{ spoilContent }}</span>
          <input v-else key="input" ref="answerInput" id="answer" type="text" v-model="answer" :class="answerClass" @keyup.enter="checkAnswer">
        </transition>
      </div>
    </div>
    <div class="bollards-quiz-button-container">
      <base-button @click="checkAnswer" primary :disabled="displaySpoil">Validate</base-button>
      <base-button @click="nextQuestion" primary append-icon="ri-arrow-right-line">Next</base-button>
      <base-button @click="showSpoil" primary block>Spoil</base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

import { useGameStore } from '@/stores/game'

import BaseButton from '@/components/BaseButton.vue'

const gameStore = useGameStore()

const answer: Ref<string|null> = ref(null)
const displaySpoil: Ref<boolean> = ref(false)
const answerInput = ref()

const answerClass: Ref<string|null> = ref(null)

const spoilContent = computed(() => {
  if (gameStore.currentQuestion) {
    let spoilContent = ''
    gameStore.currentQuestion.answers.forEach((answer) => {
      if (spoilContent.length > 0) {
        spoilContent += ` / ${answer}`
      } else {
        spoilContent += answer
      }
    })
    return spoilContent
  }
  return ''
})

const checkAnswer = () => {
  if (displaySpoil.value) {
    return
  }

  const isValid = gameStore.currentAnswerIsValid(answer.value)

  if (isValid) {
    answerClass.value = 'success'
    nextQuestion()
  } else {
    answerClass.value = 'error'
  }
}

const showSpoil = () => {
  displaySpoil.value = true
}

const nextQuestion = () => {
  displaySpoil.value = false
  gameStore.changeQuestionIndex()
  answer.value = null
  answerClass.value = null
  setTimeout(() => {
    answerInput.value.focus()
  }, 320)
}
</script>
