'use strict'
import { exec } from 'child_process'

export class ScriptC {
  /**
   * @description Command 执行异常
   */
  handleCommand(scriptsSh: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(scriptsSh, (error, stdout) => {
        if (error) reject(new Error('Command 执行异常'))
        resolve(stdout)
      })
    })
  }
}
