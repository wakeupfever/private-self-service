import fs from 'fs'
import childProcess from 'child_process'

import { ProxyInquirer } from '../util/proxyInquirer'
import { getConfigExists, configFileURL } from '../config/index'
import { infoLog, successLog, underline } from '../util/outputLog'

export const createConfigFile = async (json, mode) => {
  const str = `module.exports = ${JSON.stringify(json, null, 2)}`
  fs.writeFileSync(configFileURL, str)
  successLog(`初始化 ${underline('self.config.js')} --mode ${underline(mode)} 成功`)
}

export const createConfigJson = (env: string, config) => {
  const baseTemplate = {
    [env]: {
      project: {
        name: '',
        scriptSh: '',
        dist: '',
        remote: '',
        remoteWidthList: [],
        getCopyFile: [],
        isGetFiles: false,
        coverUpData: true,
        isInquirer: false,
        isDingTalk: false
      },
      serverFiles: {
        host: '',
        port: 22,
        username: '',
        password: '',
      },
      testInfo: {
        testers: [],
        developer: ['']
      },
      dingTalk: {
        development: {
          robot: ''
        },
        production: {
          robot: ''
        }
      }
    }
  }
  return { ...config, ...baseTemplate }
}

export const formatConfigFile = () => {
  childProcess.execSync(`npx prettier --write ${configFileURL}`)
}

export const initCreateConfigFile = (mode: string) => {
  const isExistConfigFile = getConfigExists()
  if (isExistConfigFile) {
    infoLog('当前环境下已存在：self.config.js 文件')
    const inquirer = new ProxyInquirer()
    const configFileInfo = require(configFileURL)
    const isResetModeConfig = mode in configFileInfo
    inquirer.handlerConfirm(`是否${isResetModeConfig ? '重置' : '创建'} ${underline('self.config.js')} 文件：--mode ${underline(mode)} 模式`).then(({ alias }: { alias: boolean }) => {
      if (alias) {
        createConfigFile(createConfigJson(mode, configFileInfo), mode)
        formatConfigFile()
      }
    }).catch(err => {
      console.log(err)
    })
  } else {
    createConfigFile(createConfigJson(mode, {}), mode)
  }
}

export const commandConfig = {
  description: '初始化配置信息',
  perform: (mode) => {
    initCreateConfigFile(mode)
  }
}