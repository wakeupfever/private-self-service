
/**
 * @description: 时间格式化工具
 * @name: formatDate
 * @param Date Date类型时间
 * @param String  年月日时分秒对应的字符 Year:yyyy | Month:MM | Date: dd | Hour:hh | Minute:mm | Second:ss
 * @demo formatDate(new Date(), 'yyyy/MM/dd hh:mm:ss')
 * @return String
 */
export const timeFormat = (time: string | Date | number, format = 'yyyy-MM-dd hh:mm:ss') => {
  time = new Date(time)
  let args = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': Math.floor((time.getMonth() + 3) / 3), // quarter
    'S': time.getMilliseconds()
  }
  if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (let i in args) {
    let n = args[i]
    if (new RegExp('(' + i + ')').test(format)) { format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length)) }
  }
  return format
}