<template>
  <nav :class="['tw-flex', className]" aria-label="Breadcrumb">
    <ol class="tw-flex tw-flex-wrap tw-items-center tw-gap-1.5">
      <slot></slot>
    </ol>
  </nav>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwBreadcrumb'
})

defineProps<{
  className?: string
}>()
</script> 