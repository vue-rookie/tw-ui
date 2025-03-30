import type { FormItemValidateResult } from '../components/ui/Form'

export interface FormInstance {
  validate: (callback?: (valid: boolean) => void) => Promise<boolean>
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  validateField: (prop: string) => Promise<FormItemValidateResult>
} 