/**
 * Created by Administrator on 2017/1/15.
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth(),
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, padleftZero(str));
    }
  }
  return fmt;
};

function padleftZero(str) {
  return ('00' + str).substr(str.length);
}
