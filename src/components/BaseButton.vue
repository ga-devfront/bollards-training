<template>
  <button class="button" :class="{ disabled, small, block, left, right, primary, dark, danger, success, transparent, outlined, loading, icon }">
    <span class="button-content">
      <i v-if="prependIcon" :class="`${prependIcon} prepend-icon`"></i>
      <slot></slot>
      <i v-if="appendIcon" :class="`${appendIcon} append-icon`"></i>
    </span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    disabled: {
      required: false,
      type: Boolean,
      default: () => false
    },
    small: {
      required: false,
      type: Boolean,
      default: () => false
    },
    block: {
      required: false,
      type: Boolean,
      default: () => false
    },
    left: {
      required: false,
      type: Boolean,
      default: () => false
    },
    right: {
      required: false,
      type: Boolean,
      default: () => false
    },
    icon: {
      required: false,
      type: Boolean,
      default: () => false
    },
    prependIcon: {
      required: false,
      type: String,
      default: () => null
    },
    appendIcon: {
      required: false,
      type: String,
      default: () => null
    },
  }
}
</script>
