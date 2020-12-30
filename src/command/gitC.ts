'use strict'
import { exec } from 'child_process'

export class GitC {
  /**
   * @description 获取当前项目git所有分支信息
   * @return {*}  {Promise<string[]>}
   * @memberof GitC
   */
  getBranchInfo(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      exec('git branch', (error, stdout) => {
        if (error) reject(new Error('获取分支信息异常'))
        const branch = stdout.split('\n').map(t => t.trim())
        resolve(branch)
      })
    })
  }

  /**
   * @description 获取当前git个人基本信息
   * @return {*}  {Promise<string>}
   * @memberof GitC
   */
  getGitPersonalInfo (): Promise<string> {
    return new Promise((resolve, reject) => {
      exec('git config user.name', (error, stdout) => {
        if (error) reject(new Error('获取分支信息异常'))
        const personal = stdout.split('\n').map(t => t.trim()).filter(t => t).join()
        resolve(personal)
      })
    })
  }

  /**
   * @description 获取当前项目git日志信息
   * @param {*} log
   * @return {*}  {Promise<string>}
   * @memberof GitC
   */
  getLogInfo(log): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(log, (error, stdout) => {
        if (error) reject(new Error('获取日志信息异常'))
        resolve(stdout)
      })
    })
  }
}
