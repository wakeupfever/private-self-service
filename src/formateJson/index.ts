import Axios from "axios"

interface Options {
  target: string
  oldKey: string[]
  newKey: string[]
}

export class FormateJson {
  public json = []

  async init(url: string = 'https://wx.gdems.com/postemallstatic/json/cities.json', options: Options = { target: 'addressTreePCD', oldKey: ['childArea', 'areaName', 'areaCode'], newKey: ['children', 'label', 'value'] }): Promise<void> {
    if (!url) {
      throw 'url is not defined'
    }
    const { target, oldKey, newKey } = options
    await this._getJson(url)
    const alias: string = target.charAt(0).toUpperCase() + target.slice(1)
    this[`handle${alias}`](this.json, oldKey, newKey)
    // try {
    //   this[`handle${alias}`](this.json, oldKey, newKey)
    // } catch (error) {
    //   console.error(error)
    //   console.error('key is not defined')
    // }
  }

  async _getJson (url: string = ''): Promise<void> {
    const data: [] = await Axios.get(url)
    this.json = data
  }

  async handleAddressTreePCD(json: [], oldKey: string[], newKey: string[]) {
    // if (oldKey.length !== newKey.length) {
    //   printError('旧的key 不等于 新的key')
    //   process.exit(0)
    // }
    // let strJson: string = JSON.stringify(json)
    // console.log(JSON.stringify(json));
    let regExp = new RegExp(oldKey.join('|'), 'g')
    
    let regKey = oldKey.reduce((c, p, i) => {
      c[p] = newKey[i]
      return c
    }, {})

    console.log(regKey, 'regKey', regExp)
    // let result = strJson.replace(regExp, (matchStr) => {
    //   const regKey = oldKey
    //   return ''
    // })
  }
}