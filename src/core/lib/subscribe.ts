import { GetNotice } from '../../notice'
import { BaseTemplate, DingTalkConfig, TestConfig } from '../../types'
import { configFileURL, checkConfigFile, getConfigExists } from '../config/index'
import { initService } from '../lib/init'
import { printError, underline } from '../util/outputLog'

export const subscribeService = async (mode: string) => {
  const isExistConfigFile = getConfigExists()
  if (!isExistConfigFile) {
    printError(`请检查 ${underline('self.config.js')} 文件是否存在`)
    return
  }
  const configFileInfo = require(configFileURL)
  const isResetModeConfig = mode in configFileInfo
  if (!isResetModeConfig) {
    printError(`请检查 ${underline('self.config.js')} 文件是否存在 --mode ${underline(mode)}`)
    return
  }
  const config = configFileInfo[mode]
  const { dingTalkConfig, testConfig, projectConfig } = config
  const { subscribeString, subscribeArray } = dingTalkConfig
  let txt = subscribeArray.length ? subscribeArray : subscribeString
  const serializationSubscribe = new GetNotice()
  serializationSubscribe.serializationSubscribe(txt, projectConfig, dingTalkConfig, testConfig)
}

export const commandConfig = {
  description: '订阅推送',
  perform: (mode) => {
    subscribeService(mode)
  }
}