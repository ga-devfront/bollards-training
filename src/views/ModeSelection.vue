<template>
  <h1>Choose your game type</h1>
  <div class="menu-list">
    <base-button prepend-icon="ri-heart-3-line" block @click="chooseMode(ModeName.RELAX)">Relax mode</base-button>
    <base-button prepend-icon="ri-time-line" block @click="chooseMode(ModeName.TIME)">Time attack</base-button>
    <base-button prepend-icon="ri-award-line" block disabled @click="() => {}">Score contest</base-button>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue'
import { useSettingsStore } from '@/stores/settings'
import { ModeName } from '@/assets/types/mode-types'
import { useRouter } from 'vue-router'
import { RoutesName } from '@/assets/types/routes'

const settingsStore = useSettingsStore()
const router = useRouter()

const chooseMode = (mode:ModeName) => {
  settingsStore.changeMode(mode)
  router.push({ name: RoutesName.DECK_SELECTION })
}
</script>
