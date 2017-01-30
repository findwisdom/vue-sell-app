/**
 * Created by wisdom king on 2017/1/26.
 */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let item = url.match(reg);
  console.log(url);
  if (item) {
    item.forEach((arr) => {
      let temparr = arr.substring(1).split('=');
      let key = decodeURIComponent(temparr[0]);
      let value = decodeURIComponent(temparr[1]);
      obj[key] = value;
    });
  }
  return obj;
}
