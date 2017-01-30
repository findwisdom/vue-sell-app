/**
 * Created by wisdom king on 2017/1/30.
 */
export function saveLocalstorage(id, key, value) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage._seller_ = JSON.stringify(seller);
};
export function loadLocalstorage(id, key, def) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    return def;
  }
  let sellerId = JSON.parse(seller)[id];
  if (!sellerId) {
    return def;
  }
  let ret = sellerId[key];
  return ret || def;
};
