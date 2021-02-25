'use strict'

import gulp from 'gulp'
import NodeSSH from 'node-ssh'
import fs from 'fs'
import path from 'path'

import { uploadFileSftp } from '../core/util/uploadFileSftp'
import { ProxyInquirer } from '../core/util/proxyInquirer'
import { printError, successLog, underline } from '../core/util/outputLog'
import { CopyFilePath, ServerConfig, ProjectConfig, DingTalkConfig, TestConfig } from '../types'
import { GetNotice } from '../notice'
import { defaultNoticeTxt } from '../notice'
import { timeFormat } from '../core/util/formatDate'

const ssh = new NodeSSH()

const proxyInquirer = new ProxyInquirer()

const notice = new GetNotice()

export class UpdateServer {
  /**
   * @description 复制项目配置内列表，复制到指定文件夹，然后一次性上传到服务器
   * @param {CopyFilePath} copyFilePath
   * @param {string} dist
   * @return {*} 
   * @memberof UpdateServer
   */
  handleCopyFilePath(copyFilePath: CopyFilePath, dist: string) {
    if (!copyFilePath.length) return
    if (!fs.existsSync(dist)) {
      fs.mkdir(dist, { recursive: true }, (err) => {
        if (err) throw err
      })
    }
    // const isCheckFile = copyFilePath.map(item => item).every(item => fs.existsSync(item))
    copyFilePath.forEach(item => {
      let path = item.replace(/[*|/]/g, '')
      let isCheckFile = fs.existsSync(path)
      if (!isCheckFile) {
        printError(`请检查上传聚合目录是否存在：${underline(path)}`)
        process.exit(0)
      }
    })
    return gulp.src(copyFilePath, { base: '.', allowEmpty: true }).pipe(gulp.dest(dist))
  }

  /**
   * @description 覆盖式上传，上传完之后会覆盖远程文件内所有文件
   * @param {ServerConfig} config
   * @param {ProjectConfig} projectConfig
   * @param {DingTalkConfig} dingTalkConfig
   * @param {TestConfig} testConfig
   * @memberof UpdateServer
   */
  async coverUploadFile(config: ServerConfig, projectConfig: ProjectConfig, dingTalkConfig: DingTalkConfig, testConfig: TestConfig) {
    const { dist, remote, isGetFiles, copyFilePath, name, isInquirer, isDingTalk } = projectConfig
    const { subscribeString, subscribeArray } = dingTalkConfig
    if (!fs.existsSync(dist)) {
      printError(`请检查上传指定目录是否存在：${underline(dist)}`)
      return
    }
    if (isGetFiles) await this.handleCopyFilePath(copyFilePath, dist)
    const localDir = path.resolve(dist)
    const sshConfig = {
      ...config,
      path: [
        // 文件夹上传服务器
        {
          type: 'dir',
          from: path.resolve(localDir), // 本地地址
          to: remote // 服务器地址
        }
      ]
    }
    const { alias } = await proxyInquirer.handlerConfirm(`${underline(name)} 确认更新吗`, isInquirer)
    if (alias) {
      const isNext = await uploadFileSftp(sshConfig)
      if (isNext) {
        successLog(`${underline(name)} 执行成功 已上传完毕`)
        if (isDingTalk) {
          const subscribeTxt = subscribeString || subscribeArray.length && subscribeArray || defaultNoticeTxt(projectConfig, testConfig)
          notice.serializationSubscribe(subscribeTxt, projectConfig, dingTalkConfig, testConfig)
        }
      } else {
        printError(`${underline(name)} 执行失败`)
      }
    }
  }

  /**
   * @description 非覆盖式上传，上传完成后，当前文件内的其他文件还会存在
   * @param {ServerConfig} config
   * @param {ProjectConfig} projectConfig
   * @param {DingTalkConfig} dingTalkConfig
   * @param {TestConfig} testConfig
   * @memberof UpdateServer
   */
  async uploadFile(config: ServerConfig, projectConfig: ProjectConfig, dingTalkConfig: DingTalkConfig, testConfig: TestConfig) {
    if (Object.entries(config).map(([key, value]) => value).includes('')) {
      printError(`请检查 ${underline('self.config.js')} 文件 serverConfig 部分是否填写正常？`)
      return
    }
    if (Object.entries(projectConfig).map(([key, value]) => value).includes('')) {
      printError(`请检查 ${underline('self.config.js')} 文件 projectConfig 部分是否填写正常？`)
      return
    }
    const failed: string[] = []
    const successful: string[] = []
    const { dist, remote, remoteWidthList = [], copyFilePath, isGetFiles, name, isInquirer, isDingTalk, version } = projectConfig
    const { subscribeString, subscribeArray } = dingTalkConfig
    if (!fs.existsSync(dist)) {
      printError(`请检查上传指定目录是否存在：${underline(dist)}`)
      return
    }
    if (isGetFiles) await this.handleCopyFilePath(copyFilePath, dist)
    
    const { alias } = await proxyInquirer.handlerConfirm(`${underline(name)}确认更新吗？`, isInquirer)
    if (alias) {
      ssh.connect(config).then(async () => {
        ssh.putDirectory(dist, remote, {
          recursive: true,
          concurrency: 10,
          validate: function (itemPath) {
            const baseName = path.basename(itemPath)
            if (!remoteWidthList.length) return true
            return !remoteWidthList.includes(baseName)
          },
          tick: function (localPath, remotePath, error) {
            if (error) {
              successLog(`${~~localPath}   文件上传失败`)
              failed.push(localPath)
            } else {
              successLog(`${remotePath}   文件上传成功`)
              successful.push(localPath)
            }
          }
        }).then(function (status) {
          if (status) {
            successLog(`${underline(name)} 执行成功, 已上传完毕`)
            if (isDingTalk) {
              const subscribeTxt = subscribeString || subscribeArray.length && subscribeArray || defaultNoticeTxt(projectConfig, testConfig)
              notice.serializationSubscribe(subscribeTxt, projectConfig, dingTalkConfig, testConfig)
            }
          } else {
            printError(`${underline(name)} 执行失败`)
          }
          ssh.dispose()
        })
      })
    }
  }
}
