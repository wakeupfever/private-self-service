import { ScriptC } from "../command/index"

const { handleCommand } = new ScriptC()

const init = () => {
  handleCommand('yarn gulp v --mode dev')
}

init()