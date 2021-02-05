export type InquirerAlias = 'alias'

export interface InquirerConfig {
  type: 'input' | 'number' | 'confirm' | 'list' | 'rawlist' | 'expand' | 'checkbox' | 'password' | 'editor'
  name: InquirerAlias
  message: string | Function
  default?: string | number | boolean | any[] | Function
  choices?: any[] | Function
  validate?: Function
  filter?: Function
  transformer?: Function
  when?: boolean | Function
  pageSize?: number
  prefix?: string
  suffix?: string
  askAnswered?: boolean
  loop?: boolean
}