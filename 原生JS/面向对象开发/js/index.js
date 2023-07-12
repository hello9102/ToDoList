(function (node) {
  let ToDoList = function () {
    let _self = this;
    this.node = node;
    this.inputShow = false;
    this.isEdit = false;
    this.currentItem = null;

    this.dConfig = {
      plusBtn: "",
      inputWrap: "",
      addBtn: "",
      list: "",
      itemClass: "",
    };

    this.config = this.getConfig();
    this.itemClass = this.config.itemClass;

    for (let key in this.dConfig) {
      if (!this.config.hasOwnProperty(key)) {
        console.log(errorInfo(key));
        return;
      }
    }

    this.setConfig();

    addEvent(this.plusBtn, "click", function () {
      _self.showInput.call(_self);
    });

    addEvent(this.addBtn, "click", function () {
      _self.addBtnClick.call(_self);
    });

    addEvent(this.oList, "click", function (ev) {
      let e = ev || window.event,
        tar = e.target || e.srcElement;
      _self.oListClick.call(_self, tar);
    });
  };

  ToDoList.prototype = {
    getConfig: function () {
      return JSON.parse(this.node.getAttribute("data-config"));
    },

    setConfig: function () {
      let config = this.config,
        node = this.node;

      this.plusBtn = node.getElementsByClassName(config.plusBtn)[0];
      this.oList = node.getElementsByClassName(config.list)[0];
      this.inputWrap = node.getElementsByClassName(config.inputWrap)[0];
      this.addBtn = this.inputWrap.getElementsByClassName(config.addBtn)[0];
      this.content = this.inputWrap.getElementsByClassName("content")[0];
    },

    showInput() {
      let _self = this;
      if (this.inputShow) {
        setInputShow.call(_self, "close");
        restoreStatus.call(_self);
      } else {
        setInputShow.call(_self, "open");
      }
    },

    addBtnClick() {
      let _self = this,
        content = this.content.value,
        contentLen = content.length;

      if (contentLen <= 0) {
        return;
      }

      if (this.isEdit) {
        let oP = elemChildren(currentItem)[0];
        oP.innerText = this.content.value;
      } else {
        let oLi = document.createElement("li");
        oLi.className = this.itemClass;
        oLi.innerHTML = itemTpl(content);
        this.oList.appendChild(oLi);
      }
      setInputShow.call(_self, "close");
      restoreStatus.call(_self);
    },

    oListClick(tar) {
      let _self = this,
        className = tar.className;

      currentItem = elemParent(tar, 2);

      if (className === "edit-btn fa fa-edit") {
        let oItem = elemChildren(this.oList),
          oItemLen = oItem.length,
          oP = elemChildren(currentItem)[0],
          currentIndex = Array.prototype.indexOf.call(oItem, currentItem),
          item;

        if (oItemLen > 0) {
          for (let i = 0; i < oItemLen; i++) {
            item = oItem[i];
            item.className = "item";
          }

          currentItem.className += " active";
        }

        setInputShow.call(_self, "open");

        this.content.value = oP.innerText;
        this.addBtn.innerText = `编辑第${currentIndex + 1}项`;
        this.isEdit = true;
      } else if (className === "remove-btn fa fa-times") {
        currentItem.remove();
        restoreStatus.call(_self);
      }
    },
  };

  function itemTpl(text) {
    return `<p class='item-content'>${text}</p><div class="btn-group"><a href="javascript:;" class="edit-btn fa fa-edit"></a><a href="javascript:;" class="remove-btn fa fa-times"></a></div>`;
  }

  function setInputShow(action) {
    if (action === "open") {
      this.inputWrap.style.display = "block";
      this.oList.style.marginTop = "40px";
      this.inputShow = true;
    } else {
      this.inputWrap.style.display = "none";
      this.oList.style.marginTop = "0";
      this.inputShow = false;
    }
  }

  function restoreStatus() {
    this.content.value = "";
    this.addBtn.innerText = "增加项目";
    this.isEdit = false;
  }

  function errorInfo(key) {
    return new Error(
      "您没有配置参数" +
        key +
        "\n" +
        "必须配置的参数列表如下：\n" +
        "打开输入框按钮元素类名：plusBtn\n" +
        "输入框区域元素类名：inputWrap\n" +
        "增加项目按钮元素类名：addBtn\n" +
        "列表承载元素类名：1ist\n" +
        "列表项承载元素类名：itemClass"
    );
  }

  new ToDoList();
})(document.getElementsByClassName("wrap")[0]);
