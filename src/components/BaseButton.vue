<template>
  <button class="button" :class="{ disabled, small, block, left, right, icon }">
    <span class="button-content">
      <i v-if="prependIcon" :class="`${prependIcon} prepend-icon`"></i>
      <slot></slot>
      <i v-if="appendIcon" :class="`${appendIcon} append-icon`"></i>
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  disabled?: boolean;
  small?: boolean;
  block?: boolean;
  left?: boolean;
  right?: boolean;
  icon?: boolean;
  prependIcon?: string,
  appendIcon?: string,
}

const props = withDefaults(defineProps<Props>(), {})
</script>
