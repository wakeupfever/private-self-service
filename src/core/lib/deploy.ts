import { configFileURL, getConfigExists } from '../config/index'
import { initCreateConfigFile } from '../lib/init'
import { UpdateServer } from '../../updateService/index'
import { printError, underline } from '../util/outputLog'


const deployService = (mode) => {
  const isExistConfigFile = getConfigExists()
  if (!isExistConfigFile) {
    initCreateConfigFile(mode)
  } else {
    const configFileInfo = require(configFileURL)
    const isResetModeConfig = mode in configFileInfo
    if (!isResetModeConfig) {
      printError(`请检查 ${underline('self.config.js')} 文件是否存在 --mode ${underline(mode)}`)
      return
    }
    const config = configFileInfo[mode]
    const { project, serverFiles } = config
    const { coverUpData } = project
    const updateServer = new UpdateServer()
    if (coverUpData) {
      updateServer.uploadFile(serverFiles, project)
    } else {
      updateServer.coverUploadFile(serverFiles, project)
    }
  }
}

export const commandConfig = {
  description: '文件上传服务',
  perform: (mode: string = '') => {
    deployService(mode)
  }
}