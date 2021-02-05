import inquirer from 'inquirer'
import { InquirerConfig } from '../../types/index'

export class ProxyInquirer {
  constructor() {
  }

  /**
   * @description inquirer config 
   * @type {InquirerConfig}
   * @memberof ProxyInquirer
   */
  private inquirerConfig: InquirerConfig = {
    name: 'alias',
    message: '',
    type: 'confirm'
  }

  /**
   * @description 统一封装 inquirer 调用
   * @param {*} config
   * @return {*}  {Promise<Function>}
   * @memberof ProxyInquirer
   */
  private async baseInquirer(config): Promise<{ alias: boolean }> {
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
  public handlerConfirm(message: string, isInquirer: boolean = true): Promise<{ alias: boolean }> {
    this.inquirerConfig.message = message
    this.inquirerConfig.type = 'confirm'
    if (isInquirer) {
      return this.baseInquirer({ ...this.inquirerConfig })
    }
    return new Promise((resolve) => resolve({ [this.inquirerConfig.name]: true }))
  }
}
