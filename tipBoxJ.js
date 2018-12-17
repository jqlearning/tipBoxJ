/**
 * tipBoxJ.js
 * -    原生javascript弹框插件
 * Author: jq  
 * Date1:    2018-09-12
 * Date2:    2018-10-29 //增加了prompt 询问框
 * Date3:    2018-12-17 增加了自定义弹出层
 */
(function () {

    var tipBoxJ = {
        containerClass: 'tipBoxWrap active',
        bootBoxClass: 'tipBootBoxWrap active',
        loadClass: 'tipBoxLoad',
        box: null, // 用于增加的div
        boxDefault: {
            title: '提示信息',//标题
            time: '3000',//消失时间 (毫秒)
            icon: '0',//图标  0无图标 1 正确 2错误
            top: "0",//高   距顶部高度 
            left: "0",//宽  距左侧宽度
            btn1: "确定",
            btn2: "取消",
            area: ["300", "300"]//弹出层宽高
        },
        getBoxDefault: function () {
            var temp =
                '<div class="tipBox-shade"></div>' +
                '<div id="tipBoxbody" class="ui-tipBox tipBox-box fadeIn" style="z-index: 19891016;top:' + this.boxDefault.top + 'px;left:' + this.boxDefault.left + 'px">' +
                '<div id="tipBoxBlock" class="tipBox-box-content tipBox-box-padding">' +
                '<i class="tipBox-box-ico tipBox-box-ico' + this.boxDefault.icon + '"></i>' +
                '' + this.boxDefault.title + '</div>' +
                '</div>';
            return temp;
        },
        getBoxPrompt: function () {
            var temp =
                '<div class="tipBox-shade"></div>'
                + '<div id="tipBoxbody" class="tipBox-prompt tipBox-box fadeIn" style="z-index: 19891016;top:' + this.boxDefault.top + 'px;left:' + this.boxDefault.left + 'px">'
                + '<div class="tipBoxPrompt_title">' + this.boxDefault.title + '</div>'
                + '<div class="tipBoxPrompt_content">'
                + '<input class="tipBoxPrompt-input" type="text" name="">'
                + '</div>'
                + '<div class="tipBoxPrompt_btnBlock">'
                + '<a class="tipBoxPrompt-btn tipBoxPrompt-btn1 tipBoxPrompt-confirmBtn" href="javascript:;">' + this.boxDefault.btn1 + '</a><a class="tipBoxPrompt-btn tipBoxPrompt-cancel" href="javascript:;">' + this.boxDefault.btn2 + '</a>'
                + '</div></div>';
            return temp;
        },
        getBoxLoad: function () {
            var temp =
                '<div class="tipBox-load-shade">' +
                '<div id="tipBoxbody" class="ui-tipBox-load" style="z-index: 19891019;top:' + this.boxDefault.top + 'px;left:' + this.boxDefault.left + 'px">' +
                '<div  class="tipBox-load-ico"></div></div></div>';
            return temp;
        },
        getBootBox: function () {
            var temp = '<div class="tipBox-shade"></div>'
                + '<div id="tipBootBoxbody" class="tipBox-prompt tipBox-box fadeIn" style="z-index: 19891016;top:' + this.boxDefault.top + 'px;left:' + this.boxDefault.left + 'px">'
                + '<div class="tipBootBox" style="width:' + this.boxDefault.area[0] + 'px;height:' + this.boxDefault.area[1] + 'px;"><div class="tipBootBoxContent"></div>'
                + '<span class="tipBootBox_close"><a href="javascript:;"></a></span></div></div>';
            return temp;
        },
        msg: function (opt) {
            if (opt != undefined) {
                this.boxDefault.title = opt.title || "提示信息";
            } else {
                this.boxDefault.title = "提示信息";
            }
            this.boxDefault.icon = opt.icon || 0;

            this.boxDefault.time = opt.time || 3000;//移除时间
            var cHeight = document.documentElement.clientHeight;
            var halfHeight = (cHeight - 61) / 2;
            var cWidth = document.documentElement.clientWidth;
            var halfWidth = (cWidth - 181) / 2;
            this.boxDefault.top = opt.top || halfHeight;
            this.boxDefault.left = opt.left || halfWidth;
            var box = document.createElement("div");
            box.className = this.containerClass;
            box.innerHTML = this.getBoxDefault();
            var _this = this;
            this.box = box;
            this.callBack = opt.callBack;
            document.body.appendChild(this.box);
            if (this.boxDefault.icon == 0) {
                document.getElementById("tipBoxbody").style.minWidth = "100px";
                document.getElementById("tipBoxBlock").style.padding = "10px";
                document.getElementById("tipBoxBlock").style.textAlign = "center";
            }
            setTimeout(function () {
                _this.beforeRemoveBox(_this);//移除弹框
            }, this.boxDefault.time);
        },
        prompt: function (opt) {
            this.boxDefault.title = opt.title || "请输入标题";
            var cHeight = document.documentElement.clientHeight;
            var halfHeight = (cHeight - 61) / 2;
            var cWidth = document.documentElement.clientWidth;
            var halfWidth = (cWidth - 181) / 2;
            this.boxDefault.top = opt.top || halfHeight - 100;
            this.boxDefault.left = opt.left || halfWidth - 100;
            var box = document.createElement("div"),
                _this = this;
            box.className = this.containerClass;
            box.innerHTML = this.getBoxPrompt();
            this.box = box;
            document.body.appendChild(box);
            var promptInput = document.getElementsByClassName('tipBoxPrompt-input');
            promptInput = promptInput[promptInput.length - 1];
            promptInput.focus();
            var confirmBtn = document.getElementsByClassName('tipBoxPrompt-confirmBtn');
            var inputData = promptInput.value;;
            confirmBtn[confirmBtn.length - 1].onclick = function () {
                if (opt.onConfirm) {
                    opt.onConfirm(promptInput.value);
                }
                /* _this.removeBox();*/
            }
            var cancelBtn = document.getElementsByClassName('tipBoxPrompt-cancel');
            cancelBtn[cancelBtn.length - 1].onclick = function () {
                if (opt.onCancel) {
                    opt.onCancel(promptInput.value);
                }
                _this.removeBox();
            }
        },
        bootBox: function (opt) {
            this.boxDefault.area[0] = opt.area[0] || 300;
            this.boxDefault.area[1] = opt.area[1] || 300;
            var cHeight = document.documentElement.clientHeight;
            var halfHeight = (cHeight - this.boxDefault.area[1]) / 2;
            var cWidth = document.documentElement.clientWidth;
            var halfWidth = (cWidth - this.boxDefault.area[0]) / 2;
            this.boxDefault.top = opt.top || halfHeight;
            this.boxDefault.left = opt.left || halfWidth;

            var box = document.createElement("div"),
                _this = this;
            box.className = this.bootBoxClass;
            box.innerHTML = this.getBootBox();
            box.querySelector(".tipBootBoxContent").insertAdjacentHTML("beforeEnd", opt.content);
            this.box = box;
            document.body.appendChild(box);

            var closeBtn = document.getElementsByClassName('tipBootBox_close');
            closeBtn[0].onclick = function () {
                _this.removeBootBox();
            };
        },
        load: function (opt) {
            var cHeight = document.documentElement.clientHeight;
            var halfHeight = (cHeight - 61) / 2;
            var cWidth = document.documentElement.clientWidth;
            var halfWidth = (cWidth - 181) / 2;
            if (opt != undefined) {
                this.boxDefault.top = opt.top || halfHeight;
                this.boxDefault.left = opt.left || halfWidth;
            } else {
                this.boxDefault.top = halfHeight;
                this.boxDefault.left = halfWidth;
            }
            var box = document.createElement("div");
            box.className = this.containerClass;
            box.innerHTML = this.getBoxLoad();
            var _this = this;
            this.box = box;
            document.body.appendChild(this.box);
        },
        loadNew: function (opt) {
            var cHeight = document.documentElement.clientHeight;
            var halfHeight = (cHeight - 61) / 2;
            var cWidth = document.documentElement.clientWidth;
            var halfWidth = (cWidth - 181) / 2;
            if (opt != undefined) {
                this.boxDefault.top = opt.top || halfHeight;
                this.boxDefault.left = opt.left || halfWidth;
            } else {
                this.boxDefault.top = halfHeight;
                this.boxDefault.left = halfWidth;
            }
            var box = document.createElement("div");
            box.className = this.loadClass;
            box.innerHTML = this.getBoxLoad();
            var _this = this;
            this.box = box;
            document.body.appendChild(this.box);
        },
        callBack: function (data) {
            console.log(data);
        },
        beforeRemoveBox: function (_this) {
            var tipBoxbody = document.getElementById("tipBoxbody");
            jqClass.removeClass(tipBoxbody, "fadeIn");
            jqClass.addClass(tipBoxbody, "fadeOut");
            setTimeout(function () {
                if (typeof _this.callBack == "function") {
                    _this.callBack();
                }
                _this.removeBox();
            }, 500)
        },
        removeBox: function () {
            var tipBoxbody = document.getElementById("tipBoxbody");
            var box = document.getElementsByClassName(this.containerClass);
            document.body.removeChild(box[box.length - 1]);
        },
        removeBootBox: function () {
            var box = document.getElementsByClassName(this.bootBoxClass);
            document.body.removeChild(box[box.length - 1]);
        },
        close: function () {
            var box = document.getElementsByClassName(this.containerClass);
            if (box.length > 0) {
                document.body.removeChild(box[box.length - 1]);
            }
        },
        closeBootBox: function () {
            var box = document.getElementsByClassName(this.bootBoxClass);
            if (box.length > 0) {
                document.body.removeChild(box[box.length - 1]);
            }
        },
        closeNew: function () {
            var box = document.getElementsByClassName(this.loadClass);
            if (box.length > 0) {
                document.body.removeChild(box[box.length - 1]);
            }
        },
        closeFn: function (_callback) {
            tipBoxJ.close();
            _callback();
        }
    }
    //监听 浏览器宽高变化
    window.onresize = function () {
        changeDivHeight();
    }
    function changeDivHeight() {
        var cHeight = document.documentElement.clientHeight;
        var cWidth = document.documentElement.clientWidth;
        var tipBoxbody = document.getElementById("tipBoxbody");
        if (tipBoxbody != null) {
            var baseWidth = tipBoxbody.clientWidth || tipBoxbody.offsetWidth;
            var baseHeight = tipBoxbody.clientHeight || tipBoxbody.offsetHeight;
            tipBoxbody.style.top = (cHeight - baseHeight) / 2 + "px";
            tipBoxbody.style.left = (cWidth - baseWidth) / 2 + "px";
        }
    }
    this.tipBoxJ = tipBoxJ;
    changeDivHeight();
    var jqClass = {
        hasClass: function (obj, cls) {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        removeClass: function (obj, cls) {
            if (this.hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        },
        addClass: function (obj, cls) {
            if (!this.hasClass(obj, cls)) {
                obj.className += " " + cls;
            }
        }
    }
    this.JQClass = jqClass;
})();