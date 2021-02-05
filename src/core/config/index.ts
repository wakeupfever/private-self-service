import path from 'path'
import fs from 'fs'

import { underline, warningLog } from '../util/outputLog'
import { createConfig } from '../lib/init'
import { ProxyInquirer } from '../util/proxyInquirer'

const inquirer = new ProxyInquirer()

export const configFileURL = `${path.join(process.cwd())}/self.config.js`

/**
 * @description 校验配置文件是否存在
 * @param {*} config
 */
export const getConfigExists = () => {
  return fs.existsSync(configFileURL)
}

/**
 * @param {Function} callback
 * @param {string} params
 */
export const checkConfigFile = (mode: string): Promise<boolean> => {
  return new Promise(async(resolve, reject) => {
    const isExistConfigFile = getConfigExists()
    if (!isExistConfigFile) {
      // warningLog(`当前环境下不存在：${underline('self.config.js')} 文件`)
      const { alias } = await inquirer.handlerConfirm(`当前环境下不存在 ${underline('self.config.js')} 文件，是否创建？`)
      if (alias) {
        await createConfig(Promise.resolve, mode)
      }
      resolve(alias)
    }
    resolve(true)
  })
}