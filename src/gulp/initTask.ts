import { UpdateServer } from '../updateService'
import { getConfig } from './config'

export const initTask = () => {
  const config = getConfig()
  const { project, serverFiles } = config
  const { coverUpData } = project
  const updateServer = new UpdateServer()
  if (coverUpData) {
    updateServer.uploadFile(serverFiles, project)
  } else {
    updateServer.coverUploadFile(serverFiles, project)
  }
}
