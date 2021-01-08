const watchFileChange = require('./gulp/compile')
// const { v1 } = require('./dist/cjs/src/gulp/index')
const { v1 } = require('./dist/cjs/gulp/index')

exports.server = watchFileChange
exports.v = v1