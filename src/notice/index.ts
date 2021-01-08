'use strict'
import axios from 'axios'
import { timeFormat } from '../core/util/formatDate'

export class GetNotice {
  /**
   * @deprecated 企业微信发送推送内容
   * @param {*} url 机器人推送地址
   * @param {*} opt 推送参数
   */
  sendNotice(url: string, opt): void {
    axios.post(url, opt).then(res => {
      console.log(res.data)
    }).catch(error => {
      console.log(error)
    })
  }
  /**
   * @description 重组版本信息和版本人信息 markdown 格式
   * @param {string[], { name: string, phone, string }} branchInfo
   * @param {*} publisher
   * @memberof GetNotice
   */
  serializationGitProject(branchInfo, publisher, name, tapdInfo, dingTalk) {
    if (Array.isArray(branchInfo)) {
      new TypeError('请检查branchInfo参数')
    }
    if (publisher) {
      new TypeError('请检查publisher参数')
    }
    const { development } = dingTalk
    const { robot } = development
    console.log(robot, 'robot')
    const { testers } = tapdInfo
    let mkt = `当前项目：${name}\n`
    mkt += `发布项目：${name}\n`
    mkt += `发布版本：${branchInfo.join(',')}\n`
    mkt += `发布时间：${timeFormat(new Date())}\n`
    mkt += `发布人员：${publisher.name}\n`
    const t = {
      msgtype: 'text',
      text: {
        content: mkt,
        mentioned_mobile_list: testers,
      }
    }
    this.sendNotice(robot, t)
  }
}

