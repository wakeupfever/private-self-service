import { ProxyInquirer } from '../util/proxyInquirer'
import { getConfigExists } from '../config/index'
import { infoLog } from '../util/outputLog'

export default {
  description: '文件上传服务',
  perform: () => {
    const isExistConfigFile = getConfigExists()
    if (isExistConfigFile) {
      infoLog('当前环境下已存在：self.config.js 文件')
      const { handlerConfirm } = new ProxyInquirer()
      handlerConfirm('是否重置配置文件：self.config.js 文件').then((alias) => {
        if (alias) {
        }
      })
    }
  }
  // desc: string = '初始化配置信息'

  // perform () {
  //   const isExistConfigFile = getConfigExists()
  //   if (isExistConfigFile) {
  //     infoLog('当前环境下已存在：self.config.js 文件')
  //     const { handlerConfirm } = new ProxyInquirer()
  //     handlerConfirm('是否初始化配置文件：self.config.js 文件').then((alias) => {
  //       if (alias) {
  //         console.log(123)
  //       }
  //     })
  //   }
  // }
}