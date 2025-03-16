<template>
  <div class="tw-flex tw-items-center">
    <input
      :id="id"
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      :class="[
        'tw-peer tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-full tw-border tw-border-gray-200 tw-ring-offset-white focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50',
        className
      ]"
      @change="$emit('update:modelValue', value)"
    />
    <label
      v-if="$slots.default"
      :for="id"
      class="tw-ml-2 tw-text-sm tw-font-medium tw-leading-none tw-peer-disabled:tw-cursor-not-allowed tw-peer-disabled:tw-opacity-70"
    >
      <slot></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwRadio'
})

withDefaults(
  defineProps<{
    id?: string
    name?: string
    modelValue?: any
    value: any
    disabled?: boolean
    className?: string
  }>(),
  {
    id: '',
    name: '',
    modelValue: undefined,
    disabled: false,
    className: ''
  }
)

defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()
</script> 