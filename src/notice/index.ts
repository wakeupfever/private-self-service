'use strict'
import axios from 'axios'
import { DingTalkConfig, ProjectConfig, TestConfig } from '../types'
import { printError, successLog, underline } from '../core/util/outputLog'
import { timeFormat } from '../core/util/formatDate'

export const defaultNoticeTxt = (projectConfig: ProjectConfig, testConfig: TestConfig): string[] => {
  const { name, version } = projectConfig
  const { testers } = testConfig
  return [`发布项目：${name}`, version && `发布版本：${version}`, `发布时间：${timeFormat(new Date())}`, testers.length >0 ? `相关人员: ${testers.join(',')}` : ''].filter(t => t)
}

export class GetNotice {
  /**
   * @description 聚合推送内容
   * @param {(string | string[])} txt
   * @param {ProjectConfig} projectConfig
   * @param {DingTalkConfig} dingTalkConfig
   * @param {TestConfig} testConfig
   * @memberof GetNotice
   */
  public serializationSubscribe(txt: string | string[], projectConfig: ProjectConfig, dingTalkConfig: DingTalkConfig, testConfig: TestConfig) {
    const { robot } = dingTalkConfig
    const { testers } = testConfig
    if (!txt.length) {
      printError('请填写订阅推送内容')
      return
    }
    if (!robot) {
      printError('请填写webhook地址')
      return
    }
    let text = Array.isArray(txt) ? txt.join('\n') : txt
    console.log(text)
    this.sendNotice(robot, {
      msgtype: 'text',
      text: {
        content: text,
        mentioned_mobile_list: testers,
      }
    }, projectConfig)
  }

  /**
   * @description 企业微信发送推送内容
   * @param {*} url 机器人推送地址
   * @param {*} opt 推送参数
   */
  private sendNotice(url: string, opt, projectConfig: ProjectConfig) {
    const { name } = projectConfig
    axios.post(url, opt).then(res => {
      console.log(res.data)
      if (res.data.errcode === 0) {
        successLog(`${underline(name)} 订阅推送成功\n`)
      } else {
        printError(`${underline(name)} 订阅推送失败`)
      }
    }).catch(error => {
      console.log(error)
    })
  }
}

