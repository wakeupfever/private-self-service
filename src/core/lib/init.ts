import { ProxyInquirer } from '../util/proxyInquirer'
import { getConfigExists } from '../config/index'
import { infoLog } from '../util/outputLog'

const createConfigFile = async () => {
  console.log('createConfigFile')
}

const delConfigFile = async () => {
  console.log('delConfigFile')
}

export default {
  description: '初始化配置信息',
  perform: () => {
    const isExistConfigFile = getConfigExists()
    if (isExistConfigFile) {
      infoLog('当前环境下已存在：self.config.js 文件')
      const { handlerConfirm } = new ProxyInquirer()
      handlerConfirm('是否重置配置文件：self.config.js 文件').then((alias) => {
        if (alias) {
          createConfigFile()
        }
      })
    }
  }
}