import { configFileURL } from '../config/index'
import { initCreateConfigFile } from './init'
import { UpdateServer } from '../../updateService/index'

export default {
  description: '文件上传服务',
  perform: (mode: string = '') => {
    initCreateConfigFile(mode, () => {
      const configFileInfo = require(configFileURL)
      const config = configFileInfo[mode]
      const { project, serverFiles } = config
      const { coverUpData } = project
      const updateServer = new UpdateServer()
      if (coverUpData) {
        updateServer.uploadFile(serverFiles, project)
      } else {
        updateServer.coverUploadFile(serverFiles, project)
      }
    })
  }
}