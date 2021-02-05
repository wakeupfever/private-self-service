import * as init from '../core/lib/init'
import * as subscribe from '../core/lib/subscribe'
import * as remove from '../core/lib/remove'
import * as deploy from '../core/lib/deploy'

export const i = (cb) => {
  init.commandConfig.perform('dev')
  cb()
}

export const r = (cb) => {
  remove.commandConfig.perform('dev')
  cb()
}

export const d = (cb) => {
  deploy.commandConfig.perform('dev')
  cb()
}

export const s = (cb) => {
  subscribe.commandConfig.perform('dev')
  cb()
}