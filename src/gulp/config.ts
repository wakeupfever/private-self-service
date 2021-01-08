import minimist from 'minimist'
import { getConfigExists } from '../core/config';
import { printError } from '../core/util/outputLog'

/**
 * @description 获取基本信息
 * @return {*} 
 */
export const getConfig = () => {
  const knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'production' }
  }
  const options = minimist(process.argv.slice(2), knownOptions);
  const { mode } = options
  if (!mode) {
    printError('请选择指定模式')
    return null
  }
  const config = getConfigExists()
  if (!config) return
  const configMode = config[mode]
  if (!configMode) {
    printError('请检查配置文件模式')
    return null
  }
  return configMode
}