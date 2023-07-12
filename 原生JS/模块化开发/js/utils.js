// 添加事件
function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent("on" + type, function () {
      fn.call(el);
    });
  } else {
    el["on" + type] = fn;
  }
}

function elemChildren(node) {
  let temp = {
    length: 0,
    splice: Array.prototype.splice,
  };

  len = node.childNodes.length;

  for (let i = 0; i < len; i++) {
    let childItem = node.childNodes[i];
    if (childItem.nodeType === 1) {
      temp[temp.length] = childItem;
      temp["length"]++;
    }
  }
  return temp;
}

function elemParent(node, n) {
  let type = typeof n;
  if (type === "undefined") {
    return node.parentNode;
  } else if (n <= 0 || type !== "number") {
    return undefined;
  }

  while (n) {
    node = node.parentNode;
    n--;
  }

  return node;
}
