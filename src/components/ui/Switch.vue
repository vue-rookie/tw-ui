<template>
  <div class="tw-flex tw-items-center">
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :data-state="modelValue ? 'checked' : 'unchecked'"
      :disabled="disabled"
      :class="[
        'tw-peer tw-inline-flex tw-h-[24px] tw-w-[44px] tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-blue-500 data-[state=unchecked]:tw-bg-gray-200',
        className
      ]"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <span
        :data-state="modelValue ? 'checked' : 'unchecked'"
        class="tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-white tw-shadow-lg tw-ring-0 tw-transition-transform data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0"
      />
    </button>
    <label
      v-if="$slots.default"
      class="tw-ml-2 tw-text-sm tw-font-medium tw-leading-none tw-peer-disabled:tw-cursor-not-allowed tw-peer-disabled:tw-opacity-70"
    >
      <slot></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwSwitch'
})

withDefaults(
  defineProps<{
    modelValue?: boolean
    disabled?: boolean
    className?: string
  }>(),
  {
    modelValue: false,
    disabled: false,
    className: ''
  }
)

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script> 