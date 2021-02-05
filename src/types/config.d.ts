/**
 * @description 白名单列表
 * @type {string[]}
 */
export type RemoteWidthList = string[]

/**
 * @description 文件聚合列表
 * @type {string[]}
 */
export type CopyFilePath = string[]

/**
 * @description 测试配置信息
 * @type {string[]}
 */
export type TestConfigAttr = string[]

/**
 * @description 项目配置信息
 * @export
 * @interface ProjectConfig
 */
export interface ProjectConfig {
  name: string
  /**
   * @description 项目名称
   * @type {string}
   * @memberof ProjectConfig
   */
  /**
   * @description 项目版本
   * @type {string}
   * @memberof ProjectConfig
   */
  version: string
  /**
   * @description 项目输出目录
   * @type {''}
   * @memberof ProjectConfig
   */
  dist: '',
  /**
   * @description 远端目录
   * @type {string}
   * @memberof ProjectConfig
   */
  remote: string
  /**
   * @description 远端白名单列表
   * @type {RemoteWidthList}
   * @memberof ProjectConfig
   */
  remoteWidthList: RemoteWidthList
  /**
   * @description 远端聚合列表
   * @type {CopyFilePath}
   * @memberof ProjectConfig
   */
  copyFilePath: CopyFilePath
  /**
   * @description 是否聚合文件
   * @type {boolean}
   * @memberof ProjectConfig
   */
  isGetFiles: boolean
  /**
   * @description 是否覆盖文件
   * @type {boolean}
   * @memberof ProjectConfig
   */
  isCoverUpData: boolean
  /**
   * @description 是否每次发起询问
   * @type {boolean}
   * @memberof ProjectConfig
   */
  isInquirer: boolean
  /**
   * @description 是否发送默认订阅通知
   * @type {boolean}
   * @memberof ProjectConfig
   */
  isDingTalk: boolean
}

/**
 * @description 服务器配置信息
 * @export
 * @interface ServerConfig
 */
export interface ServerConfig {
  /**
   * @description ip
   * @type {string}
   * @memberof ServerConfig
   */
  host: string
  /**
   * @description 端口
   * @type {number}
   * @memberof ServerConfig
   */
  port: number
  /**
   * @description 用户
   * @type {string}
   * @memberof ServerConfig
   */
  username: string
  /**
   * @description 密码
   * @type {string}
   * @memberof ServerConfig
   */
  password: string
}

/**
 * @description 测试配置信息
 * @export
 * @interface TestConfig
 */
export interface TestConfig {
  [key: string]: TestConfigAttr
}


/**
 * @description 订阅配置
 * @export
 * @interface DingTalkConfig
 */
export interface DingTalkConfig {
  /**
   * @description bot地址
   * @type {string}
   * @memberof DingTalkConfig
   */
  robot: string

  /**
   * @description 订阅通知内容
   * @type {''}
   * @memberof DingTalkConfig
   */
  subscribeString: ''

  /**
   * @description 订阅通知内容
   * @type {string[]}
   * @memberof DingTalkConfig
   */
  subscribeArray: string[]
}

/**
 * @description 基础配置信息包含有项目信息、服务器信息、测试信息、订阅信息
 * @export
 * @interface BaseTemplate
 */
export interface BaseTemplate {
  projectConfig: ProjectConfig
  serverConfig: ServerConfig
  testConfig: TestConfig
  dingTalkConfig: DingTalkConfig
}