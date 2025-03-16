<template>
  <div
    :class="[
      'tw-rounded-lg tw-border tw-bg-white tw-shadow-sm',
      className
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwCard'
})

defineProps<{
  className?: string
}>()
</script>

<script lang="ts">
export default {
  provide: {
    card: true
  }
}
</script> 