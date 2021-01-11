import path from 'path'
import fs from 'fs'
import { printError } from '../util/outputLog'

export const configFileURL = `${path.join(process.cwd())}/self.config.js`

/**
 * @description 校验配置文件是否存在
 * @param {*} config
 */
export const getConfigExists = () => {
  if (!fs.existsSync(configFileURL)) {
    return null
  }
  return require(configFileURL)
}