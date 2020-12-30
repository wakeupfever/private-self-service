import { initTask } from './initTask'

export const v1 = (cb) => {
  initTask()
  cb()
}