<template>
  <div 
    class="tw-upload"
    :class="{ 
      'tw-upload-drag': drag, 
      'tw-upload-drag-over': isDragOver,
      'tw-upload-disabled': disabled
    }"
  >
    <!-- 拖拽上传区域 -->
    <div 
      v-if="drag" 
      class="tw-upload-drag-area"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="handleClick"
    >
      <slot name="drag">
        <div class="tw-upload-drag-icon">
          <Icon icon="mdi:cloud-upload" class="tw-h-12 tw-w-12" />
        </div>
        <div class="tw-upload-drag-text">拖拽文件到此处或<span class="tw-text-blue-500">点击上传</span></div>
        <div class="tw-upload-drag-hint">{{ hint || (multiple ? '支持多文件上传' : '只能上传单个文件') }}</div>
      </slot>
    </div>
    
    <!-- 普通上传按钮 -->
    <div v-else class="tw-upload-select" @click="handleClick">
      <slot>
        <button 
          type="button" 
          class="tw-px-4 tw-py-2 tw-bg-blue-500 tw-text-white tw-rounded-md hover:tw-bg-blue-600 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-offset-2 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
          :disabled="disabled"
        >
          <span class="tw-flex tw-items-center">
            <Icon icon="mdi:upload" class="tw-h-5 tw-w-5 tw-mr-2" />
            {{ buttonText || '上传文件' }}
          </span>
        </button>
      </slot>
    </div>
    
    <!-- 文件列表 -->
    <div v-if="showFileList && fileList.length > 0" class="tw-upload-file-list">
      <div 
        v-for="file in fileList" 
        :key="file.uid" 
        class="tw-upload-file-item"
        :class="{ 'tw-upload-file-item-error': file.status === 'error' }"
      >
        <div class="tw-upload-file-info">
          <div class="tw-upload-file-name">
            <Icon 
              :icon="getFileIcon(file.name)" 
              class="tw-h-5 tw-w-5 tw-mr-2 tw-text-gray-400" 
            />
            {{ file.name }}
          </div>
          <div class="tw-upload-file-size">{{ formatFileSize(file.size) }}</div>
        </div>
        
        <div class="tw-upload-file-actions">
          <!-- 预览按钮 -->
          <button 
            v-if="file.status === 'success' && isPreviewable(file.name)"
            type="button"
            class="tw-upload-file-action"
            @click="handlePreview(file)"
          >
            <Icon icon="mdi:eye" class="tw-h-4 tw-w-4" />
          </button>
          
          <!-- 下载按钮 -->
          <button 
            v-if="file.status === 'success'"
            type="button"
            class="tw-upload-file-action"
            @click="handleDownload(file)"
          >
            <Icon icon="mdi:download" class="tw-h-4 tw-w-4" />
          </button>
          
          <!-- 删除按钮 -->
          <button 
            type="button"
            class="tw-upload-file-action"
            @click="handleRemove(file)"
          >
            <Icon icon="mdi:close" class="tw-h-4 tw-w-4" />
          </button>
        </div>
        
        <!-- 上传进度 -->
        <div v-if="file.status === 'uploading'" class="tw-upload-file-progress">
          <div class="tw-upload-progress-bar">
            <div 
              class="tw-upload-progress-inner"
              :style="{ width: `${file.percentage}%` }"
            ></div>
          </div>
          <div class="tw-upload-progress-text">{{ file.percentage }}%</div>
        </div>
        
        <!-- 错误信息 -->
        <div v-if="file.status === 'error'" class="tw-upload-file-error">
          {{ file.error?.message || '上传失败' }}
        </div>
      </div>
    </div>
    
    <!-- 图片预览弹窗 -->
    <div v-if="previewVisible" class="tw-upload-preview-modal" @click="closePreview">
      <div class="tw-upload-preview-content" @click.stop>
        <img :src="previewImage" alt="预览图片" class="tw-upload-preview-image" />
        <button type="button" class="tw-upload-preview-close" @click="closePreview">
          <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-6 tw-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 隐藏的文件输入框 -->
    <input 
      ref="inputRef"
      type="file"
      class="tw-hidden"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

