<template>
  <div :class="['tw-relative', wrapperClass]">
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="[
        'tw-flex tw-h-10 tw-w-full tw-rounded-md tw-border tw-border-gray-200 tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-white file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-gray-500 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50',
        className
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <slot name="prefix" class="tw-absolute tw-left-3 tw-top-1/2 tw-transform -tw-translate-y-1/2"></slot>
    <slot name="suffix" class="tw-absolute tw-right-3 tw-top-1/2 tw-transform -tw-translate-y-1/2"></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwInput'
})

withDefaults(
  defineProps<{
    id?: string
    modelValue?: string
    type?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    className?: string
    wrapperClass?: string
  }>(),
  {
    id: '',
    modelValue: '',
    type: 'text',
    placeholder: '',
    disabled: false,
    readonly: false,
    className: '',
    wrapperClass: ''
  }
)

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}>()
</script> 