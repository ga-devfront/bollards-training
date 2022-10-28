<template>
  <h1>Choose your game deck</h1>
  <div class="menu-list">
    <base-button prepend-icon="ri-flashlight-line" block @click="chooseDeck(DeckNames.POLES)">Poles</base-button>
    <base-button prepend-icon="ri-home-line" block @click="chooseDeck(DeckNames.BOLLARDS)">Bollards</base-button>
    <base-button prepend-icon="ri-exchange-funds-line" block @click="chooseDeck(DeckNames.MIXED)">Mixed</base-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

import { DeckNames } from '@/assets/types/list-types'

import BaseButton from '../components/BaseButton.vue'


const settingsStore = useSettingsStore()
const router = useRouter()

const chooseDeck = (deck:DeckNames) => {
  settingsStore.changeDeck(deck)
  if (settingsStore.mode) {
    router.push({ name: settingsStore.mode })
  }
}
</script>
