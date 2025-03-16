<template>
  <form 
    class="tw-form" 
    :class="[
      `tw-form-${layout}`,
      { 'tw-form-disabled': disabled }
    ]"
    @submit.prevent="handleSubmit"
  >
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { provide, reactive } from 'vue'
import type { Ref } from 'vue'

// ... existing code ...
</script> 