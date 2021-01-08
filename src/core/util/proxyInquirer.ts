import inquirer from 'inquirer'

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

export class ProxyInquirer {
  constructor() {
  }

  /**
   * @description inquirer config 
   * @type {InquirerConfig}
   * @memberof ProxyInquirer
   */
  public inquirerConfig: InquirerConfig = {
    name: 'alias',
    message: '',
    type: 'confirm'
  }

  /**
   * @description 统一封装 inquirer 调用
   *
   * @param {*} config
   * @return {*}  {Promise<Function>}
   * @memberof ProxyInquirer
   */
  async baseInquirer(config): Promise<Function> {
    const result = await inquirer.prompt([config])
    return result
  }

  /**
   * @description confirm 方法实现
   * @param {string} message
   * @param {boolean} isInquirer
   * @return {*}  {(Promise<Function | { alias: boolean }>)}
   * @memberof ProxyInquirer
   */
  handlerConfirm(message: string, isInquirer: boolean = true): Promise<Function | { alias: boolean } | { alias: InquirerAlias }> {
    this.inquirerConfig.message = message
    this.inquirerConfig.type = 'confirm'
    if (isInquirer) {
      return this.baseInquirer({ ...this.inquirerConfig })
    }
    return new Promise((resolve) => resolve({ [this.inquirerConfig.name]: true }))
  }
}
