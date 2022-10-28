<template>
  <div v-if="!gameStarted" class="bollards-quiz">
    <div class="bollards-quiz-start">
      <base-button @click="launchGame" primary>Launch game</base-button>
    </div>
  </div>
  <div v-else-if="timerCount > 0" class="bollards-quiz">
    <aside class="bollards-quiz-aside">
      <div class="bollards-quiz-timer">
        time left
        <br>
        <div class="timer-time">
          {{ timerCount }}
        </div>
      </div>
    </aside>
    <div class="bollards-quiz-image-container" :class="answerClass">
      <transition name="switch">
        <img v-if="gameStore.currentQuestion" :key="gameStore.questionIndex" :src="gameStore.currentQuestion.img" />
      </transition>
    </div>
    <div class="bollards-quiz-answer-container">
      <div class="bollards-quiz-answer">
        <transition mode="out-in" name="vanish-bottom">
          <input key="input" ref="answerInput" id="answer" type="text" v-model="answer" :class="answerClass" @keyup.enter="checkAnswer">
        </transition>
      </div>
    </div>
    <div class="bollards-quiz-button-container">
      <base-button @click="checkAnswer" primary>Validate</base-button>
      <base-button @click="nextQuestion" primary append-icon="ri-arrow-right-line">Next</base-button>
    </div>
  </div>
  <div v-else class="bollards-quiz">
    <div class="bollards-quiz-end">
      <div class="bollards-quiz-score">
        You scored
        <div class="score">{{ score }}</div>
      </div>
      <base-button @click="startNewGame" primary prepend-icon="ri-restart-line">Relaunch game</base-button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

import { useGameStore } from '@/stores/game'

import BaseButton from '@/components/BaseButton.vue'

const gameStore = useGameStore()

const answer: Ref<string|null> = ref(null)
const score: Ref<number> = ref(0)
const gameStarted: Ref<boolean> = ref(false)
const timerTimeout: Ref<any> = ref(null)
const timerCount: Ref<number> = ref(61)
const answerInput = ref()

const answerClass: Ref<string|null> = ref(null)

const startNewGame = ():void => {
  gameStore.initGame()
  answerClass.value = null
  score.value = 0
  gameStarted.value = false
}

const launchGame = ():void => {
  gameStarted.value = true
  timerCount.value = 60
}

watch(() => timerCount.value, (value) => {
  if (value > 0) {
    timerTimeout.value = setTimeout(() => {
      timerCount.value -= 1
    }, 1000)
  }
})

const checkAnswer = ():void => {
  const isValid = gameStore.currentAnswerIsValid(answer.value)

  if (isValid) {
    answerClass.value = 'success'
    score.value += 1
    nextQuestion()
  } else {
    answerClass.value = 'error'
  }
}

const nextQuestion = () => {
  gameStore.changeQuestionIndex()
  answer.value = null
  answerClass.value = null
  setTimeout(() => {
    answerInput.value.focus()
  }, 320)
}
</script>
