import path from 'path'
import fs from 'fs'
import { printError } from '../util/outputLog'

/**
 * @description 校验配置文件是否存在
 * @param {*} config
 */
export const getConfigExists = () => {
  const url = `${path.join(process.cwd())}/self.config.js`
  if (!fs.existsSync(url)) {
    printError('请检查当前环境是否存在配置文件')
    return null
  }
  return require(url)
}