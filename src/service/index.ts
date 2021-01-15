import fs from 'fs'
import path from 'path'
import program from 'commander'
import { printError } from '../core/util/outputLog'

interface Register {
  description: string
  perform: Function
}

const setupDefaultCommands = (): void => {
  const { version } = require(`${ path.join(process.cwd()) }\/package.json`)
  program.version(version, '-v, --version', '输出当前版本号')
}

export const registerCommands = async () => {
  const commandFiles: string = path.resolve(__dirname, '../core/lib/')
  const files: string[] = await fs.promises.readdir(commandFiles)
  files.forEach((name: string): void => {
    const { commandConfig }: { commandConfig: Register } = require(`${commandFiles}/${name}`)
    const { description, perform } = commandConfig
    const commandName: string = name.split('.')[0]
    const alias: string = name.charAt(0)
    program
      .command(commandName)
      .description(description)
      .alias(alias)
      .option('-m, --mode <mode>', 'setup deploy mode')
      .action((options) => {
        if (!options.mode) {
          printError('请指定--mode 模式 例如：dev、test、prod等')
          return
        }
        perform(options.mode)
      })
  })
}

export const init = async (_id, _args = {}, rawArgv = []) => {
  setupDefaultCommands()
  await registerCommands()
  program.parse(rawArgv, { from: 'user' })
} 