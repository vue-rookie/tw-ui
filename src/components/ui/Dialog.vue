<template>
  <Teleport to="body">
    <Transition name="tw-dialog-fade">
      <div 
        v-if="modelValue" 
        class="tw-dialog-overlay"
        :class="{ 'tw-dialog-overlay-mask': mask }"
        @click="maskClosable ? close() : null"
      >
        <div 
          ref="dialogRef"
          class="tw-dialog"
          :class="[
            `tw-dialog-${size}`,
            { 'tw-dialog-fullscreen': fullscreen },
            { 'tw-dialog-draggable': draggable && !fullscreen }
          ]"
          :style="dialogStyle"
          @click.stop
        >
          <!-- 标题栏 -->
          <div 
            class="tw-dialog-header"
            :class="{ 'tw-cursor-move': draggable && !fullscreen }"
            @mousedown="draggable && !fullscreen ? startDrag($event) : null"
          >
            <div class="tw-dialog-title">
              <slot name="title">{{ title }}</slot>
            </div>
            <button 
              v-if="showClose" 
              type="button" 
              class="tw-dialog-close" 
              @click="close"
              aria-label="关闭"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- 内容区 -->
          <div class="tw-dialog-body" :style="bodyStyle">
            <slot></slot>
          </div>
          
          <!-- 底部按钮区 -->
          <div v-if="$slots.footer || showFooter" class="tw-dialog-footer">
            <slot name="footer">
              <button 
                v-if="showCancel" 
                type="button" 
                class="tw-px-4 tw-py-2 tw-bg-white tw-text-gray-700 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-offset-2"
                @click="handleCancel"
              >
                {{ cancelText }}
              </button>
              <button 
                v-if="showConfirm" 
                type="button" 
                class="tw-ml-3 tw-px-4 tw-py-2 tw-bg-blue-500 tw-text-white tw-rounded-md tw-shadow-sm hover:tw-bg-blue-600 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-offset-2"
                :disabled="confirmLoading"
                @click="handleConfirm"
              >
                <span v-if="confirmLoading" class="tw-flex tw-items-center">
                  <svg class="tw-animate-spin tw-h-4 tw-w-4 tw-mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="tw-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="tw-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ loadingText }}
                </span>
                <span v-else>{{ confirmText }}</span>
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount, nextTick } from 'vue'

interface DialogProps {
  modelValue: boolean
  title?: string
  width?: string | number
  height?: string | number
  top?: string | number
  fullscreen?: boolean
  mask?: boolean
  maskClosable?: boolean
  showClose?: boolean
  showFooter?: boolean
  showCancel?: boolean
  showConfirm?: boolean
  cancelText?: string
  confirmText?: string
  loadingText?: string
  confirmLoading?: boolean
  draggable?: boolean
  size?: 'small' | 'medium' | 'large'
  beforeClose?: (done: () => void) => void | Promise<void>
}

