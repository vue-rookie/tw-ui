<template>
  <Teleport to="body">
    <Transition
      enter-active-class="tw-ease-out tw-duration-300"
      enter-from-class="tw-opacity-0"
      enter-to-class="tw-opacity-100"
      leave-active-class="tw-ease-in tw-duration-200"
      leave-from-class="tw-opacity-100"
      leave-to-class="tw-opacity-0"
    >
      <div
        v-if="modelValue"
        class="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25 tw-transition-opacity"
        @click="$emit('update:modelValue', false)"
      ></div>
    </Transition>

    <Transition
      enter-active-class="tw-ease-out tw-duration-300"
      enter-from-class="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
      enter-to-class="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
      leave-active-class="tw-ease-in tw-duration-200"
      leave-from-class="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
      leave-to-class="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
    >
      <div
        v-if="modelValue"
        class="tw-fixed tw-inset-0 tw-z-10 tw-overflow-y-auto"
        @click.self="closeOnClickOutside ? $emit('update:modelValue', false) : null"
      >
        <div class="tw-flex tw-min-h-full tw-items-end tw-justify-center tw-p-4 tw-text-center sm:tw-items-center sm:tw-p-0">
          <div
            :class="[
              'tw-relative tw-transform tw-overflow-hidden tw-rounded-lg tw-bg-white tw-px-4 tw-pb-4 tw-pt-5 tw-text-left tw-shadow-xl tw-transition-all sm:tw-my-8 sm:tw-w-full sm:tw-max-w-lg sm:tw-p-6',
              className
            ]"
          >
            <div v-if="showClose" class="tw-absolute tw-right-0 tw-top-0 tw-pr-4 tw-pt-4">
              <button
                type="button"
                class="tw-rounded-md tw-bg-white tw-text-gray-400 hover:tw-text-gray-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-offset-2"
                @click="$emit('update:modelValue', false)"
              >
                <span class="tw-sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="tw-h-6 tw-w-6"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwModal'
})

withDefaults(
  defineProps<{
    modelValue: boolean
    showClose?: boolean
    closeOnClickOutside?: boolean
    className?: string
  }>(),
  {
    showClose: true,
    closeOnClickOutside: true,
    className: ''
  }
)

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script> 