export interface UploadFile {
  uid: string
  name: string
  size: number
  type: string
  status: 'ready' | 'uploading' | 'success' | 'error'
  percentage?: number
  url?: string
  raw?: File
  response?: any
  error?: any
}

interface UploadProps {
  action: string
  headers?: Record<string, string>
  multiple?: boolean
  data?: Record<string, any>
  name?: string
  drag?: boolean
  accept?: string
  listType?: 'text' | 'picture'
  autoUpload?: boolean
  limit?: number
  disabled?: boolean
  showFileList?: boolean
  fileList?: UploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File | Blob>
  beforeRemove?: (file: UploadFile, fileList: UploadFile[]) => boolean | Promise<boolean>
  onExceed?: (files: File[], fileList: UploadFile[]) => void
  buttonText?: string
  hint?: string
}

const props = withDefaults(defineProps<UploadProps>(), {
  headers: () => ({}),
  multiple: false,
  data: () => ({}),
  name: 'file',
  drag: false,
  listType: 'text',
  autoUpload: true,
  disabled: false,
  showFileList: true,
  fileList: () => []
})

const emit = defineEmits<{
  (e: 'update:fileList', fileList: UploadFile[]): void;
  (e: 'change', file: UploadFile, fileList: UploadFile[]): void;
  (e: 'success', response: any, file: UploadFile, fileList: UploadFile[]): void;
  (e: 'error', error: any, file: UploadFile, fileList: UploadFile[]): void;
  (e: 'progress', event: ProgressEvent, file: UploadFile, fileList: UploadFile[]): void;
  (e: 'preview', file: UploadFile): void;
  (e: 'remove', file: UploadFile, fileList: UploadFile[]): void;
  (e: 'exceed', files: File[], fileList: UploadFile[]): void;
}>()

// 内部状态
const inputRef = ref<HTMLInputElement | null>(null)
const isDragOver = ref(false)
const fileList = ref<UploadFile[]>([...props.fileList])
const previewVisible = ref(false)
const previewImage = ref('')
const uploadRequests = ref<Record<string, XMLHttpRequest>>({})

// 监听外部fileList变化
watch(() => props.fileList, (newVal) => {
  fileList.value = [...newVal]
}, { deep: true })

