'use strict'
import { exec } from 'child_process'

export class ScriptC {
  /**
   * @description 执行编译输出命令
   */
  handleVueBuild(scriptsSh: string) {
    return new Promise((resolve, reject) => {
      exec(scriptsSh, (error, stdout) => {
        if (error) reject(new Error('项目编译异常'))
        resolve(stdout)
      })
    })
  }

  /**
   * @description 删除编译后残留文件
   */
  handleDelFiles(dist: string) {
    return new Promise((resolve, reject) => {
      exec(`rm -rf ${dist}`, (error, stdout) => {
        if (error) reject(new Error('项目删除异常'))
        resolve(stdout)
      })
    })
  }
}
