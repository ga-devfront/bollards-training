<template>
  <div class="bollards-quiz">
    <div class="bollards-quiz-image-container" :class="answerClass">
      <transition name="switch">
        <img v-if="currentQuestion" :key="currentQuestion" :src="currentQuestion.img" />
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

<script>
import { ref, computed, onMounted } from 'vue'

import bollardsList from '../assets/data/bollards-list.js'

import {
  randomNumber,
  normalizeString,
} from '@/utils/quiz-utils'

import BaseButton from '@/components/BaseButton'

export default {
  name: 'BollardQuiz',
  components: {
    BaseButton,
  },
  setup() {
    const currentIndex = ref(null)
    const answer = ref(null)
    const displaySpoil = ref(false)
    const answerInput = ref()

    const answerClass = ref(null)

    const currentQuestion = computed(() => bollardsList[currentIndex.value])

    const spoilContent = computed(() => {
      if (currentQuestion.value) {
        let spoilContent = ''
        currentQuestion.value.answers.forEach((answer) => {
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
      const normalizedAnswers = []
      currentQuestion.value.answers.forEach((answer) => {
        normalizedAnswers.push(normalizeString(answer))
      })
      const normalizedCurrentAnswer = normalizeString(answer.value)

      const isValid = normalizedAnswers.includes(normalizedCurrentAnswer)

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
      newQuestionIndex()
      answer.value = null
      answerClass.value = null
      setTimeout(() => {
        answerInput.value.focus()
      }, 320)
    }

    const newQuestionIndex = () => {
      let newIndex = randomNumber(bollardsList.length)
      if (newIndex === currentIndex.value) {
        newQuestionIndex()
      } else {
        currentIndex.value = newIndex
      }
    }

    onMounted(() => {
      newQuestionIndex()
    })

    return {
      currentQuestion,
      answer,
      displaySpoil,
      answerInput,
      spoilContent,
      answerClass,
      showSpoil,
      checkAnswer,
      nextQuestion,
    }
  }
}
</script>
