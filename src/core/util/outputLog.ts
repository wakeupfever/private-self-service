import logSymbols from 'log-symbols'
import chalk from 'chalk'

/**
 * @description 成功信息
 * @param {*} message
 */
export const printSuccess = (message: any): void => {
  console.log(chalk.bgGreen.black(` DONE `), chalk.greenBright(message))
}

/**
 * @description 成功信息
 * @param {*} message
 */
export const successLog = (message: any): void => {
  console.log(chalk.greenBright(`√ ${message}`));
}

/**
 * @description 基本信息
 * @param {*} message
 */
export const printInfo = (message: any): void => {
  console.log(chalk.bgCyan.black(` INFO `), chalk.cyanBright(message));
}

/**
 * @description 基本信息
 * @param {*} message
 */
export const infoLog = (message: any): void => {
  console.log(chalk.cyanBright(`i ${message}`));
}

/**
 * @description 删除信息
 * @param {*} message
 */
export const printMagenta = (message: any): void => {
  console.log(chalk.bgMagenta.black(` DEL `), chalk.magentaBright(message));
}

/**
 * @description 警告信息
 * @param {*} message
 */
export const printWarning = (message: any): void => {
  console.log(chalk.bgYellow.black(` WARN `), chalk.yellowBright(message));
}

/**
 * @description 警告信息
 * @param {*} message
 */
export const warningLog = (message: any): void => {
  console.log(chalk.yellowBright(`i ${message}`));
}

/**
 * @description 错误信息
 * @param {*} message
 */
export const printError = (message: any): void => {
  console.log(logSymbols.error, chalk.redBright(message));
}

/**
 * @description 提示部分
 * @param {*} message
 */
export const underline = (message: any) => chalk.underline.magentaBright(`${message}`)