import { createConfigFile, formatConfigFile } from './init'
import { printError, underline } from '../util/outputLog'
import { configFileURL, checkConfigFile } from '../config/index'
import { initService } from '../lib/init'

export const delConfigMode = async (mode) => {
  const isNext = await checkConfigFile(mode)
  if (isNext) {
    let configFileInfo = require(configFileURL)
    const isResetModeConfig = mode in configFileInfo
    if (!isResetModeConfig) {
      printError(`${underline('self.config.js')} 不存在 --mode: ${mode}`)
      return
    }
    delete configFileInfo[mode]
    await createConfigFile(configFileInfo, mode, !isResetModeConfig)
    formatConfigFile()
  } else {
    printError(`当前环境下不存在${underline('self.config.js')} 文件 无法删除 --mode: ${mode}`)
  }
}

export const commandConfig = {
  description: '删除配置信息',
  perform: (mode) => {
    delConfigMode(mode)
  }
}