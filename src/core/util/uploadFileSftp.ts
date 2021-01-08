import Client from 'ssh2-sftp-client'
import fs from 'fs'
import { printError, successLog } from './outputLog'

const client = new Client()

const copy = async (src, target, sftpClient) => {
  const state = await sftpClient.exists(target)
  if (!state) {
    await sftpClient.mkdir(target, true);
  }
  if (state == 'd') {
    await sftpClient.rmdir(target, true);
    await sftpClient.mkdir(target, true);
  }

  let data = fs.readdirSync(src)

  for (const item of data) {
    successLog(`${target}/${item}   上传成功`)
    let paths = `${src}/${item}`
    let targetPaths = `${target}/${item}`

    if (fs.statSync(paths).isDirectory()) {
      await copy(paths, targetPaths, sftpClient)
    } else {
      await sftpClient.fastPut(paths, targetPaths);
    }
  }
}

export const uploadFileSftp = async (config) => {
  const { path } = config
  try {
    await client.connect(config)
    for (const item of path) {
      if (item.type == 'dir') {
        await copy(item.from, item.to, client)
      } else {
        await client.fastPut(item.from, item.to);
      }
    }
    await client.end()
  } catch (error) {
    printError('上传失败，请检查当前环境')
  }
}