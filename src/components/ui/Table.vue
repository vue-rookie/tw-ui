<template>
  <div class="tw-table-container">
    <!-- 表格顶部工具栏 -->
    <div v-if="slots.toolbar || showSearch" class="tw-table-toolbar">
      <slot name="toolbar"></slot>
      <div v-if="showSearch" class="tw-table-search">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="搜索..." 
          class="tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
          @input="handleSearch"
        />
      </div>
    </div>

    <!-- 表格主体 -->
    <div class="tw-overflow-x-auto tw-relative tw-shadow-md tw-rounded-lg">
      <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-700">
        <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
          <tr>
            <!-- 选择列 -->
            <th v-if="selectable" class="tw-px-4 tw-py-3 tw-w-10">
              <input 
                type="checkbox" 
                :checked="isAllSelected" 
                @change="toggleSelectAll" 
                class="tw-w-4 tw-h-4 tw-rounded tw-border-gray-300 focus:tw-ring-blue-500"
              />
            </th>
            
            <!-- 索引列 -->
            <th v-if="showIndex" class="tw-px-4 tw-py-3 tw-w-16">#</th>
            
            <!-- 数据列 -->
            <th 
              v-for="column in columns" 
              :key="column.prop" 
              class="tw-px-4 tw-py-3"
              :class="{ 'tw-cursor-pointer': column.sortable }"
              :style="{ width: column.width, textAlign: column.align || 'left' }"
              @click="column.sortable ? handleSort(column.prop) : null"
            >
              <div class="tw-flex tw-items-center tw-justify-between">
                <span>{{ column.label }}</span>
                <span v-if="column.sortable" class="tw-ml-1">
                  <svg v-if="sortField === column.prop && sortOrder === 'asc'" xmlns="http://www.w3.org/2000/svg" class="tw-h-4 tw-w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg v-else-if="sortField === column.prop && sortOrder === 'desc'" xmlns="http://www.w3.org/2000/svg" class="tw-h-4 tw-w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="tw-h-4 tw-w-4 tw-text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </span>
              </div>
            </th>
            
            <!-- 操作列 -->
            <th v-if="slots.action" class="tw-px-4 tw-py-3">操作</th>
          </tr>
        </thead>
        
        <tbody>
          <template v-if="filteredData.length > 0">
            <tr 
              v-for="(row, index) in paginatedData" 
              :key="row[rowKey]"
              class="tw-bg-white tw-border-b hover:tw-bg-gray-50"
              :class="{ 'tw-bg-blue-50': selectedRows.includes(row[rowKey]) }"
            >
              <!-- 选择列 -->
              <td v-if="selectable" class="tw-px-4 tw-py-3">
                <input 
                  type="checkbox" 
                  :checked="selectedRows.includes(row[rowKey])" 
                  @change="toggleRowSelection(row)" 
                  class="tw-w-4 tw-h-4 tw-rounded tw-border-gray-300 focus:tw-ring-blue-500"
                />
              </td>
              
              <!-- 索引列 -->
              <td v-if="showIndex" class="tw-px-4 tw-py-3">
                {{ (currentPage - 1) * pageSize + index + 1 }}
              </td>
              
              <!-- 数据列 -->
              <td 
                v-for="column in columns" 
                :key="column.prop" 
                class="tw-px-4 tw-py-3"
                :style="{ textAlign: column.align || 'left' }"
              >
                <template v-if="column.slot">
                  <slot :name="column.slot" :row="row" :index="index"></slot>
                </template>
                <template v-else-if="column.formatter">
                  {{ column.formatter(row[column.prop], row, index) }}
                </template>
                <template v-else>
                  {{ row[column.prop] }}
                </template>
              </td>
              
              <!-- 操作列 -->
              <td v-if="slots.action" class="tw-px-4 tw-py-3">
                <slot name="action" :row="row" :index="index"></slot>
              </td>
            </tr>
          </template>
          
          <!-- 空数据 -->
          <tr v-if="filteredData.length === 0">
            <td :colspan="getTotalColumns" class="tw-px-4 tw-py-8 tw-text-center tw-text-gray-500">
              <slot name="empty">
                <div class="tw-flex tw-flex-col tw-items-center tw-justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-12 tw-w-12 tw-text-gray-300 tw-mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>暂无数据</p>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 表格底部分页 -->
    <div v-if="showPagination && filteredData.length > 0" class="tw-flex tw-justify-between tw-items-center tw-mt-4">
      <div class="tw-text-sm tw-text-gray-700">
        显示 {{ (currentPage - 1) * pageSize + 1 }} 到 {{ Math.min(currentPage * pageSize, filteredData.length) }} 条，共 {{ filteredData.length }} 条
      </div>
      <div class="tw-flex tw-items-center tw-space-x-2">
        <select 
          v-model="pageSize" 
          class="tw-px-2 tw-py-1 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
        >
          <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}条/页</option>
        </select>
        
        <button 
          @click="currentPage = 1" 
          :disabled="currentPage === 1"
          class="tw-px-3 tw-py-1 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
        >
          首页
        </button>
        
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="tw-px-3 tw-py-1 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
        >
          上一页
        </button>
        
        <span class="tw-px-3 tw-py-1">{{ currentPage }} / {{ totalPages }}</span>
        
        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
          class="tw-px-3 tw-py-1 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
        >
          下一页
        </button>
        
        <button 
          @click="currentPage = totalPages" 
          :disabled="currentPage === totalPages"
          class="tw-px-3 tw-py-1 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
        >
          尾页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, useSlots } from 'vue'

