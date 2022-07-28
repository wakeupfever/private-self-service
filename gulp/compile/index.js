const { watch } = require('gulp')
const fs = require('fs')
const { join } = require('path')
const { ScriptC } = require('../../dist/cjs/command')
const { printSuccess, printInfo, printError, printMagenta } = require('../../dist/cjs/core/util/outputLog')

function getJsonFiles(jsonPath) {
  let jsonFiles = [];
  function findJsonFile(path) {
    let files = fs.readdirSync(path);
    files.forEach(function (item, index) {
      let fPath = join(path, item);
      let stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
      if (stat.isFile() === true) {
        jsonFiles.push(fPath);
      }
    });
  }
  findJsonFile(jsonPath);
  return jsonFiles
}

function esModule(out) {
  out.handleCommand('yarn build:esm').then(r => {
    console.log('\n' + r)
    printSuccess('ts文件生成ES2015文件成功')
  }).catch(e => {
    printError('ts文件生成ES2015文件异常')
  })
}

function commonModule(out) {
  out.handleCommand('yarn build:cjs').then(r => {
    console.log('\n' + r)
    printSuccess('ts文件生成CommonJS文件成功')
  }).catch(e => {
    console.log(e)
    printError('ts文件生成CommonJS文件异常')
  })
}

function init(cb) {
  const out = new ScriptC()
  commonModule(out)
  cb()
}

module.exports = function watchFileChange() {
  const watcher = watch('src/**/*', init)
  watcher.on('ready', () => {
    const list = getJsonFiles('src')
    list.forEach(path => {
      printInfo(`发现文件  ${path}`)
    })
    init(() => { })
  })
  watcher.on('change', path => {
    printInfo(`变动文件  ${path}`)
  })
  watcher.on('add', path => {
    printInfo(`添加文件  ${path}`)
  })
  watcher.on('unlink', path => {
    printMagenta(`删除文件 ${path}`)
  })
}
