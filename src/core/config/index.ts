import path from 'path'
import fs from 'fs'

export const configFileURL = `${path.join(process.cwd())}/self.config.js`

/**
 * @description 校验配置文件是否存在
 * @param {*} config
 */
export const getConfigExists = () => {
  return fs.existsSync(configFileURL)
}