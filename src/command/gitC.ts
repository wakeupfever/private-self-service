'use strict'
import { With } from '../core/lib/base'
import { ScriptC } from './scriptC'

export class GitC extends With(ScriptC) {
  /**
   * @description 获取当前项目git所有分支信息
   * @return {*}  {Promise<string[]>}
   * @memberof GitC
   */
  async getBranchInfo(): Promise<string[]> {
    const stdout = await this.handleCommand('git branch')
    const branch = stdout.split('\n').map(t => t.trim())
    return branch
  }

  /**
   * @description 获取当前git个人基本信息
   * @return {*}  {Promise<string>}
   * @memberof GitC
   */
  async getGitPersonalInfo (): Promise<string> {
    const stdout = await this.handleCommand('git config user.name')
    const personal = stdout.split('\n').map(t => t.trim()).filter(t => t).join()
    return personal
  }

  /**
   * @description 获取当前项目git日志信息
   * @param {*} log
   * @return {*}  {Promise<string>}
   * @memberof GitC
   */
  async getLogInfo(log): Promise<string> {
    const stdout = await this.handleCommand(log)
    return stdout
  }
}