interface Column {
  label: string
  prop: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  formatter?: (value: any, row: any, index: number) => string
  slot?: string
}

interface TableProps {
  data: any[]
  columns: Column[]
  rowKey: string
  selectable?: boolean
  showIndex?: boolean
  showPagination?: boolean
  pageSize?: number
  pageSizes?: number[]
  showSearch?: boolean
}

const props = withDefaults(defineProps<TableProps>(), {
  data: () => [],
  columns: () => [],
  rowKey: 'id',
  selectable: false,
  showIndex: false,
  showPagination: true,
  pageSize: 10,
  pageSizes: () => [10, 20, 50, 100],
  showSearch: false
})

const emit = defineEmits<{
  (e: 'selection-change', selection: any[]): void;
  (e: 'sort-change', payload: { prop: string, order: 'asc' | 'desc' | null }): void;
  (e: 'page-change', page: number): void;
}>()

const slots = useSlots()

// 搜索
const searchQuery = ref('')
const handleSearch = () => {
  currentPage.value = 1
}

// 排序
const sortField = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc' | null>(null)

const handleSort = (prop: string) => {
  if (sortField.value === prop) {
    if (sortOrder.value === 'asc') {
      sortOrder.value = 'desc'
    } else if (sortOrder.value === 'desc') {
      sortField.value = null
      sortOrder.value = null
    }
  } else {
    sortField.value = prop
    sortOrder.value = 'asc'
  }
  
  emit('sort-change', { prop: sortField.value as string, order: sortOrder.value })
}

// 筛选数据
const filteredData = computed(() => {
  let result = [...props.data]
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(row => {
      return props.columns.some(column => {
        const value = row[column.prop]
        return value !== null && value !== undefined && String(value).toLowerCase().includes(query)
      })
    })
  }
  
  // 排序
  if (sortField.value && sortOrder.value) {
    result.sort((a, b) => {
      const valueA = a[sortField.value as string]
      const valueB = b[sortField.value as string]
      
      if (valueA === valueB) return 0
      
      const result = valueA > valueB ? 1 : -1
      return sortOrder.value === 'asc' ? result : -result
    })
  }
  
  return result
})

// 分页
const currentPage = ref(1)
const pageSize = ref(props.pageSize)

watch(currentPage, (newVal) => {
  emit('page-change', newVal)
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / pageSize.value)
})

const paginatedData = computed(() => {
  if (!props.showPagination) return filteredData.value
  
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  
  return filteredData.value.slice(start, end)
})

// 行选择
const selectedRows = ref<any[]>([])

const toggleRowSelection = (row: any) => {
  const rowId = row[props.rowKey]
  const index = selectedRows.value.indexOf(rowId)
  
  if (index === -1) {
    selectedRows.value.push(rowId)
  } else {
    selectedRows.value.splice(index, 1)
  }
  
  emit('selection-change', selectedRows.value.map(id => 
    props.data.find(item => item[props.rowKey] === id)
  ))
}

const isAllSelected = computed(() => {
  return paginatedData.value.length > 0 && paginatedData.value.every(row => 
    selectedRows.value.includes(row[props.rowKey])
  )
})

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    // 取消全选
    paginatedData.value.forEach(row => {
      const rowId = row[props.rowKey]
      const index = selectedRows.value.indexOf(rowId)
      if (index !== -1) {
        selectedRows.value.splice(index, 1)
      }
    })
  } else {
    // 全选
    paginatedData.value.forEach(row => {
      const rowId = row[props.rowKey]
      if (!selectedRows.value.includes(rowId)) {
        selectedRows.value.push(rowId)
      }
    })
  }
  
  emit('selection-change', selectedRows.value.map(id => 
    props.data.find(item => item[props.rowKey] === id)
  ))
}

// 计算总列数
const getTotalColumns = computed(() => {
  let count = props.columns.length
  if (props.selectable) count++
  if (props.showIndex) count++
  if (slots.action) count++
  return count
})

// 暴露方法
defineExpose({
  clearSelection: () => {
    selectedRows.value = []
    emit('selection-change', [])
  },
  getSelection: () => {
    return selectedRows.value.map(id => 
      props.data.find(item => item[props.rowKey] === id)
    )
  }
})
</script>

<style scoped>
.tw-table-container {
  @apply tw-w-full;
}

.tw-table-toolbar {
  @apply tw-flex tw-justify-between tw-items-center tw-mb-4;
}

.tw-table-search {
  @apply tw-flex tw-items-center;
}
</style>
