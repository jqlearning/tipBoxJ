/**
 * tipBoxJ.js
 * -    原生javascript弹框插件
 * Author: jq  
 * Date:    2018-09-12
 */
(function () {

    var tipBoxJ = {
        containerClass: 'tipBoxWrap active',
        box: null, // 用于增加的div
        boxDefault: {
            title: '提示信息',//标题
            time: '3000',//消失时间 (毫秒)
            icon: '0',//图标  0无图标 1 正确 2错误
            top: "0",//高   距顶部高度 
            left: "0",//宽  距左侧宽度
        },
        getBoxDefault: function () {
            var temp =
                '<div class="tipBox-shade"></div>' +
                '<div id="tipBoxbody" class="ui-tipBox tipBox-box fadeIn" style="z-index: 1000;top:' + this.boxDefault.top + 'px;left:' + this.boxDefault.left + 'px">' +
                '<div id="tipBoxBlock" class="tipBox-box-content tipBox-box-padding">' +
                '<i class="tipBox-box-ico tipBox-box-ico' + this.boxDefault.icon + '"></i>' +
                '' + this.boxDefault.title + '</div>' +
                '</div>';
            return temp;
        },
        getBoxLoad:function() {
          var temp=
                '<div class="tipBox-load-shade">'+
                '<div id="tipBoxbody" class="ui-tipBox-load" style="z-index: 1000;top:' + this.boxDefault.top + 'px;left:' + this.boxDefault.left + 'px">'+
                '<div  class="tipBox-load-ico"></div></div></div>';
            return temp;
        },
        msg: function (opt) {
            if (opt != undefined) {
                this.boxDefault.title = opt.title || this.boxDefault.title;
            } else {
                this.boxDefault.title = this.boxDefault.title;
            }
            this.boxDefault.icon = opt.icon || this.boxDefault.icon;
            this.boxDefault.time = opt.time || this.boxDefault.time;//移除时间
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
            if (this.boxDefault.icon==0) {
            document.getElementById("tipBoxbody").style.minWidth="100px";
            document.getElementById("tipBoxBlock").style.padding="10px";
            document.getElementById("tipBoxBlock").style.textAlign="center";
            }
            setTimeout(function () {
                _this.beforeRemoveBox(_this);//移除弹框
            }, this.boxDefault.time);
        },
        load:function (opt) {
            var cHeight = document.documentElement.clientHeight;
            var halfHeight = (cHeight - 61) / 2;
            var cWidth = document.documentElement.clientWidth;
            var halfWidth = (cWidth - 181) / 2;
            if (opt!=undefined) {
             this.boxDefault.top = opt.top || halfHeight;
             this.boxDefault.left = opt.left || halfWidth;
            }else{
                 this.boxDefault.top =halfHeight;
                 this.boxDefault.left =halfWidth;
            }
            var box = document.createElement("div");
            box.className = this.containerClass;
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
        close:function() {
            var box= document.getElementsByClassName(this.containerClass);
            if (box.length>0) {
                document.body.removeChild(box[box.length - 1]);
            }
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