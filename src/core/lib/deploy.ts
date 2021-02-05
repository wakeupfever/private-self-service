import { configFileURL, checkConfigFile } from '../config/index'
import { initService } from '../lib/init'
import { UpdateServer } from '../../updateService/index'
import { printError, underline } from '../util/outputLog'
import { BaseTemplate } from 'src/types'

export const deployService = async(mode) => {
  const isNext = await checkConfigFile(mode)
  if (isNext) {
    const configFileInfo = require(configFileURL)
    const isResetModeConfig = mode in configFileInfo
    if (!isResetModeConfig) {
      printError(`请检查 ${underline('self.config.js')} 文件是否存在 --mode ${underline(mode)}`)
      return
    }
    const config: BaseTemplate = configFileInfo[mode]
    const { projectConfig, serverConfig, dingTalkConfig, testConfig } = config
    const { isCoverUpData } = projectConfig
    const updateServer = new UpdateServer()
    if (isCoverUpData) {
      updateServer.uploadFile(serverConfig, projectConfig, dingTalkConfig, testConfig)
    } else {
      updateServer.coverUploadFile(serverConfig, projectConfig, dingTalkConfig, testConfig)
    }
  } else {
    printError(`当前环境下不存在${underline('self.config.js')} 文件 无法执行部署服务`)
  }
}

export const commandConfig = {
  description: '文件上传服务',
  perform: (mode: string = '') => {
    deployService(mode)
  }
}