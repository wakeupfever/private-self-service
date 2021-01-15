import { createConfigFile, formatConfigFile, createConfigJson } from './init'
import { printError, warningLog, underline } from '../util/outputLog'
import { getConfigExists, configFileURL } from '../config/index'
import { ProxyInquirer } from '../util/proxyInquirer'

const delConfigMode = async (mode) => {
  const isExistConfigFile = getConfigExists()
  if (isExistConfigFile) {
    let configFileInfo = require(configFileURL)
    const isResetModeConfig = mode in configFileInfo
    if (!isResetModeConfig) {
      printError(`${underline('self.config.js')}文件不存在 --mode: ${mode}`)
      return
    }
    delete configFileInfo[mode]
    createConfigFile(configFileInfo, mode)
    formatConfigFile()
  } else {
    warningLog(`当前环境下不存在：${underline('self.config.js')} 文件`)
    const inquirer = new ProxyInquirer()
    inquirer.handlerConfirm(`是否创建 ${underline('self.config.js')} 文件：${underline(mode)} 模式`).then(({ alias }: { alias: boolean }) => {
      if (alias) {
        createConfigFile(createConfigJson(mode, {}), mode)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}

export const commandConfig = {
  description: '删除配置信息',
  perform: (mode) => {
    delConfigMode(mode)
  }
}