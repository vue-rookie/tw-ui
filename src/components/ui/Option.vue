<template>
  <option :value="value" :disabled="disabled">
    <slot>{{ label }}</slot>
  </option>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwOption'
})

defineProps<{
  value: string | number
  label?: string
  disabled?: boolean
}>()
</script> 