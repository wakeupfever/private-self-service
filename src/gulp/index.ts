// import { initTask } from './initTask'
import config from '../core/lib/init'

export const v1 = (cb) => {
  // initTask()
  config.perform('test')
  cb()
}