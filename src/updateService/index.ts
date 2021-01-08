'use strict'

import gulp from 'gulp'
import NodeSSH from 'node-ssh'
import fs from 'fs'
import path from 'path'

import { uploadFileSftp } from '../core/util/uploadFileSftp'
import { With } from '../core/util/base'
import { InquirerAlias, ProxyInquirer } from '../core/util/proxyInquirer'
import { printError, successLog } from '../core/util/outputLog'

const ssh = new NodeSSH()

export interface ServerFilesAttr {
  /**
   * @description 地址
   * @type {string}
   * @memberof ServerFilesAttr
   */
  host: string

  /**
   * @description 端口
   * @type {number}
   * @memberof ServerFilesAttr
   */
  port: number

  /**
   * @description 用户名
   * @type {string}
   * @memberof ServerFilesAttr
   */
  username: string
  
  /**
   * @description 密码
   * @type {string}
   * @memberof ServerFilesAttr
   */
  password: string
}

export interface GitSetUpAttr {
  /**
   * @description 是否更新推送git
   * @type {boolean}
   * @memberof GitSetUpAttr
   */
  isUpdate: boolean

  /**
   * @description 开发分支名称
   * @type {string}
   * @memberof GitSetUpAttr
   */
  devBranchName: string

  /**
   * @description 当前分支名称
   * @type {string}
   * @memberof GitSetUpAttr
   */
  targetBranchName: string

  /**
   * @description 更新分支名称
   * @type {string}
   * @memberof GitSetUpAttr
   */
  updateBranchName: string

  /**
   * @description git 相关人员信息
   * @type {({
   *     [key: string]: {
   *       name: string
   *       phone: string | number
   *     }
   *   })}
   * @memberof GitSetUpAttr
   */
  devList: {
    [key: string]: {
      name: string
      phone: string | number
    }
  }
}

/**
 * @description 机器人信息
 * @export
 * @interface DingTalkAttr
 */
export interface DingTalkAttr {
  [key: string]: {
    robot: string
  }
}

/**
 * @description 服务器 配置信息
 * @export
 * @interface ServerFiles
 */
export interface ServerFiles {
  serverFiles: ServerFilesAttr
}

/**
 * @description git 配置西悉尼
 *
 * @export
 * @interface GitSetUp
 */
export interface GitSetUp {
  gitSetUp: GitSetUpAttr
}

/**
 * @description 机器人 相关信息
 * @export
 * @interface DingTalk
 */
export interface DingTalk {
  dingTalk: DingTalkAttr
}

export interface ProjectBaseAttr {
  /**
   * @description 别名 
   * @type {InquirerAlias}
   * @memberof ProjectBaseAttr
   */
  name: InquirerAlias
  /**
   * @description script 脚本执行命令
   * @type {string}
   * @memberof ProjectBaseAttr
   */
  scriptSh: string

  /**
   * @description 输出地址
   * @type {string}
   * @memberof ProjectBaseAttr
   */
  dist: string

  /**
   * @description 远端地址路径
   * @type {string}
   * @memberof ProjectBaseAttr
   */
  remote: string

  /**
   * @description 远端白名单
   * @type {string[]}
   * @memberof ProjectBaseAttr
   */
  remoteWidthList: string[]

  /**
   * @description 复制路径
   * @type {string[]}
   * @memberof ProjectBaseAttr
   */
  getCopyFile: string[]

  /**
   * @description 是否复制文件
   * @type {boolean}
   * @memberof ProjectBaseAttr
   */
  isGetFiles: boolean

  /**
   * @description 是否覆盖文件
   * @type {boolean}
   * @memberof ProjectBaseAttr
   */
  coverUpData: boolean
  /**
   * @description  是否启用询问更新
   * @type {boolean}
   * @memberof ProjectBaseAttr
   */
  isInquirer: boolean

  /**
   * @description 是否启用更新机器人推送
   * @type {boolean}
   * @memberof ProjectBaseAttr
   */
  isDingTalk: boolean
}

export interface ProjectBase {
  project: ProjectBaseAttr
}

export interface ProjectAttr {
  [key: string]: {
    project: ProjectBase
    serverFiles?: ServerFiles
    gitSetUp?: GitSetUp
    dingTalk?: DingTalk
  }
}

export class UpdateServer extends With(ProxyInquirer) {
  constructor () {
    super()
  }

  /**
   * @description 复制项目配置内列表，复制到指定文件夹，然后一次性上传到服务器
   * @param {string[]} getCopyFile
   * @param {string} dist
   * @return {*} 
   * @memberof UpdateServer
   */
  getCopyFile (getCopyFile: string[], dist: string) {
    if (!getCopyFile.length) return
    fs.mkdir(dist, { recursive: true }, (err) => {
      if (err) throw err
    })
    return gulp.src(getCopyFile, { base: '.' }).pipe(gulp.dest(dist))
  }

  /**
   * @description 覆盖式上传，上传完之后会覆盖远程文件内所有文件
   * @param {ServerFilesAttr} config
   * @param {ProjectBaseAttr} project
   * @memberof UpdateServer
   */
  async coverUploadFile(config: ServerFilesAttr, project: ProjectBaseAttr) {
    const { dist, remote, isGetFiles, getCopyFile, name, isInquirer } = project
    if (!fs.existsSync(dist)) {
      printError(`请检查输出目录是否正确：${dist}`)
      return
    }
    if (isGetFiles) await this.getCopyFile(getCopyFile, dist)
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
    this.handlerConfirm(`${name}确认更新吗`, isInquirer).then(async ({ alias }: { alias: boolean }) => {
      if (alias) {
        uploadFileSftp(sshConfig)
      }
    })
  }

  /**
   * @description 非覆盖式上传，上传完成后，当前文件内的其他文件还会存在
   * @param {ServerFilesAttr} config
   * @param {ProjectBaseAttr} project
   * @memberof UpdateServer
   */
  async uploadFile(config: ServerFilesAttr, project: ProjectBaseAttr) {
    const failed: string[] = []
    const successful: string[] = []
    const { dist, remote, remoteWidthList = [], getCopyFile, isGetFiles, name, isInquirer } = project
    if (isGetFiles) await this.getCopyFile(getCopyFile, dist)
    this.handlerConfirm(`${name}确认更新吗？`, isInquirer).then(({ alias }: { alias: boolean }) => {
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
                successLog(`${localPath}   文件上传失败`)
                failed.push(localPath)
              } else {
                successLog(`${remotePath }   '文件上传成功'`)
                successful.push(localPath)
              }
            }
          }).then(function (status) {
            successLog(status ? '上传成功' : '上传失败')
            ssh.dispose()
          })
        })
      }
    })
  }
}
