<template>
  <header>
    <menu>
      <base-button icon v-if="!isHome" @click="backToHome()"><i class="ri-home-3-line"></i></base-button>
      <base-button icon v-if="!isHome" @click="back()"><i class="ri-arrow-left-s-line"></i></base-button>
    </menu>
    <img v-if="logo" class="logo" :src="logo" alt="geo training logo">
  </header>
  <div class="wrapper">
    <div class="container">
      <router-view />
    </div>
  </div>
  <footer>
    <a href="https://www.twitch.tv/non_creation" target="_blank" noreferrer>
      <img
        alt="Suivez moi sur twitch"
        src="@/assets/images/twitch-logo.png"
        width="75"
        height="75"
      />
    </a>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

import BaseButton from '@/components/BaseButton.vue'

import { RoutesName } from '@/assets/types/routes'
import { DeckNames } from '@/assets/types/list-types'

import bollardsLogo from '@/assets/images/logos/bollards-training.png'
import polesLogo from '@/assets/images/logos/poles-training.png'

const router = useRouter()
const settingsStore = useSettingsStore()
const route = useRoute()

const isHome = computed(():boolean => route.name === RoutesName.MODE_SELECTION)

const logo = computed(():any => {
  switch (settingsStore.deck) {
    case DeckNames.POLES:
      return polesLogo
    case DeckNames.BOLLARDS:
      return bollardsLogo
    default:
      return null
  }
})

const backToHome = ():void => {
  settingsStore.clearSettings()
  router.push({ name: RoutesName.MODE_SELECTION })
}

const back = ():void => {
  if (route.name === RoutesName.DECK_SELECTION) {
    backToHome()
  } else {
    settingsStore.changeDeck(null)
    router.push({ name: RoutesName.DECK_SELECTION })
  }
}
</script>
