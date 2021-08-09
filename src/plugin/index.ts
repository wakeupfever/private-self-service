import { FormateJson } from '../formateJson/index'

export const formateJson = new FormateJson()

export default {
  install: function (Vue) {
    Vue.mixin({
      methods: {
        ...formateJson
      },
    })
  }
}