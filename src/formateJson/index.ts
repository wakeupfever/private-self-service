import Axios from "axios"

export class FormateJson {
  public json = []

  /**
   * @description 初始化传入的 json url 数据
   * @param {string} [url='']
   * @memberof FormateJson
   */
  public async init(url: string = 'https://wx.gdems.com/postemallstatic/json/cities.json') {
    if (!url) {
      throw 'url is not defined'
    }
    this._getJson(url)
  }

  private async _getJson (url: string = '') {
    const data = Axios.post(url)
    console.log(data)
  }
}