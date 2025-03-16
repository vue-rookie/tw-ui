<template>
  <textarea
    :id="id"
    :value="modelValue"
    :placeholder="placeholder"
    :rows="rows"
    :disabled="disabled"
    :readonly="readonly"
    :class="[
      'tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-gray-200 tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-white placeholder:tw-text-gray-500 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50',
      className
    ]"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  ></textarea>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwTextarea'
})

withDefaults(
  defineProps<{
    id?: string
    modelValue?: string
    placeholder?: string
    rows?: number
    disabled?: boolean
    readonly?: boolean
    className?: string
  }>(),
  {
    id: '',
    modelValue: '',
    placeholder: '',
    rows: 3,
    disabled: false,
    readonly: false,
    className: ''
  }
)

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}>()
</script> 