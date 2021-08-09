import { UpdateServer } from './updateService'
import { GetNotice } from './notice'
import { GitC, ScriptC } from './command'
import { FormateJson } from './formateJson'
import FormateJsonVPlugin, { formateJson } from './plugin'

export { UpdateServer, GetNotice, GitC, ScriptC, formateJson, FormateJsonVPlugin }

const json = new FormateJson()

json.init()