const props = withDefaults(defineProps<DialogProps>(), {
  title: '对话框',
  width: '',
  height: '',
  top: '15vh',
  fullscreen: false,
  mask: true,
  maskClosable: true,
  showClose: true,
  showFooter: true,
  showCancel: true,
  showConfirm: true,
  cancelText: '取消',
  confirmText: '确定',
  loadingText: '处理中...',
  confirmLoading: false,
  draggable: false,
  size: 'medium'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'open'): void
  (e: 'opened'): void
  (e: 'close'): void
  (e: 'closed'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()

// 对话框引用
const dialogRef = ref<HTMLElement | null>(null)

// 拖拽状态
const isDragging = ref(false)
const dragPosition = ref({ x: 0, y: 0 })
const dragStartPosition = ref({ x: 0, y: 0, left: 0, top: 0 })

// 计算对话框样式
const dialogStyle = computed(() => {
  if (props.fullscreen) {
    return {}
  }
  
  const style: Record<string, string> = {}
  
  // 设置宽度
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  // 设置高度
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  // 设置顶部距离
  if (!isDragging.value) {
    style.top = typeof props.top === 'number' ? `${props.top}px` : props.top
  }
  
  // 拖拽位置
  if (isDragging.value || dragPosition.value.x !== 0 || dragPosition.value.y !== 0) {
    style.left = `${dragPosition.value.x}px`
    style.top = `${dragPosition.value.y}px`
    style.transform = 'none'
    style.margin = '0'
  }
  
  return style
})

// 计算内容区样式
const bodyStyle = computed(() => {
  const style: Record<string, string> = {}
  
  // 设置内容区高度
  if (props.height) {
    style.maxHeight = 'none'
  }
  
  return style
})

// 开始拖拽
const startDrag = (event: MouseEvent) => {
  if (!props.draggable || props.fullscreen) return
  
  event.preventDefault()
  isDragging.value = true
  
  const dialog = dialogRef.value
  if (!dialog) return
  
  const rect = dialog.getBoundingClientRect()
  
  dragStartPosition.value = {
    x: event.clientX,
    y: event.clientY,
    left: rect.left,
    top: rect.top
  }
  
  // 如果是第一次拖拽，设置初始位置
  if (dragPosition.value.x === 0 && dragPosition.value.y === 0) {
    dragPosition.value = {
      x: rect.left,
      y: rect.top
    }
  }
  
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
}

// 拖拽中
const handleDrag = (event: MouseEvent) => {
  if (!isDragging.value) return
  
  const dx = event.clientX - dragStartPosition.value.x
  const dy = event.clientY - dragStartPosition.value.y
  
  dragPosition.value = {
    x: dragStartPosition.value.left + dx,
    y: dragStartPosition.value.top + dy
  }
}

// 停止拖拽
const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
}

// 关闭对话框
const close = async () => {
  if (props.beforeClose) {
    try {
      await props.beforeClose(() => {
        emit('update:modelValue', false)
      })
    } catch (error) {
      // 如果beforeClose抛出错误，不关闭对话框
      console.error('Dialog beforeClose error:', error)
    }
  } else {
    emit('update:modelValue', false)
  }
}

// 取消按钮
const handleCancel = () => {
  emit('cancel')
  close()
}

// 确认按钮
const handleConfirm = () => {
  emit('confirm')
  if (!props.confirmLoading) {
    close()
  }
}

// 监听显示状态
watch(() => props.modelValue, (val) => {
  if (val) {
    emit('open')
    nextTick(() => {
      emit('opened')
    })
    
    // 重置拖拽位置
    if (props.draggable && !props.fullscreen) {
      nextTick(() => {
        const dialog = dialogRef.value
        if (dialog && dragPosition.value.x === 0 && dragPosition.value.y === 0) {
          const rect = dialog.getBoundingClientRect()
          dragPosition.value = {
            x: rect.left,
            y: rect.top
          }
        }
      })
    }
  } else {
    emit('close')
    setTimeout(() => {
      emit('closed')
    }, 300) // 动画结束后触发closed事件
  }
})

// 监听全屏状态
watch(() => props.fullscreen, (val) => {
  if (val) {
    // 重置拖拽位置
    dragPosition.value = { x: 0, y: 0 }
  }
})

// 组件销毁时移除事件监听
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
})

// 锁定滚动
const lockScroll = () => {
  if (props.modelValue) {
    document.body.classList.add('tw-overflow-hidden')
  } else {
    document.body.classList.remove('tw-overflow-hidden')
  }
}

watch(() => props.modelValue, lockScroll, { immediate: true })
onBeforeUnmount(() => {
  document.body.classList.remove('tw-overflow-hidden')
})

// 暴露方法
defineExpose({
  close
})
</script>

<style scoped>
.tw-dialog-overlay {
  @apply tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-overflow-auto;
  backdrop-filter: blur(2px);
}

.tw-dialog-overlay-mask {
  @apply tw-bg-black tw-bg-opacity-50;
}

.tw-dialog {
  @apply tw-bg-white tw-rounded-lg tw-shadow-xl tw-flex tw-flex-col tw-relative tw-max-h-[90vh] tw-max-w-[90vw] tw-mx-auto;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.tw-dialog-small {
  @apply tw-w-96;
}

.tw-dialog-medium {
  @apply tw-w-[32rem];
}

.tw-dialog-large {
  @apply tw-w-[48rem];
}

.tw-dialog-fullscreen {
  @apply tw-w-screen tw-h-screen tw-max-w-none tw-max-h-none tw-rounded-none;
}

.tw-dialog-draggable {
  @apply tw-absolute;
}

.tw-dialog-header {
  @apply tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-4 tw-border-b tw-border-gray-200;
  background-color: rgba(249, 250, 251, 0.8);
}

.tw-dialog-title {
  @apply tw-text-lg tw-font-medium tw-text-gray-900;
}

.tw-dialog-close {
  @apply tw-p-1.5 tw-rounded-full tw-text-gray-400 hover:tw-text-gray-500 hover:tw-bg-gray-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-offset-2 tw-transition-colors;
}

.tw-dialog-body {
  @apply tw-flex-1 tw-p-6 tw-overflow-auto;
}

.tw-dialog-footer {
  @apply tw-flex tw-justify-end tw-px-6 tw-py-4 tw-border-t tw-border-gray-200;
  background-color: rgba(249, 250, 251, 0.8);
}

/* 过渡动画 */
.tw-dialog-fade-enter-active,
.tw-dialog-fade-leave-active {
  @apply tw-transition-opacity tw-duration-300 tw-ease-out;
}

.tw-dialog-fade-enter-from,
.tw-dialog-fade-leave-to {
  @apply tw-opacity-0;
}

.tw-dialog-fade-enter-active .tw-dialog,
.tw-dialog-fade-leave-active .tw-dialog {
  @apply tw-transition-all tw-duration-300 tw-ease-out;
}

.tw-dialog-fade-enter-from .tw-dialog,
.tw-dialog-fade-leave-to .tw-dialog {
  @apply tw-transform tw-scale-95 tw-opacity-0;
}
</style> 
