const { ScriptC } = require('../dist/cjs/command/index')
const { handleCommand } = new ScriptC()

const init = async () => {
  const w = await handleCommand('yarn gulp v --mode dev')
  console.log(w)
}

init()