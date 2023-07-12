function init() {
  initToDoList;
}

let initToDoList = (function () {
  let plusBtn = document.getElementsByClassName("j-plus-btn")[0],
    inputWrap = document.getElementsByClassName("input-wrap")[0],
    addItem = document.getElementsByClassName("j-add-item")[0],
    textInput = document.getElementById("textInput"),
    oList = document.getElementsByClassName("j-list")[0],
    listWrap = document.getElementsByClassName("list-wrap")[0],
    inputShow = false,
    isEdit = false,
    currentItem;

  addEvent(plusBtn, "click", function () {
    if (inputShow) {
      showInput("close");
      restoreStatus();
    } else {
      showInput("open");
    }
  });

  addEvent(addItem, "click", function () {
    let oItems = document.getElementsByClassName("item"),
      val = textInput.value,
      len = val.length,
      itemLen = oItems.length,
      item;
    if (len <= 0) {
      return;
    }

    for (let i = 0; i < itemLen; i++) {
      item = elemChildren(oItems[i])[0];
      let text = item.innerText;
      if (val === text) {
        alert("已存在此项目");
        return;
      }
    }

    if (isEdit) {
      let currentp = elemChildren(currentItem)[0];
      currentp.innerText = val;
    } else {
      let oLi = document.createElement("li");
      oLi.className = "item";
      oLi.innerHTML = itemTpl(val);
      oList.appendChild(oLi);
    }

    showInput("close");
    restoreStatus();
  });

  addEvent(oList, "click", function (ev) {
    let e = ev || window.event,
      tar = e.target || e.srcElement,
      className = tar.className;
    currentItem = elemParent(tar, 2);
    if (className === "edit-btn fa fa-edit") {
      let oItems = document.getElementsByClassName("item"),
        itemLen = oItems.length,
        item,
        currentIndex = Array.prototype.indexOf.call(oItems, currentItem);

      // 所有item的样式变成一样，给点击的item加点击样式
      for (let i = 0; i < itemLen; i++) {
        item = oItems[i];
        item.className = "item";
      }

      currentItem.className += " active";

      // 显示输入框，且赋值
      showInput("open");
      textInput.value = currentItem.innerText;
      addItem.innerText = `编辑第${currentIndex + 1}项`;

      isEdit = true;
    } else if (className === "remove-btn fa fa-times") {
      currentItem.remove();
      restoreStatus();
    }
  });

  // 是否显示输入框
  function showInput(action) {
    if (action === "close") {
      inputWrap.style.display = "none";
      listWrap.style.marginTop = "0";
      inputShow = false;
    } else if (action === "open") {
      inputWrap.style.display = "block";
      listWrap.style.marginTop = "40px";
      inputShow = true;
    }
  }

  // 重置项目
  function restoreStatus() {
    currentItem = null;
    isEdit = false;
    textInput.value = "";
    addItem.innerText = "增加项目";
  }

  function itemTpl(text) {
    return `<p class='item-content'>${text}</p><div class="btn-group"><a href="javascript:;" class="edit-btn fa fa-edit"></a><a href="javascript:;" class="remove-btn fa fa-times"></a></div>`;
  }
})();

init();
