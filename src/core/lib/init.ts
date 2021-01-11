import fs from 'fs'
import childProcess from 'child_process'

import { ProxyInquirer } from '../util/proxyInquirer'
import { getConfigExists } from '../config/index'
import { infoLog, printError } from '../util/outputLog'
import { configFileURL } from '../config/index'

const createConfigFile = async (json) => {
  // console.log('delConfigFile')
  const str = `module.exports = ${JSON.stringify(json, null, 2)}`
  fs.writeFileSync(configFileURL, str)
}

const createConfigJson = (env: string) => {
  const configFileInfo = require(configFileURL)
  const baseTemplate = {
    [env]: {
      project: {
        name: '',
        scriptSh: '',
        dist: '',
        remote: '',
        remoteWidthList: '',
        getCopyFile: '',
        isGetFiles: '',
        coverUpData: '',
        isInquirer: '',
        isDingTalk: ''
      },
      serverFiles: {
        host: '',
        port: '',
        username: '',
        password: '',
      },
      testInfo: {
        testers: [],
        developer: ['']
      },
      dingTalk: {
        development: {
          robot: ''
        },
        production: {
          robot: ''
        }
      }
    }
  }
  return { ...configFileInfo, ...baseTemplate }
}

const formatConfigFile = () => {
  childProcess.execSync(`npx prettier --write ${configFileURL}`)
}

const delConfigFile = async (json) => {
  console.log('createConfigFile')
}

export default {
  description: '初始化配置信息',
  perform: (mode: string = '') => {
    const isExistConfigFile = getConfigExists()
    if (!mode) {
      printError('请指定初始化文件 --mode, 例如：dev, test, prod')
      return
    }
    if (isExistConfigFile) {
      infoLog('当前环境下已存在：self.config.js 文件')
      const inquirer = new ProxyInquirer()
      inquirer.handlerConfirm(`是否增加配置文件模式：self.config.js 文件 --mode ${mode} 模式`).then(({ alias }: { alias: boolean }) => {
        if (alias) {
          createConfigFile(createConfigJson(mode))
          // formatConfigFile()
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      createConfigFile(createConfigJson(mode))
    }
  }
}