// 生成唯一ID
const generateUid = (): string => {
  return `upload-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

// 判断是否为图片文件
const isImageFile = (file: UploadFile): boolean => {
  return file.type.startsWith('image/')
}

// 点击上传按钮
const handleClick = () => {
  if (props.disabled) return
  inputRef.value?.click()
}

// 处理文件选择
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  
  if (!files) return
  
  uploadFiles(Array.from(files))
  
  // 重置input，确保能重复选择相同文件
  target.value = ''
}

// 处理拖拽
const handleDragOver = (e: DragEvent) => {
  if (props.disabled) return
  isDragOver.value = true
  e.dataTransfer!.dropEffect = 'copy'
}

const handleDragLeave = () => {
  isDragOver.value = false
}

const handleDrop = (e: DragEvent) => {
  if (props.disabled) return
  isDragOver.value = false
  
  const files = e.dataTransfer?.files
  if (!files) return
  
  uploadFiles(Array.from(files))
}

// 上传文件
const uploadFiles = async (files: File[]) => {
  if (props.limit && fileList.value.length + files.length > props.limit) {
    emit('exceed', files, fileList.value)
    if (props.onExceed) {
      props.onExceed(files, fileList.value)
    }
    return
  }
  
  if (!props.multiple && files.length > 1) {
    files = [files[0]]
  }
  
  for (const file of files) {
    let processedFile = file
    
    // 执行上传前处理
    if (props.beforeUpload) {
      try {
        const result = await props.beforeUpload(file)
        if (result === false) {
          continue
        } else if (result instanceof File || result instanceof Blob) {
          processedFile = result as File
        }
      } catch (err) {
        continue
      }
    }
    
    // 创建上传文件对象
    const uploadFile: UploadFile = {
      uid: generateUid(),
      name: processedFile.name,
      size: processedFile.size,
      type: processedFile.type,
      status: 'ready',
      percentage: 0,
      raw: processedFile
    }
    
    // 添加到文件列表
    fileList.value.push(uploadFile)
    emit('update:fileList', fileList.value)
    emit('change', uploadFile, fileList.value)
    
    // 自动上传
    if (props.autoUpload) {
      upload(uploadFile)
    }
  }
}

// 上传单个文件
const upload = (file: UploadFile) => {
  if (!file.raw) return
  
  file.status = 'uploading'
  file.percentage = 0
  
  const formData = new FormData()
  formData.append(props.name, file.raw)
  
  // 添加额外数据
  if (props.data) {
    Object.keys(props.data).forEach(key => {
      formData.append(key, props.data![key])
    })
  }
  
  const xhr = new XMLHttpRequest()
  uploadRequests.value[file.uid] = xhr
  
  // 上传进度
  xhr.upload.addEventListener('progress', (e) => {
    if (e.total > 0) {
      file.percentage = Math.round((e.loaded * 100) / e.total)
      emit('progress', e, file, fileList.value)
    }
  })
  
  // 上传完成
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      file.status = 'success'
      file.response = JSON.parse(xhr.responseText)
      delete uploadRequests.value[file.uid]
      emit('success', file.response, file, fileList.value)
    } else {
      file.status = 'error'
      file.error = xhr.responseText || xhr.statusText
      emit('error', file.error, file, fileList.value)
    }
    emit('change', file, fileList.value)
  })
  
  // 上传错误
  xhr.addEventListener('error', () => {
    file.status = 'error'
    file.error = xhr.responseText || xhr.statusText
    delete uploadRequests.value[file.uid]
    emit('error', file.error, file, fileList.value)
    emit('change', file, fileList.value)
  })
  
  // 发送请求
  xhr.open('POST', props.action, true)
  
  // 设置请求头
  if (props.headers) {
    Object.keys(props.headers).forEach(key => {
      xhr.setRequestHeader(key, props.headers![key])
    })
  }
  
  xhr.send(formData)
}

// 移除文件
const handleRemove = async (file: UploadFile) => {
  if (props.beforeRemove) {
    try {
      const result = await props.beforeRemove(file, fileList.value)
      if (result === false) return
    } catch (err) {
      return
    }
  }
  
  // 取消上传中的请求
  if (file.status === 'uploading') {
    const xhr = uploadRequests.value[file.uid]
    if (xhr) {
      xhr.abort()
      delete uploadRequests.value[file.uid]
    }
  }
  
  fileList.value = fileList.value.filter(f => f.uid !== file.uid)
  emit('update:fileList', fileList.value)
  emit('remove', file, fileList.value)
}

// 预览图片
const handlePreview = (file: UploadFile) => {
  if (!isImageFile(file) || !file.url) return
  
  previewImage.value = file.url
  previewVisible.value = true
  emit('preview', file)
}

// 关闭预览
const closePreview = () => {
  previewVisible.value = false
  previewImage.value = ''
}

// 组件销毁前取消所有上传请求
onBeforeUnmount(() => {
  Object.keys(uploadRequests.value).forEach(uid => {
    uploadRequests.value[uid].abort()
  })
})

// 暴露方法
defineExpose({
  submit: () => {
    fileList.value.forEach(file => {
      if (file.status === 'ready') {
        upload(file)
      }
    })
  },
  clearFiles: () => {
    fileList.value = []
    emit('update:fileList', fileList.value)
  },
  abort: (file?: UploadFile) => {
    if (file) {
      const xhr = uploadRequests.value[file.uid]
      if (xhr) {
        xhr.abort()
        delete uploadRequests.value[file.uid]
      }
    } else {
      Object.keys(uploadRequests.value).forEach(uid => {
        uploadRequests.value[uid].abort()
        delete uploadRequests.value[uid]
      })
    }
  }
})
</script>

<style scoped>
.tw-upload {
  @apply tw-w-full;
}

.tw-upload-drag {
  @apply tw-border-2 tw-border-dashed tw-border-gray-300 tw-rounded-lg tw-transition-colors;
}

.tw-upload-drag-over {
  @apply tw-border-blue-500 tw-bg-blue-50;
}

.tw-upload-disabled {
  @apply tw-opacity-50 tw-cursor-not-allowed;
}

.tw-upload-drag-area {
  @apply tw-p-6 tw-flex tw-flex-col tw-items-center tw-justify-center tw-cursor-pointer;
}

.tw-upload-drag-icon {
  @apply tw-text-gray-400 tw-mb-2;
}

.tw-upload-drag-text {
  @apply tw-text-gray-700 tw-font-medium tw-mb-1;
}

.tw-upload-drag-hint {
  @apply tw-text-gray-500 tw-text-sm;
}

.tw-upload-file-list {
  @apply tw-mt-4 tw-space-y-2;
}

.tw-upload-file-item {
  @apply tw-flex tw-items-center tw-p-3 tw-border tw-border-gray-200 tw-rounded-md tw-bg-white;
}

.tw-upload-file-thumbnail {
  @apply tw-w-12 tw-h-12 tw-flex tw-items-center tw-justify-center tw-mr-3 tw-bg-gray-100 tw-rounded;
}

.tw-upload-file-image {
  @apply tw-max-w-full tw-max-h-full tw-object-cover tw-rounded tw-cursor-pointer;
}

.tw-upload-file-info {
  @apply tw-flex-1 tw-min-w-0;
}

.tw-upload-file-name {
  @apply tw-truncate tw-text-sm tw-font-medium tw-text-gray-700;
}

.tw-upload-file-size {
  @apply tw-text-xs tw-text-gray-500;
}

.tw-upload-file-actions {
  @apply tw-flex tw-items-center tw-space-x-2 tw-ml-3;
}

.tw-upload-file-action {
  @apply tw-flex tw-items-center tw-justify-center tw-p-1 tw-rounded-full;
  @apply hover:tw-bg-gray-100 tw-transition-colors tw-duration-200;
}

.tw-upload-preview-modal {
  @apply tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-75;
}

.tw-upload-preview-content {
  @apply tw-relative tw-max-w-4xl tw-max-h-[90vh] tw-bg-white tw-rounded-lg tw-overflow-hidden;
}

.tw-upload-preview-image {
  @apply tw-max-w-full tw-max-h-[90vh] tw-object-contain;
}

.tw-upload-preview-close {
  @apply tw-absolute tw-top-2 tw-right-2 tw-p-1 tw-rounded-full tw-bg-white tw-text-gray-700 hover:tw-text-gray-900 focus:tw-outline-none;
}

.tw-upload-file-item-error {
  @apply tw-border-red-500;
}

.tw-upload-file-progress {
  @apply tw-mt-1 tw-h-1.5 tw-w-full tw-bg-gray-200 tw-rounded-full tw-overflow-hidden;
}

.tw-upload-progress-bar {
  @apply tw-h-full tw-bg-blue-500 tw-rounded-full tw-transition-all;
}

.tw-upload-progress-inner {
  @apply tw-h-full tw-bg-blue-500 tw-rounded-full tw-transition-all;
}

.tw-upload-progress-text {
  @apply tw-text-xs tw-text-gray-500 tw-text-center;
}

.tw-upload-file-error {
  @apply tw-text-red-500 tw-text-sm;
}
</style> 