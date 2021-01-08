import fs from 'fs'
import path from 'path'
import program from 'commander'

interface Register {
  description: string
  perform: Function
}

const setupDefaultCommands = (): void => {
  const { version } = require(`${ path.join(process.cwd()) }\/package.json`)
  program.version(version, '-v, --version', '输出当前版本号')
}

const registerCommands = async () => {
  const commandFiles: string = `${path.join(process.cwd())}/dist/cjs/core/lib/`
  const files: string[] = await fs.promises.readdir(commandFiles);
  files.forEach((name: string): void => {
    const { description, perform }: Register = require(`${commandFiles}/${name}`)
    const commandName: string = name.split('.')[0]
    const alias: string = name.charAt(0)
    program
      .command(commandName)
      .description(description)
      .alias(alias)
      .action(() => {
        perform
      })
  })
}

export const init = (_id, _args = {}, rawArgv = []) => {
  setupDefaultCommands()
  registerCommands()
  program.parse(rawArgv, { from: 'user' })
}