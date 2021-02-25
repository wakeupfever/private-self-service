import fs from 'fs'
import childProcess from 'child_process'

import { ProxyInquirer } from '../util/proxyInquirer'
import { getConfigExists, configFileURL } from '../config/index'
import { infoLog, successLog, underline } from '../util/outputLog'
import { BaseTemplate } from '../../types'

const inquirer = new ProxyInquirer()

export const createConfigFile = async (json: object, mode: string, isCreate: boolean = true) => {
  const str = `module.exports = ${JSON.stringify(json, null, 2)}`
  fs.writeFileSync(configFileURL, str)
  successLog(`${isCreate ? '初始化' : '删除'} ${underline('self.config.js')} --mode ${underline(mode)} 成功`)
}

export const createConfigJson = (env: string, config: BaseTemplate | object) => {
  const baseTemplate: {
    [key: string]: BaseTemplate
  } = {
    [env]: {
      projectConfig: {
        name: '',
        version: '',
        dist: '',
        remote: '',
        remoteWidthList: [],
        copyFilePath: [],
        isGetFiles: false,
        isCoverUpData: true,
        isInquirer: false,
        isDingTalk: false
      },
      serverConfig: {
        host: '',
        port: 22,
        username: '',
        password: '',
      },
      testConfig: {
        testers: [],
        developer: ['']
      },
      dingTalkConfig: {
        robot: '',
        subscribeString: '',
        subscribeArray: []
      }
    }
  }
  return { ...config, ...baseTemplate }
}

export const formatConfigFile = () => {
  childProcess.execSync(`npx prettier --write ${configFileURL}`)
}

/**
 * @param {*} resolve
 * @param {*} mode
 * @return {*} 
 */
export const createConfig = async (resolve: Function, mode: string): Promise<Function> => {
  const { alias } = await inquirer.handlerConfirm(`创建${underline('self.config.js')} 文件：--mode ${underline(mode)} 模式`)
  if (alias) {
    await createConfigFile(createConfigJson(mode, {}), mode)
    formatConfigFile()
    return resolve(true)
  }
  return resolve(false)
}

/**
 * @param {*} resolve
 * @param {*} mode
 * @return {*} 
 */
export const resetConfig = async (resolve: Function, mode: string): Promise<Function> => {
  infoLog(`当前环境下已存在：${underline('self.config.js')} 文件`)
  const configFileInfo = require(configFileURL)
  const isResetModeConfig = mode in configFileInfo
  const { alias } = await inquirer.handlerConfirm(`是否${isResetModeConfig ? '重置' : '创建'} ${underline('self.config.js')} 文件：--mode ${underline(mode)} 模式`)
  if (alias) {
    await createConfigFile(createConfigJson(mode, configFileInfo), mode)
    formatConfigFile()
    return resolve(true)
  }
  return resolve(false)
}

/**
 * @param {string} mode
 * @return {*}  {Promise<boolean>}
 */
export const initService = async (mode: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const isExistConfigFile = getConfigExists()
    if (isExistConfigFile) {
      resetConfig(resolve, mode)
    } else {
      createConfig(resolve, mode)
    }
  })
}

export const commandConfig = {
  description: '初始化配置信息',
  perform: (mode) => {
    initService(mode)
  }
}