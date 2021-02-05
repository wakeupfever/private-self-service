const watchFileChange = require('./gulp/compile')
const { i, r, d, s } = require('./dist/cjs/gulp/index')

exports.server = watchFileChange

exports.i = i
exports.r = r
exports.d = d
exports.s = s