/***************************************************************************************************
 PopupWindow - The ultimate popup/dialog/modal jQuery plugin
 Author          : Gaspare Sganga
 Version         : 1.0.3
 License         : MIT
 Documentation   : http://gasparesganga.com/labs/jquery-popup-window/
 ***************************************************************************************************/
import {debounce} from "@/common/common/debounceAndThrottle";
window.topZIndex = 1;//顶层
window.topDialog = '';//顶层弹框
window.saveTabHoverImg = {};//保存缩小图片
window.stopSwitchZindexTimer = null;//使用延迟定时器
window.oldWidth = 0;
window.oldHeight = 0;
window.nowDialogId=null;//记录当前拖拽弹框
define([
  //"jquery",
  'html2canvas',
], function (html2canvas) {//jQuery,
  "use strict";
  var self = window;
  // Default Settings
  var _defaults = {
    dialogId: "demo",
    tabElementAll: '.pannelTop li button',
    tabElement: '.pannelTop li button',
    icon: '',//头部左侧的图标 html拼接
    isParent: true,//是否是父弹框
    parentDialog: '',//父弹框的menuid
    childDialog: '',//子弹框的menuid
    parentsElementId: "#menuPannel",
    firstDialog: false,
    trueConfigClose: false,//一个用来切换的状态值

    title: "Popup Window",
    modal: false,
    autoOpen: true,
    animationTime: 10,
    customClass: "",

    buttons: {
      close: false,
      maximize: false,
      collapse: false,
      minimize: false
    },
    buttonsPosition: "right",
    buttonsTexts: {
      close: "Close",
      maximize: "Maximize",
      unmaximize: "Restore",
      minimize: "Minimize",
      unminimize: "Show",
      collapse: "Collapse",
      uncollapse: "Expand"
    },
    draggable: true,
    dragOpacity: 0.6,

    resizable: true,
    resizeOpacity: 1,

    statusBar: true,

    top: "auto",
    left: "auto",

    height: 600,
    width: 1200,
    maxHeight: $(document).height() - 41,
    maxWidth: $(document).width(),
    minHeight: 100,
    minWidth: 100,
    collapsedWidth: undefined,
    keepInViewport: true,
    mouseMoveEvents: true
  };

  // Required CSS
  var _css = {
    container: {
      "box-sizing": "border-box",
      "position": "fixed",
      "top": "0",
      "bottom": "0",
      "right": "0",
      "left": "0",
      "display": "flex",
      "justify-content": "flex-start",
      "align-content": "flex-start",
      "pointer-events": "none",
      "z-index": window.topZIndex + 1
    },
    overlay: {
      "box-sizing": "border-box",
      //"position"          : "fixed",
      "top": "0",
      "left": "0",
      "width": "100%",
      "height": "100%"
    },
    minplaceholder: {
      "box-sizing": "border-box",
      "background": "transparent",
      "border": "none"
    },
    popupwindow: {
      "box-sizing": "border-box",
      "display": "flex",
      "flex-flow": "column nowrap",
      "position": "absolute",
      "padding": "0",
      "pointer-events": "auto"
    },
    titlebar: {
      "box-sizing": "border-box",
      "flex": "0 0 auto",
      "display": "flex",
      "align-items": "center"
    },
    titlebar_text: {
      "box-sizing": "border-box",
      "flex": "1 1 auto",
      "overflow": "hidden",
      "text-overflow": "ellipsis",
      "white-space": "nowrap"
    },
    titlebar_button: {
      "box-sizing": "border-box",
      "flex": "0 0 auto",
      "display": "flex"
    },
    content: {
      "flex": "1 1 auto",
      // "overflow"          : "auto"
    },
    statusbar: {
      "box-sizing": "border-box",
      "flex": "0 0 auto",
      "display": "flex",
      "align-items": "flex-end"
    },
    statusbar_content: {
      "box-sizing": "border-box",
      "flex": "1 1 auto",
      "overflow": "hidden",
      "text-align": "left",
      "text-overflow": "ellipsis",
      "white-space": "nowrap"
    },
    statusbar_handle: {
      "box-sizing": "border-box",
      "display": "flex"
    },
    statusbar_handle_resizable: {
      "cursor": "se-resize"
    },
    resizer_top: {
      "position": "absolute",
      "left": "0",
      "right": "0",
      "cursor": "n-resize"
    },
    resizer_bottom: {
      "position": "absolute",
      "left": "0",
      "right": "0",
      "cursor": "s-resize"
    },
    resizer_left: {
      "position": "absolute",
      "top": "0",
      "bottom": "0",
      "cursor": "e-resize"
    },
    resizer_right: {
      "position": "absolute",
      "top": "0",
      "right": "0",
      "bottom": "0",
      "cursor": "w-resize"
    },
    resizer_topleft: {
      "position": "absolute",
      "cursor": "nw-resize"
    },
    resizer_topright: {
      "position": "absolute",
      "cursor": "ne-resize"
    },
    resizer_bottomleft: {
      "position": "absolute",
      "cursor": "ne-resize"
    },
    resizer_bottomright: {
      "position": "absolute",
      "cursor": "nw-resize"
    },
    popupWindowShade: {
      "width": "100%",
      "height": "100%",
      "position": "absolute",
      "top": "0",
      "left": "0",
      "background": "rgba(204, 204, 204, 0.11)",
      "z-index": "999",
      "display": "none"
    }
  };

  // Icons
  // var _icons = {
  //   close           : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g><line y2="0" x2="10" y1="10" x1="0"/><line y2="10" x2="10" y1="0" x1="0"/></g></svg>',
  //   collapse        : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g fill="none"><polyline points="1,7 9,7 5,2 1,7 9,7"/></g></svg>',
  //   uncollapse      : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g fill="none"><polyline points="1,3 9,3 5,8 1,3 9,3"/></g></svg>',
  //   maximize        : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g fill="none"><rect x="1" y="1" height="8" width="8"/></g></svg>',
  //   unmaximize      : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g fill="none"><rect x="1" y="3" height="6" width="6"/><line y1="3" x1="3" y2="1" x2="3"/><line y1="1" x1="2.5" y2="1" x2="9.5"/><line y1="1" x1="9" y2="7" x2="9"/><line y1="7" x1="9.5" y2="7" x2="7"/></g></svg>',
  //   minimize        : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g><line y1="6" x1="8" y2="6" x2="2"/></g></svg>',
  //   resizeHandle    : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g><line y2="0" x2="10" y1="10" x1="0"/><line y2="2" x2="12" y1="12" x1="2"/><line y2="4" x2="14" y1="14" x1="4"/></g></svg>'
  // };
  var _icons = {
    close: '<i class="guanbi" style="height:100% ;width:100%"></i>',
    collapse: '<i class="el-icon-edit"></i>',
    uncollapse: '<i class="el-icon-share"></i>',
    maximize: '<i class="zuidahua" style="height:100%; width:100%"></i>',
    unmaximize: '<i class="quxiaozuidahua"></i>',
    minimize: '<i class="zuixiaohau" style="height:100%; width:100%"></i>',
    resizeHandle: ''
  };

  // Constants
  var _constants = {
    resizersWidth: 12,
    secondaryAnimationTimeFactor: 3
  };

  // Main Container
  var _mainContainer;
  //var menuPannel=".menuPannel";

  // Minimized Area
  var _minimizedArea = {
    position: "bottom left",
    direction: "horizontal"
  };


  // **************************************************
  //  METHODS
  // **************************************************
  jQuery.PopupWindowSetup = function (options) {
    jQuery.extend(true, _defaults, options);
  };

  jQuery.PopupWindowMinimizedArea = function (options) {
    if (options === undefined) return jQuery.extend({}, _minimizedArea);
    if (options.position) _minimizedArea.position = ((options.position.toLowerCase().indexOf("b") >= 0) ? "top" : "top") + " " + ((options.position.toLowerCase().indexOf("l") >= 0) ? "left" : "left");
    // if (options.position) _minimizedArea.position = ((options.position.toLowerCase().indexOf("b") >= 0) ? "bottom" : "top") + " " + ((options.position.toLowerCase().indexOf("l") >= 0) ? "left" : "right");
    if (options.direction) _minimizedArea.direction = (options.direction.toLowerCase().indexOf("h") >= 0) ? "horizontal" : "vertical";
    _SetMinimizedArea();
  };
  jQuery.fn.PopupWindow = function (opt1, opt2) {
    if (typeof opt1 == "string") {
      switch (opt1.toLowerCase()) {
        case "init":
          return this.each(function () {
            _Init(jQuery(this), opt2);
          });
        case "open":
          return this.each(function () {
            _Open(jQuery(this).closest(".popupwindow"));
          });
        case "close":
          return this.each(function () {
            _Close(jQuery(this).closest(".popupwindow"), true);
          });
        case "maximize":
          return this.each(function () {
            _Maximize(jQuery(this).closest(".popupwindow"));
          });
        case "unmaximize":
          return this.each(function () {
            _Unmaximize(jQuery(this).closest(".popupwindow"));
          });
        case "collapse":
          return this.each(function () {
            _Collapse(jQuery(this).closest(".popupwindow"));
          });
        case "uncollapse":
          return this.each(function () {
            _Uncollapse(jQuery(this).closest(".popupwindow"));
          });
        case "minimize":
          return this.each(function () {
            _Minimize(jQuery(this).closest(".popupwindow"));
          });
        case "unminimize":
          return this.each(function () {
            _Unminimize(jQuery(this).closest(".popupwindow"));
          });
        case "getposition":
          if (!this[0]) return undefined;
          return _GetCurrentPosition(jQuery(this[0]).closest(".popupwindow"));
        case "setposition":
          return this.each(function () {
            _ChangePosition(jQuery(this).closest(".popupwindow"), jQuery.extend({}, opt2, {
              check: true,
              event: true
            }), true);
          });
        case "getsize":
          if (!this[0]) return undefined;
          return _GetCurrentSize(jQuery(this[0]).closest(".popupwindow"));
        case "setsize":
          return this.each(function () {
            _ChangeSize(jQuery(this).closest(".popupwindow"), jQuery.extend({}, opt2, {
              checkSize: true,
              checkPosition: true,
              event: true
            }), true);
          });
        case "getstate":
          if (!this[0]) return undefined;
          return _GetState(jQuery(this[0]).closest(".popupwindow"));
        case "setstate":
          return this.each(function () {
            _SetState(jQuery(this).closest(".popupwindow"), opt2);
          });
        case "settitle":
          return this.each(function () {
            _SetTitle(jQuery(this).closest(".popupwindow"), opt2);
          });
        case "statusbar":
          return this.each(function () {
            _StatusBar(jQuery(this).closest(".popupwindow"), opt2);
          });
        case "destroy":
          return this.each(function () {
            _Destroy(jQuery(this).closest(".popupwindow"));
          });
        case "getconfig":
          return this.each(function () {
            _DialogConfig(jQuery(this).closest(".popupwindow"));
          });
        case "switchzindex"://内部切换层级关系 配合放大缩小 以及弹框本身的点击事件
          return this.each(function () {
            _switchZIndex(null, opt2);
          });
        case "outerwitchzindex":
          return this.each(function () {
            _outerSwitchzindex(jQuery(this).closest(".popupwindow"), opt2);
          });
        case "getcanvasimg":
          return this.each(function () {
            _GetCanvasToimg(jQuery(this).closest(".popupwindow"));
          });
        case "gettopzindex":
          return this.each(function () {
            _getOrEditZIndex(opt2);
          });

      }
    } else {
      return this.each(function () {
        _Init(jQuery(this), opt1);
      });
    }
  };
  // **************************************************
  //  FUNCTIONS
  // **************************************************
  //配合其他组件切换层级关系
  function _getOrEditZIndex(setValue) {
    localStorage.setItem("getTopZIdex", window.topZIndex);
    window.topZIndex = setValue || window.topZIndex;
  }

  //获取所有配置信息
  function _DialogConfig(popupWindow) {
    var getDialogData = {};
    getDialogData.collapsed = popupWindow.data().collapsed;
    getDialogData.currentPosition = popupWindow.data().currentPosition;
    getDialogData.currentSize = popupWindow.data().currentSize;
    getDialogData.maximized = popupWindow.data().maximized;
    getDialogData.opened = popupWindow.data().opened;
    getDialogData.settings = popupWindow.data().settings;
    getDialogData.minimized = popupWindow.data().minimized;
    localStorage.setItem("nowDialogInfo", self.JSON.stringify(getDialogData));
  }

  //悬浮tab 截取图片
  function _GetCanvasToimg(popupWindow, isSave) {
    let nowElement = popupWindow.data("settings").tabSaveImgDom;
    if (popupWindow.data("minimized")) {//最小时 直接创建图片
      _CreateCanvasImg(nowElement, window.saveTabHoverImg[popupWindow.data("settings").dialogId]);
    } else {//报存图片 创建图片
      let dom = popupWindow.get(0);
      const Canvas = document.createElement('canvas');
      const width = popupWindow.outerWidth();
      const height = popupWindow.outerHeight();
      //放大倍数 使得图片更加清晰
      const scale = 1;
      Canvas.width = width * scale;
      Canvas.height = height * scale;
      Canvas.getContext('2d').scale(scale, scale);
      //将dom转化为Canvas
      html2canvas(dom, {
        crossOrigin: 'Anonymous',
        canvas: Canvas,
        scale,
        async: true,
        taintTest: true,
        useCORS: true,            //允许图片跨域（其实没用，还是报错 最后使用的代理）
        allowTaint: true,    //允许画布污染（如果图片跨域，后面会导致画布被污染无法重绘）
        width: width + 'px',
        hegiht: height + 'px',
        logging: false,

      }).then((canvas) => {
        const context = canvas.getContext('2d');
        // 关闭抗锯齿形
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        // canvas转化为图片
        const retCanvas = document.createElement('canvas');
        const retCtx = retCanvas.getContext('2d');
        retCanvas.width = canvas.width;
        retCanvas.height = canvas.height;
        retCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        if (isSave) {// 存储图片路径
          window.saveTabHoverImg[popupWindow.data("settings").dialogId] = retCanvas.toDataURL('image/jpeg');
        } else {//创建图片
          window.saveTabHoverImg[popupWindow.data("settings").dialogId] = retCanvas.toDataURL('image/jpeg');
          _CreateCanvasImg(nowElement, retCanvas.toDataURL('image/jpeg'));
        }
        $(retCanvas).remove();
        $(Canvas).remove();

      });
    }
  }

  function _CreateCanvasImg(nowElement, imgSrc) {
    if ($(".tabHoverImg").length > 0) {
      $(".tabHoverImg").attr("src", imgSrc);
    } else {
      const img = document.createElement('img');
      img.crossOrigin = 'anonymous';
      img.src = imgSrc;
      img.className = "tabHoverImg";
      $(nowElement).append(img);
    }

  }





  function _Init(originalTarget, options) {
    clearTimeout(window.stopSwitchZindexTimer);
    var dealZindex = window.topZIndex + 1;
    window.topZIndex = dealZindex;
    if (options.firstDialog) {
      _mainContainer = jQuery("<div id='" + options.dialogId + "' menuid='" + options.dialogId + "' class='popupwindow_container'>")
        .css(_css.container)
        .appendTo(options.parentsElementId);
      _mainContainer.css({"zIndex": dealZindex});
    } else {
      if (options.isParent) {//是否是父弹框
        _mainContainer = jQuery("<div id='" + options.dialogId + '_dialog' + "' menuid='" + options.dialogId + "' class='popupwindow_container firstClick parentDialog'>")
          .css(_css.container)
          .appendTo(options.parentsElementId);
        _mainContainer.css({"zIndex": dealZindex});
      } else {
        _mainContainer = jQuery("<div id='" + options.dialogId + '_dialog' + "' menuid='" + options.dialogId + "' class='popupwindow_container firstClick childDialog'>")
          .css(_css.container)
          .appendTo(options.parentsElementId);
      }
    }

    _SetMinimizedArea();
    if (originalTarget.closest(".popupwindow").length) {
      _Warning("jQuery PopupWindow is already initialized on this element");
      return;
    }
    var settings = jQuery.extend(true, {}, _defaults, options);
    settings.animationTime = parseInt(settings.animationTime, 10);
    settings.height = parseInt(settings.height, 10);
    settings.width = parseInt(settings.width, 10);
    settings.maxHeight = parseInt(settings.maxHeight, 10) || 0;
    settings.maxWidth = parseInt(settings.maxWidth, 10) || 0;
    settings.minHeight = parseInt(settings.minHeight, 10) || 0;
    settings.minWidth = parseInt(settings.minWidth, 10) || 0;

    // Overlay
    var overlay = jQuery("<div>", {
      class: "popupwindow_overlay"
    })
      .css(_css.overlay)
      .appendTo(_mainContainer);
    if (settings.modal) overlay.css("pointer-events", "auto");

    // Minimized Placeholder
    var minPlaceholder = jQuery("<div>", {
      class: "popupwindow_minplaceholder"
    })
      .css(_css.minplaceholder)
      .hide()
      .appendTo(_mainContainer);

    // Popup Window
    var position = {
      left: (settings.left == "auto") ? ((overlay.width() - settings.width) / 2) : parseInt(settings.left, 10),
      top: (settings.top == "auto") ? ((overlay.height() - settings.height) / 2) : parseInt(settings.top, 10)
    };
    //处理弹框高度
    if (settings.height > ($(window).height() - 40) * 0.8) {
      settings.height = ($(window).height() - 40) * 0.8;
      if (settings.height < settings.minHeight) {
        settings.height = settings.minHeight;
      }
      position.top = ($(window).height() - 40) > settings.height ? ((($(window).height() - 40) - settings.height) / 2) + 40 : 40;
    }
    //弹框初始化为屏幕的0.7宽度
    if (settings.width > $(window).width() * 0.7) {
      settings.width = $(window).width() * 0.7;
      if (settings.width < settings.minWidth) {
        settings.width = settings.minWidth;
      }
      position.left = $(window).width() - settings.width < 0 ? $(window).width() - settings.width : ($(window).width() - settings.width) / 2;
    }

    var popupWindow = jQuery("<div>", {
      class: "popupwindow",
      css: {
        height: settings.height,
        left: position.left,
        top: position.top,
        width: settings.width
      }
    })
      .css(_css.popupwindow)
      .addClass(settings.customClass)
      .data({
        originalTarget: originalTarget,
        originalParent: originalTarget.parent(),
        overlay: overlay,
        minPlaceholder: minPlaceholder,
        settings: settings,
        opened: false,
        collapsed: false,
        minimized: false,
        maximized: false,
        currentPosition: position,
        currentSize: {
          height: settings.height,
          width: settings.width
        },
        savedPosition: undefined,
        savedSize: undefined,
        trueConfigClose: false
      }).on("click", function (event) {
        clearTimeout(window.stopSwitchZindexTimer);
        window.stopSwitchZindexTimer = setTimeout(function () {
          _switchZIndex(event);
          clearTimeout(window.stopSwitchZindexTimer);
        }, 260);

      })
      .appendTo(overlay);

    if (settings.draggable) {
      if (settings.nativeDrag) {
        popupWindow
          .on("dragstart", _Native_Drag)
          .on("drag", _Native_Drag)
          .on("dragend", _Native_Drag)
          .on("mousedown", ".popupwindow_titlebar_draggable", _Native_Drag_Handle);
      } else {
        popupWindow
          .on("mousedown", ".popupwindow_titlebar_draggable", _Titlebar_MouseDown)
        /* .on("mouseover",".popupwindow_titlebar_draggable",function(){
             _Hide_Window_Dotted_Box(settings.dialogId);
          });*/
      }
    }
    //从这里开始创建虚线
    var popupWindowDottedBox = jQuery("<div>", {
      class: "popupwindow_dotted_box initHideDottedBox",
      css: {
        /* height  : settings.height,
         left    : position.left,
         top     : position.top,
         width   : settings.width,*/
        minWidth: settings.minWidth,
        minHeight: settings.minHeight
      }
    }).appendTo(overlay);
    var popupWindowDottedBoxHover = jQuery("<div>", {
      class: "popupwindow_dotted_box_hover",
    }).appendTo(popupWindowDottedBox);

    //我添加的遮盖层
    var popupWindowShade = jQuery("<div>", {
      class: "popupwindow_shade",
    })
      .css(_css.popupWindowShade)
      .appendTo(popupWindow);

    // Titlebar
    var leftToRight = (settings.buttonsPosition.toLowerCase().indexOf("l") < 0);
    var titlebar = jQuery("<div>", {
      class: "popupwindow_titlebar"
    })
      .css(_css.titlebar)
      .appendTo(popupWindow);
    if (settings.draggable) titlebar.addClass("popupwindow_titlebar_draggable");
    // icon
    if (settings.icon != "") {
      jQuery("<div>", {
        class: "popupwindow_titlebar_icon",
        html: settings.icon
      })
        .css("order", leftToRight ? 1 : 1)
        .appendTo(titlebar);
    }
    // Text
    jQuery("<div>", {
      class: "popupwindow_titlebar_text",
      text: settings.title
    })
      .css(_css.titlebar_text)
      .css("order", leftToRight ? 1 : 5)
      .appendTo(titlebar);

    // Buttons
    if (settings.buttons.close) {
      jQuery("<div>", {
        class: "popupwindow_titlebar_button popupwindow_titlebar_button_close"
      })
        .css(_css.titlebar_button)
        .css("order", leftToRight ? 5 : 1)
        .attr("title", settings.buttonsTexts.close)
        .on("click", _ButtonClose_Click)
        .append(_icons.close)
        .appendTo(titlebar);
    }
    if (settings.buttons.maximize) {
      jQuery("<div>", {
        class: "popupwindow_titlebar_button popupwindow_titlebar_button_maximize"
      })
        .css(_css.titlebar_button)
        .css("order", leftToRight ? 4 : 2)
        .attr("title", settings.buttonsTexts.maximize)
        .on("click", _ButtonMax_Click)
        .append(_icons.maximize)
        .appendTo(titlebar);
    }
    if (settings.buttons.collapse) {
      jQuery("<div>", {
        class: "popupwindow_titlebar_button popupwindow_titlebar_button_collapse"
      })
        .css(_css.titlebar_button)
        .css("order", leftToRight ? 3 : 3)
        .attr("title", settings.buttonsTexts.collapse)
        .on("click", _ButtonCollapse_Click)
        .append(_icons.collapse)
        .appendTo(titlebar);
    }
    if (settings.buttons.minimize) {
      jQuery("<div>", {
        class: "popupwindow_titlebar_button popupwindow_titlebar_button_minimize"
      })
        .css(_css.titlebar_button)
        .css("order", leftToRight ? 2 : 4)
        .attr("title", settings.buttonsTexts.minimize)
        .on("click", _ButtonMin_Click)
        .append(_icons.minimize)
        .appendTo(titlebar);
    }

    // Content
    var content = jQuery("<div>", {
      class: "popupwindow_content"
    })
      .css(_css.content)
      .appendTo(popupWindow);
    originalTarget.show().appendTo(content);

    // StatusBar
    if (settings.statusBar) {
      var statusBar = jQuery("<div>", {
        class: "popupwindow_statusbar"
      })
        .css(_css.statusbar)
        .appendTo(popupWindow);

      jQuery("<div>", {
        class: "popupwindow_statusbar_content"
      })
        .css(_css.statusbar_content)
        .appendTo(statusBar);

      var resizeHandle = jQuery("<div>", {
        class: "popupwindow_statusbar_handle"
      })
        .css(_css.statusbar_handle)
        .appendTo(statusBar);
      if (settings.resizable) {
        resizeHandle
          .css(_css.statusbar_handle_resizable)
          .append(_icons.resizeHandle)
          .on("mousedown", null, {
            dimension: "both",
            directionX: "right",
            directionY: "bottom"
          }, _Resizer_MouseDown);
      }
    }
    // Resizing
    if (settings.resizable) {
      var bordersWidth = _GetBordersWidth(popupWindow);
      // Top
      var top1 = jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_top",
        css: {
          top: 0 - bordersWidth.top - (_constants.resizersWidth / 2),
          height: bordersWidth.top + _constants.resizersWidth
        }
      })
        .css(_css.resizer_top)
        .appendTo(popupWindow);
      top1.get(0).addEventListener("mouseover",()=>{deal_Resizer_MouseDown(settings.dialogId);});
      var top2=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_top",
        css: {
          top: 0 - bordersWidth.top - (_constants.resizersWidth / 2),
          height: bordersWidth.top + _constants.resizersWidth
        }
      })
        .css(_css.resizer_top)
        .on("mousedown", null, {
          dimension: "height",
          directionY: "top"
        },function(event){_Resizer_MouseDown(event)})
        .appendTo(popupWindowDottedBox);
      top2.get(0).addEventListener("mouseout",()=>{deal_Resizer_Mouseout(settings.dialogId);});
      // Bottom
      var bottom1 = jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_bottom",
        css: {
          bottom: 0 - bordersWidth.bottom - (_constants.resizersWidth / 2),
          height: bordersWidth.bottom + _constants.resizersWidth
        }
      })
        .css(_css.resizer_bottom)
        .appendTo(popupWindow);
      bottom1.get(0).addEventListener("mouseover",()=>{deal_Resizer_MouseDown(settings.dialogId);});
      var bottom2=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_bottom",
        css: {
          bottom: 0 - bordersWidth.bottom - (_constants.resizersWidth / 2),
          height: bordersWidth.bottom + _constants.resizersWidth
        }
      })
        .css(_css.resizer_bottom)
        .on("mousedown", null, {
          dimension: "height",
          directionY: "bottom",
        },function(event){_Resizer_MouseDown(event)})
        .appendTo(popupWindowDottedBox);
      bottom2.get(0).addEventListener("mouseout",()=>{deal_Resizer_Mouseout(settings.dialogId);});
      // Left
      var left1=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_left",
        css: {
          left: 0 - bordersWidth.left - (_constants.resizersWidth / 2),
          width: bordersWidth.left + _constants.resizersWidth
        }
      })
        .css(_css.resizer_left)
        .appendTo(popupWindow);
      left1.get(0).addEventListener("mouseover",()=>{deal_Resizer_MouseDown(settings.dialogId);});
      var left2=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_left",
        css: {
          left: 0 - bordersWidth.left - (_constants.resizersWidth / 2),
          width: bordersWidth.left + _constants.resizersWidth
        }
      })
        .css(_css.resizer_left)
        .on("mousedown", null, {
          dimension: "width",
          directionX: "left"
        },function(event){_Resizer_MouseDown(event)})
        .appendTo(popupWindowDottedBox);
      left2.get(0).addEventListener("mouseout",()=>{deal_Resizer_Mouseout(settings.dialogId);});
      // Right
      var right1=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_right",
        css: {
          right: (0 - bordersWidth.right - (_constants.resizersWidth / 2)),
          width: bordersWidth.right + _constants.resizersWidth
        }
      })
        .css(_css.resizer_right)
        .appendTo(popupWindow);
      right1.get(0).addEventListener("mouseover",()=>{deal_Resizer_MouseDown(settings.dialogId);});
      var right2=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_right",
        css: {
          right: (0 - bordersWidth.right - (_constants.resizersWidth / 2)),
          width: bordersWidth.right + _constants.resizersWidth
        }
      })
        .css(_css.resizer_right)
        .on("mousedown", null, {
          dimension: "width",
          directionX: "right",
        },function(event){_Resizer_MouseDown(event)})
        .appendTo(popupWindowDottedBox);
      right2.get(0).addEventListener("mouseout",()=>{deal_Resizer_Mouseout(settings.dialogId);});
      // Top Left
      var topleft1=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_topleft",
        css: {
          top: 0 - bordersWidth.top - (_constants.resizersWidth / 2),
          left: 0 - bordersWidth.left - (_constants.resizersWidth / 2),
          width: bordersWidth.left + _constants.resizersWidth,
          height: bordersWidth.top + _constants.resizersWidth
        }
      })
        .css(_css.resizer_topleft)
        .appendTo(popupWindow);
      topleft1.get(0).addEventListener("mouseover",()=>{deal_Resizer_MouseDown(settings.dialogId);});
      var topleft2=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_topleft",
        css: {
          top: 0 - bordersWidth.top - (_constants.resizersWidth / 2),
          left: 0 - bordersWidth.left - (_constants.resizersWidth / 2),
          width: bordersWidth.left + _constants.resizersWidth,
          height: bordersWidth.top + _constants.resizersWidth
        }
      })
        .css(_css.resizer_topleft)
        .on("mousedown", null, {
          dimension: "both",
          directionX: "left",
          directionY: "top"
        },function(event){_Resizer_MouseDown(event)})
        .appendTo(popupWindowDottedBox);
      topleft2.get(0).addEventListener("mouseout",()=>{deal_Resizer_Mouseout(settings.dialogId);});
      // Top Right
      var topright1=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_topright",
        css: {
          top: 0 - bordersWidth.top - (_constants.resizersWidth / 2),
          right: 0 - bordersWidth.right - (_constants.resizersWidth / 2),
          width: bordersWidth.right + _constants.resizersWidth,
          height: bordersWidth.top + _constants.resizersWidth
        }
      })
        .css(_css.resizer_topright)
        .appendTo(popupWindow);
      topright1.get(0).addEventListener("mouseover",()=>{deal_Resizer_MouseDown(settings.dialogId);});
      var topright2=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_topright",
        css: {
          top: 0 - bordersWidth.top - (_constants.resizersWidth / 2),
          right: 0 - bordersWidth.right - (_constants.resizersWidth / 2),
          width: bordersWidth.right + _constants.resizersWidth,
          height: bordersWidth.top + _constants.resizersWidth
        }
      })
        .css(_css.resizer_topright)
        .on("mousedown", null, {
          dimension: "both",
          directionX: "right",
          directionY: "top"
        },function(event){_Resizer_MouseDown(event)})
        .appendTo(popupWindowDottedBox);
      topright2.get(0).addEventListener("mouseout",()=>{deal_Resizer_Mouseout(settings.dialogId);});
      // Bottom Left
      var bottomleft1=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_bottomleft",
        css: {
          bottom: 0 - bordersWidth.bottom - (_constants.resizersWidth / 2),
          left: 0 - bordersWidth.left - (_constants.resizersWidth / 2),
          width: bordersWidth.left + _constants.resizersWidth,
          height: bordersWidth.bottom + _constants.resizersWidth
        }
      })
        .css(_css.resizer_bottomleft)
        .appendTo(popupWindow);
      bottomleft1.get(0).addEventListener("mouseover",()=>{deal_Resizer_MouseDown(settings.dialogId);});
      var bottomleft2=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_bottomleft",
        css: {
          bottom: 0 - bordersWidth.bottom - (_constants.resizersWidth / 2),
          left: 0 - bordersWidth.left - (_constants.resizersWidth / 2),
          width: bordersWidth.left + _constants.resizersWidth,
          height: bordersWidth.bottom + _constants.resizersWidth
        }
      })
        .css(_css.resizer_bottomleft)
        .on("mousedown", null, {
          dimension: "both",
          directionX: "left",
          directionY: "bottom"
        },function(event){_Resizer_MouseDown(event)})
        .appendTo(popupWindowDottedBox);
      bottomleft2.get(0).addEventListener("mouseout",()=>{deal_Resizer_Mouseout(settings.dialogId);});
      // Bottom Right
      var bottomright1=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_bottomright",
        css: {
          bottom: 0 - bordersWidth.bottom - (_constants.resizersWidth / 2),
          right: 0 - bordersWidth.right - (_constants.resizersWidth / 2),
          width: bordersWidth.right + _constants.resizersWidth,
          height: bordersWidth.bottom + _constants.resizersWidth
        }
      })
        .css(_css.resizer_bottomright)
        .appendTo(popupWindow);
      bottomright1.get(0).addEventListener("mouseover",()=>{deal_Resizer_MouseDown(settings.dialogId);});
      var bottomright2=jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_bottomright",
        css: {
          bottom: 0 - bordersWidth.bottom - (_constants.resizersWidth / 2),
          right: 0 - bordersWidth.right - (_constants.resizersWidth / 2),
          width: bordersWidth.right + _constants.resizersWidth,
          height: bordersWidth.bottom + _constants.resizersWidth
        }
      })
        .css(_css.resizer_bottomright)
        .on("mousedown", null, {
          dimension: "both",
          directionX: "right",
          directionY: "bottom"
        },function(event){_Resizer_MouseDown(event)})
        .appendTo(popupWindowDottedBox);
      bottomright2.get(0).addEventListener("mouseout",()=>{deal_Resizer_Mouseout(settings.dialogId);});
    }

    // Final Settings
    if (!settings.modal) overlay.width(0).height(0);
    overlay.hide();
    if (settings.autoOpen) _Open(popupWindow);
  }

  function _copyInit(originalTarget, settings, getData, type) {
    if (type == 0) {//拖拽
      _mainContainer = jQuery("<div id='animateDialog'  class='popupwindow_container' >")
        .css(_css.container)
        .appendTo(jQuery("#app"));
    } else {//放大缩小
      _mainContainer = jQuery("<div id='minsizeDialog'  class='popupwindow_container' >")
        .css(_css.container)
        .appendTo(jQuery("#app"));
    }

    _SetMinimizedArea();
    if (originalTarget.closest(".popupwindow").length) {
      _Warning("jQuery PopupWindow is already initialized on this element");
      return;
    }
    var settings = settings;

    // Overlay
    var overlay = jQuery("<div>", {
      class: "popupwindow_overlay"
    })
      .css(_css.overlay)
      .appendTo(_mainContainer);
    if (settings.modal) overlay.css("pointer-events", "auto");

    // Minimized Placeholder
    var minPlaceholder = jQuery("<div>", {
      class: "popupwindow_minplaceholder"
    })
      .css(_css.minplaceholder)
      .hide()
      .appendTo(_mainContainer);

    // Popup Window
    var position = {
      left: (settings.left == "auto") ? ((overlay.width() - settings.width) / 2) : parseInt(settings.left, 10),
      top: (settings.top == "auto") ? ((overlay.height() - settings.height) / 2) : parseInt(settings.top, 10)
    };
    var popupWindow = jQuery("<div>", {
      class: "popupwindow",
      css: {
        height: settings.height,
        left: position.left,
        top: position.top,
        width: settings.width
      }
    })
      .css(_css.popupwindow)
      .addClass(settings.customClass)
      .data({
        originalTarget: originalTarget,
        originalParent: originalTarget.parent(),
        overlay: overlay,
        minPlaceholder: minPlaceholder,
        settings: settings,
        opened: false,
        collapsed: false,
        minimized: false,
        maximized: false,
        currentPosition: position,
        currentSize: {
          height: settings.height,
          width: settings.width
        },
        savedPosition: getData.savedPosition,
        savedSize: getData.savedSize
      })
      .appendTo(overlay);

    /* if (settings.draggable) {
       if (settings.nativeDrag) {
         popupWindow
           .on("dragstart", _Native_Drag)
           .on("drag",  _Native_Drag)
           .on("dragend",  _Native_Drag)
           .on("mousedown", ".popupwindow_titlebar_draggable",  _Native_Drag_Handle);
       } else {
         popupWindow
           .on("mousedown", ".popupwindow_titlebar_draggable", _Titlebar_MouseDown);
       }
     }*/

    //我添加的遮盖层
    var popupWindowShade = jQuery("<div>", {
      class: "popupwindow_shade",
    })
      .css(_css.popupWindowShade)
      .appendTo(popupWindow);

    // Titlebar
    var leftToRight = (settings.buttonsPosition.toLowerCase().indexOf("l") < 0);
    var titlebar = jQuery("<div>", {
      class: "popupwindow_titlebar"
    })
      .css(_css.titlebar)
      .appendTo(popupWindow);
    if (settings.draggable) titlebar.addClass("popupwindow_titlebar_draggable");
    // icon
    if (settings.icon != "") {
      jQuery("<div>", {
        class: "popupwindow_titlebar_icon",
        html: settings.icon
      })
        .css("order", leftToRight ? 1 : 1)
        .appendTo(titlebar);
    }
    // Text
    jQuery("<div>", {
      class: "popupwindow_titlebar_text",
      text: settings.title
    })
      .css(_css.titlebar_text)
      .css("order", leftToRight ? 1 : 5)
      .appendTo(titlebar);

    // Buttons
    if (settings.buttons.close) {
      jQuery("<div>", {
        class: "popupwindow_titlebar_button popupwindow_titlebar_button_close"
      })
        .css(_css.titlebar_button)
        .css("order", leftToRight ? 5 : 1)
        .attr("title", settings.buttonsTexts.close)
        .on("click", _ButtonClose_Click)
        .append(_icons.close)
        .appendTo(titlebar);
    }
    if (settings.buttons.maximize) {
      jQuery("<div>", {
        class: "popupwindow_titlebar_button popupwindow_titlebar_button_maximize"
      })
        .css(_css.titlebar_button)
        .css("order", leftToRight ? 4 : 2)
        .attr("title", settings.buttonsTexts.maximize)
        .on("click", _ButtonMax_Click)
        .append(_icons.maximize)
        .appendTo(titlebar);
    }
    if (settings.buttons.collapse) {
      jQuery("<div>", {
        class: "popupwindow_titlebar_button popupwindow_titlebar_button_collapse"
      })
        .css(_css.titlebar_button)
        .css("order", leftToRight ? 3 : 3)
        .attr("title", settings.buttonsTexts.collapse)
        .on("click", _ButtonCollapse_Click)
        .append(_icons.collapse)
        .appendTo(titlebar);
    }
    if (settings.buttons.minimize) {
      jQuery("<div>", {
        class: "popupwindow_titlebar_button popupwindow_titlebar_button_minimize"
      })
        .css(_css.titlebar_button)
        .css("order", leftToRight ? 2 : 4)
        .attr("title", settings.buttonsTexts.minimize)
        .on("click", _ButtonMin_Click)
        .append(_icons.minimize)
        .appendTo(titlebar);
    }

    // Content
    var content = jQuery("<div>", {
      class: "popupwindow_content"
    })
      .css(_css.content)
      .appendTo(popupWindow);
    originalTarget.show().appendTo(content);

    // StatusBar
    if (settings.statusBar) {
      var statusBar = jQuery("<div>", {
        class: "popupwindow_statusbar"
      })
        .css(_css.statusbar)
        .appendTo(popupWindow);

      jQuery("<div>", {
        class: "popupwindow_statusbar_content"
      })
        .css(_css.statusbar_content)
        .appendTo(statusBar);

      var resizeHandle = jQuery("<div>", {
        class: "popupwindow_statusbar_handle"
      })
        .css(_css.statusbar_handle)
        .appendTo(statusBar);
      if (settings.resizable) {
        resizeHandle
          .css(_css.statusbar_handle_resizable)
          .append(_icons.resizeHandle)
          .on("mousedown", null, {
            dimension: "both",
            directionX: "right",
            directionY: "bottom"
          }, _Resizer_MouseDown);
      }
    }
    // Resizing
    if (settings.resizable) {
      var bordersWidth = _GetBordersWidth(popupWindow);
      // Top
      jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_top",
        css: {
          top: 0 - bordersWidth.top - (_constants.resizersWidth / 2),
          height: bordersWidth.top + _constants.resizersWidth
        }
      })
        .css(_css.resizer_top)
        .on("mousedown", null, {
          dimension: "height",
          directionY: "top"
        }, _Resizer_MouseDown)
        .appendTo(popupWindow);
      // Bottom
      jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_bottom",
        css: {
          bottom: 0 - bordersWidth.bottom - (_constants.resizersWidth / 2),
          height: bordersWidth.bottom + _constants.resizersWidth
        }
      })
        .css(_css.resizer_bottom)
        .on("mousedown", null, {
          dimension: "height",
          directionY: "bottom",
        }, _Resizer_MouseDown)
        .appendTo(popupWindow);
      // Left
      jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_left",
        css: {
          left: 0 - bordersWidth.left - (_constants.resizersWidth / 2),
          width: bordersWidth.left + _constants.resizersWidth
        }
      })
        .css(_css.resizer_left)
        .on("mousedown", null, {
          dimension: "width",
          directionX: "left"
        }, _Resizer_MouseDown)
        .appendTo(popupWindow);
      // Right
      jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_right",
        css: {
          right: 0 - bordersWidth.right - (_constants.resizersWidth / 2),
          width: bordersWidth.right + _constants.resizersWidth
        }
      })
        .css(_css.resizer_right)
        .on("mousedown", null, {
          dimension: "width",
          directionX: "right",
        }, _Resizer_MouseDown)
        .appendTo(popupWindow);
      // Top Left
      jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_topleft",
        css: {
          top: 0 - bordersWidth.top - (_constants.resizersWidth / 2),
          left: 0 - bordersWidth.left - (_constants.resizersWidth / 2),
          width: bordersWidth.left + _constants.resizersWidth,
          height: bordersWidth.top + _constants.resizersWidth
        }
      })
        .css(_css.resizer_topleft)
        .on("mousedown", null, {
          dimension: "both",
          directionX: "left",
          directionY: "top"
        }, _Resizer_MouseDown)
        .appendTo(popupWindow);
      // Top Right
      jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_topright",
        css: {
          top: 0 - bordersWidth.top - (_constants.resizersWidth / 2),
          right: 0 - bordersWidth.right - (_constants.resizersWidth / 2),
          width: bordersWidth.right + _constants.resizersWidth,
          height: bordersWidth.top + _constants.resizersWidth
        }
      })
        .css(_css.resizer_topright)
        .on("mousedown", null, {
          dimension: "both",
          directionX: "right",
          directionY: "top"
        }, _Resizer_MouseDown)
        .appendTo(popupWindow);
      // Bottom Left
      jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_bottomleft",
        css: {
          bottom: 0 - bordersWidth.bottom - (_constants.resizersWidth / 2),
          left: 0 - bordersWidth.left - (_constants.resizersWidth / 2),
          width: bordersWidth.left + _constants.resizersWidth,
          height: bordersWidth.bottom + _constants.resizersWidth
        }
      })
        .css(_css.resizer_bottomleft)
        .on("mousedown", null, {
          dimension: "both",
          directionX: "left",
          directionY: "bottom"
        }, _Resizer_MouseDown)
        .appendTo(popupWindow);
      // Bottom Right
      jQuery("<div>", {
        class: "popupwindow_resizer popupwindow_resizer_bottomright",
        css: {
          bottom: 0 - bordersWidth.bottom - (_constants.resizersWidth / 2),
          right: 0 - bordersWidth.right - (_constants.resizersWidth / 2),
          width: bordersWidth.right + _constants.resizersWidth,
          height: bordersWidth.bottom + _constants.resizersWidth
        }
      })
        .css(_css.resizer_bottomright)
        .on("mousedown", null, {
          dimension: "both",
          directionX: "right",
          directionY: "bottom"
        }, _Resizer_MouseDown)
        .appendTo(popupWindow);
    }

    // Final Settings
    if (!settings.modal) overlay.width(0).height(0);
    overlay.hide();
    if (settings.autoOpen) _Open(popupWindow);
  }

  function _Open(popupWindow) {
    clearTimeout(window.stopSwitchZindexTimer);
    if (!_CheckPopupWindow(popupWindow) || popupWindow.data("opened")) return;
    if (!popupWindow.data().settings.isParent) {//子弹框
      var oldParentDialogConfig = $("#" + popupWindow.data().settings.parentDialog + "_dialog").find(".popupwindow").data("settings");
      oldParentDialogConfig.childDialog = popupWindow.data("settings").dialogId;
      $("#" + popupWindow.data().settings.parentDialog + "_dialog").find(".popupwindow").data("settings", oldParentDialogConfig);
      $("#" + popupWindow.data().settings.parentDialog + "_dialog").find(".popupwindow_shade").show();
      popupWindow.parent().parent().css("zIndex", parseInt($("#" + popupWindow.data().settings.parentDialog + "_dialog").css("zIndex")));
    }
    popupWindow.show();//把东西放出来
    popupWindow.data("overlay").show();
    popupWindow.data("opened", true);
    _TriggerEvent(popupWindow, "open");
    _Uncollapse(popupWindow);
    _Unminimize(popupWindow);
  }

  function _Close(popupWindow, trueDelete) {
    popupWindow.removeClass("maskDialog");
    $(".popupwindow_dotted_box").addClass("initHideDottedBox");
    if (!_CheckPopupWindow(popupWindow) || !popupWindow.data("opened")) return;
    if (trueDelete != true) {
      if (popupWindow.data("settings").trueConfigClose == true) {//定义不关闭
        _TriggerEvent(popupWindow, "close");
        return false;
      }
    }
    if (popupWindow.data("minimized")) _Unminimize(popupWindow);
    if (!popupWindow.data().settings.isParent) {//子弹框
      $("#" + popupWindow.data().settings.parentDialog + "_dialog").find(".popupwindow_shade").hide();
      //关闭的时候将子弹框恢复默认值
      $("#" + popupWindow.data().settings.parentDialog + "_dialog").addClass("firstClick");
      var oldParentDialogConfig = $("#" + popupWindow.data().settings.parentDialog + "_dialog").find(".popupwindow").data("settings");
      oldParentDialogConfig.childDialog = '';
      $("#" + popupWindow.data().settings.parentDialog + "_dialog").find(".popupwindow").data("settings", oldParentDialogConfig);
    }
    popupWindow.data("overlay").hide();
    popupWindow.data("opened", false);
    _TriggerEvent(popupWindow, "close");
  }

  function _Maximize(popupWindow) {
    if (!_CheckPopupWindow(popupWindow) || !popupWindow.data("opened") || popupWindow.data("maximized") || popupWindow.data("collapsed") || popupWindow.data("minimized")) return;
    var settings = popupWindow.data("settings");
    _SaveCurrentPosition(popupWindow);
    _SaveCurrentSize(popupWindow);
    popupWindow.find(".popupwindow_titlebar_button_maximize")
      .empty()
      .append(_icons.unmaximize)
      .attr("title", settings.buttonsTexts.unmaximize);
    popupWindow.addClass("maxDialog");
    popupWindow.find(".popupwindow_statusbar_handle *, .popupwindow_resizer, .popupwindow_titlebar_button_collapse").hide();
    if (settings.draggable) popupWindow.find(".popupwindow_titlebar").removeClass("popupwindow_titlebar_draggable");
    if (!settings.modal) popupWindow.data("overlay").css("background-color", "transparent").width("100%").height("100%");


    var defPosition = _ChangePosition(popupWindow, {
      //top     : 0,
      top: 41,
      left: 0
    });
    var defSize = _ChangeSize(popupWindow, {
      width: "100%",
      //有点小问题
      //height  :maxHeight,
      height: "100%"
    });

    return jQuery.when(defPosition, defSize).then(function () {
      popupWindow.data("maximized", true);
      _TriggerEvent(popupWindow, "maximize");
    });
  }

  function _Unmaximize(popupWindow) {
    if (!_CheckPopupWindow(popupWindow) || !popupWindow.data("opened") || !popupWindow.data("maximized")) return;
    popupWindow.removeClass("maxDialog");
    var settings = popupWindow.data("settings");
    var defPosition = _RestoreSavedPosition(popupWindow);
    var defSize = _RestoreSavedSize(popupWindow);
    popupWindow.find(".popupwindow_titlebar_button_maximize")
      .empty()
      .append(_icons.maximize)
      .attr("title", settings.buttonsTexts.maximize);
    popupWindow.find(".popupwindow_statusbar_handle *, .popupwindow_resizer, .popupwindow_titlebar_button_collapse").show();
    if (settings.draggable) popupWindow.find(".popupwindow_titlebar").addClass("popupwindow_titlebar_draggable");
    if (!settings.modal) popupWindow.data("overlay").width(0).height(0).css("background-color", "");

    return jQuery.when(defPosition, defSize).then(function () {
      /* _SaveCurrentPosition(popupWindow);
       _SaveCurrentSize(popupWindow);*/
      popupWindow.data("maximized", false);
      _TriggerEvent(popupWindow, "unmaximize");
    });

  }

  function _Collapse(popupWindow) {
    if (!_CheckPopupWindow(popupWindow) || !popupWindow.data("opened") || popupWindow.data("maximized") || popupWindow.data("collapsed") || popupWindow.data("minimized")) return;
    var settings = popupWindow.data("settings");

    popupWindow.find(".popupwindow_titlebar_button_collapse")
      .empty()
      .append(_icons.uncollapse)
      .attr("title", settings.buttonsTexts.uncollapse);
    popupWindow.find(".popupwindow_content, .popupwindow_statusbar, .popupwindow_resizer, .popupwindow_titlebar_button_maximize, .popupwindow_titlebar_button_minimize").hide();

    _SaveCurrentSize(popupWindow);
    var defSize = _ChangeSize(popupWindow, {
      width: settings.collapsedWidth,
      height: _GetBordersWidth(popupWindow, "top") + _GetBordersWidth(popupWindow, "bottom") + popupWindow.find(".popupwindow_titlebar").outerHeight()
    });

    return jQuery.when(defSize).then(function () {
      popupWindow.data("collapsed", true);
      _TriggerEvent(popupWindow, "collapse");
    });
  }

  //全局变量
  let flag = true

  function _Uncollapse(popupWindow) {
    if (!_CheckPopupWindow(popupWindow) || !popupWindow.data("opened") || !popupWindow.data("collapsed")) return;
    var settings = popupWindow.data("settings");
    var defSize = _RestoreSavedSize(popupWindow);

    popupWindow.find(".popupwindow_titlebar_button_collapse")
      .empty()
      .append(_icons.collapse)
      .attr("title", settings.buttonsTexts.collapse);
    popupWindow.find(".popupwindow_content, .popupwindow_statusbar, .popupwindow_resizer, .popupwindow_titlebar_button_maximize, .popupwindow_titlebar_button_minimize").show();

    return jQuery.when(defSize).then(function () {
      popupWindow.data("collapsed", false);
      _TriggerEvent(popupWindow, "uncollapse");
    });
  }

  function _Minimize(popupWindow) {
    if (!_CheckPopupWindow(popupWindow) || !popupWindow.data("opened") || popupWindow.data("collapsed") || popupWindow.data("minimized")) return;
    popupWindow.parent().parent().addClass("hasMin");
    popupWindow.removeClass("maxDialog");
    // _GetCanvasToimg(popupWindow,true);//保存最小化之前的图片
    var defRet = jQuery.Deferred();
    var settings = popupWindow.data("settings");
    $(`.tab-button[menuid=${settings.dialogId}]`).parent().addClass('header-tabStyle1')
    $(`.tab-button[menuid=${settings.dialogId}]`).parent().removeClass('header-tabStyle')
    var defUnmaximize;
    var oldWidth = popupWindow.css("width");
    var oldHeight = popupWindow.css("height");
    //显示子弹框
    if (popupWindow.data("maximized")) {
    } else {
      _SaveCurrentPosition(popupWindow);
      _SaveCurrentSize(popupWindow);
    }
    if (popupWindow.data("settings").childDialog != "") {//有打开的子弹框
      $("#" + popupWindow.data("settings").childDialog + "_dialog").hide();
    } else {
    }
    if (popupWindow.data("maximized")) {
      defUnmaximize = jQuery.Deferred().resolve();
      jQuery.when(defUnmaximize).then(function () {
        settings.animationTime = settings.animationTime / _constants.secondaryAnimationTimeFactor;
        //defUnmaximize = _Unmaximize(popupWindow,true);
        var tabElementIndex = $(settings.tabElementAll).index($(settings.tabElement));
        var bilv = $(settings.tabElement).outerWidth() / parseFloat(oldWidth);
        var minimizedSize = {
          width: $(settings.tabElement).outerWidth(),
          height: parseFloat(oldHeight) * bilv
        };
        var allWidth = 120;
        $(settings.tabElementAll).each(function (index, element) {
          if (index == tabElementIndex) {
            return false;
          } else {
            allWidth = allWidth + $(element).outerWidth();
          }
        });
        var newPosition = {//设置我定义的位置信息
          left: allWidth,
          top: 41,
        };
        //popupWindow.find(".popupwindow_content").css("opacity",0);
        flag =true;
        if (flag == true) {
          flag = false;
          //popupWindow.css("height",oldHeight);
          // popupWindow.css("width",oldWidth);
          _minimizeAnimate(popupWindow, settings, newPosition, minimizedSize);
          $("." + popupWindow.parent().parent().attr("id") + "_minsize").stop().animate({
            top: newPosition.top + 'px',//当前点击的位置
            left: newPosition.left + 'px',//当前点击
            opacity: 0,
            width: minimizedSize.width + 'px',
            height: minimizedSize.height + 'px'
          }, 200, () => {
            flag = true;
            $("." + popupWindow.parent().parent().attr("id") + "_minsize").hide();
            //popupWindow.insertAfter(popupWindow.data("overlay"));
            popupWindow.data("minimized", true);
            _TriggerEvent(popupWindow, "minimize");
            defRet.resolve();
          });
        }
      });
    } else {

      defUnmaximize = jQuery.Deferred().resolve();
      jQuery.when(defUnmaximize).then(function () {
        popupWindow.addClass("popupwindow_minimized").width("");
        popupWindow.find(".popupwindow_titlebar_button_minimize").attr("title", settings.buttonsTexts.unminimize);
        // popupWindow.find(".popupwindow_content, .popupwindow_statusbar, .popupwindow_resizer, .popupwindow_titlebar_button_maximize, .popupwindow_titlebar_button_collapse").hide();
        if (settings.draggable) popupWindow.find(".popupwindow_titlebar").removeClass("popupwindow_titlebar_draggable");
        var tabElementIndex = $(settings.tabElementAll).index($(settings.tabElement));
        var bilv = $(settings.tabElement).outerWidth() / parseFloat(oldWidth);
        var minimizedSize = {
          width: $(settings.tabElement).outerWidth(),
          height: parseFloat(oldHeight) * bilv
        };

        var allWidth = 120;
        $(settings.tabElementAll).each(function (index, element) {
          if (index == tabElementIndex) {
            return false;
          } else {
            allWidth = allWidth + $(element).outerWidth();
          }
        });
        var newPosition = {//设置我定义的位置信息
          left: allWidth,
          top: 41,
        };
        flag =true;
        if (flag == true) {
          flag = false
          popupWindow.css("height", oldHeight);
          popupWindow.css("width", oldWidth);
          _minimizeAnimate(popupWindow, settings, newPosition, minimizedSize);
          $("." + popupWindow.parent().parent().attr("id") + "_minsize").stop().animate({
            top: newPosition.top + 'px',//当前点击的位置
            left: newPosition.left + 'px',//当前点击
            opacity: 0,
            width: minimizedSize.width + 'px',
            height: minimizedSize.height + 'px'
          }, 200, () => {
            flag = true
            $("." + popupWindow.parent().parent().attr("id") + "_minsize").hide();
            //popupWindow.insertAfter(popupWindow.data("overlay"));
            popupWindow.data("minimized", true);
            _TriggerEvent(popupWindow, "minimize");
            defRet.resolve();
          });

        }
      });
    }

    return defRet.promise();
  }

  //缩小动画
  function _minimizeAnimate(popupWindow, settings, newPosition, minimizedSize) {
    if ($("." + popupWindow.parent().parent().attr("id") + "_minsize").length > 0) {
      if (popupWindow.data("maximized")) {
        if (popupWindow.data("savedPosition") == null || popupWindow.data("savedPosition") == undefined || popupWindow.data("savedSize") == null || popupWindow.data("savedSize") == undefined) {
          $("." + popupWindow.parent().parent().attr("id") + "_minsize").css({
            left: popupWindow.css("left"),
            top: popupWindow.css("top"),
            width: popupWindow.width() + 'px',
            height: popupWindow.height() + 'px',
            opacity: 0.5,
            position: 'fixed'
          });
        } else {
          var dealLeft = popupWindow.data("savedPosition").left;
          var dealTop = popupWindow.data("savedPosition").top;
          var dealWidth = popupWindow.data("savedSize").width;
          var dealHeight = popupWindow.data("savedSize").height;
          $("." + popupWindow.parent().parent().attr("id") + "_minsize").css({
            left: dealLeft + "px",
            top: dealTop + "px",
            width: dealWidth + "px",
            height: dealHeight + 'px',
            opacity: 0.3,
            position: 'fixed'
          });
        }
      } else {
        $("." + popupWindow.parent().parent().attr("id") + "_minsize").css({
          left: popupWindow.css("left"),
          top: popupWindow.css("top"),
          width: popupWindow.width() + 'px',
          height: popupWindow.height() + 'px',
          opacity: 0.3,
          position: 'fixed'
        });
      }
    } else {
      if (popupWindow.data("maximized")) {
        if (popupWindow.data("savedPosition") == null || popupWindow.data("savedPosition") == undefined || popupWindow.data("savedSize") == null || popupWindow.data("savedSize") == undefined) {
          $("<div class='minsizeDialog " + popupWindow.parent().parent().attr("id") + "_minsize" + "'></div>").css({
            left: popupWindow.css("left"),
            top: popupWindow.css("top"),
            width: popupWindow.width() + 'px',
            height: popupWindow.height() + 'px',
            opacity: 0.3,
            position: 'fixed'
          }).appendTo($("#menuPannel"));
        } else {
          var dealLeft = popupWindow.data("savedPosition").left;
          var dealTop = popupWindow.data("savedPosition").top;
          var dealWidth = popupWindow.data("savedSize").width;
          var dealHeight = popupWindow.data("savedSize").height;
          $("<div class='minsizeDialog " + popupWindow.parent().parent().attr("id") + "_minsize" + "'></div>").css({
            left: dealLeft + "px",
            top: dealTop + "px",
            width: dealWidth + 'px',
            height: dealHeight + 'px',
            opacity: 0.3,
            position: 'fixed'
          }).appendTo($("#menuPannel"));

        }
      } else {
        $("<div class='minsizeDialog " + popupWindow.parent().parent().attr("id") + "_minsize" + "'></div>").css({
          left: popupWindow.css("left"),
          top: popupWindow.css("top"),
          width: popupWindow.width() + 'px',
          height: popupWindow.height() + 'px',
          opacity: 0.3,
          position: 'fixed'
        }).appendTo($("#menuPannel"));
      }
    }

    /* popupWindow.attr("mincss",
       encodeURIComponent(JSON.stringify({
         top: newPosition.top+'px',//当前点击的位置
         left: newPosition.left+'px',//当前点击
         opacity: 0,
         width: minimizedSize.width+400+'px',
         height: minimizedSize.height+200+'px'
       }))
     );*/
    /* popupWindow.parent().parent().css({
       visibility:'hidden'
     });*/
    popupWindow.addClass("copyDialog");
    popupWindow.css({
      visibility: 'hidden'
    });
    $("." + popupWindow.parent().parent().attr("id") + "_minsize").show();

  }

  function _Unminimize(popupWindow) {
    if (!_CheckPopupWindow(popupWindow) || !popupWindow.data("opened") || !popupWindow.data("minimized")) return;
    var settings = popupWindow.data("settings");
    $(`.tab-button[menuid=${settings.dialogId}]`).parent().addClass('header-tabStyle');
    $(`.tab-button[menuid=${settings.dialogId}]`).parent().removeClass('header-tabStyle1');
    var minPlaceholder = popupWindow.data("minPlaceholder");
    popupWindow.removeClass("popupwindow_minimized");
    popupWindow.find(".popupwindow_titlebar_button_minimize").attr("title", settings.buttonsTexts.minimize);
    // popupWindow.find(".popupwindow_content, .popupwindow_statusbar, .popupwindow_resizer, .popupwindow_titlebar_button_maximize, .popupwindow_titlebar_button_collapse").show();
    if (settings.draggable) popupWindow.find(".popupwindow_titlebar").addClass("popupwindow_titlebar_draggable");
    var getSavedPosition = popupWindow.data("savedPosition");
    var getSavedSize = popupWindow.data("savedSize");
    //minPlaceholder.show().insertAfter(popupWindow.data("overlay"));//导致iframe 重新添加刷新页面
    var minimizedSize = {
      width: minPlaceholder.outerWidth(),
      height: minPlaceholder.outerHeight()
    };
    var minPlaceholderAnimation = {};
    // var newPosition = minPlaceholder.position();
    if (_minimizedArea.direction == "horizontal") {
      minPlaceholderAnimation.width = 0;
      minPlaceholder.width(minimizedSize.width);
    } else {
      minPlaceholderAnimation.height = 0;
      minPlaceholder.height(minimizedSize.height);
    }
    //popupWindow.appendTo(popupWindow.data("overlay"));//导致iframe 重新添加刷新页面

    if (popupWindow.data("maximized")) {
      flag = true;
      if (flag == true) {
        flag = false
        $("." + popupWindow.parent().parent().attr("id") + "_minsize").css({
          left: popupWindow.css("left"),
          top: popupWindow.css("top"),
          width: popupWindow.width() + 'px',
          height: popupWindow.height() + 'px',
          opacity: 0.5,
          position: 'fixed'
        });
        popupWindow.parent().parent().css({
          visibility: 'hidden'
        });
        $("." + popupWindow.parent().parent().attr("id") + "_minsize").show().stop().animate({
          top: '41px',
          left: 0,
          opacity: 0.1,
          width: "100%",
          height: "100%"
        }, 200, () => {
          /*popupWindow.parent().parent().css({
            visibility:'visible'
          });*/
          popupWindow.css({
            visibility: 'visible'
          });
          popupWindow.removeClass("copyDialog");
          $("." + popupWindow.parent().parent().attr("id") + "_minsize").hide();
          popupWindow.addClass("maxDialog");
          flag = true;
          //var defPosition = _RestoreSavedPosition(popupWindow);
          //var defSize     = _RestoreSavedSize(popupWindow);
          //popupWindow.find(".popupwindow_content").css("opacity",1);
          popupWindow.data("minimized", false);
          $("#"+settings.dialogId+"_dialog").removeClass("hasMin");
          //显示子弹框
          if (popupWindow.data("settings").childDialog != "") {//有打开的子弹框
            $("#" + popupWindow.data("settings").childDialog + "_dialog").show();
          } else {
          }
          _TriggerEvent(popupWindow, "unminimize");
        });

      }
    } else {
      flag = true;
      if (flag == true) {
        flag = false;
        if (getSavedSize.width == "100%") {
          var dealWidth1 = getSavedSize.width;
          var dealLeft1 = 0;
        } else {
          var dealWidth1 = getSavedSize.width + "px";
          var dealLeft1 = getSavedPosition.left + 'px';
        }
        if (getSavedSize.height == "100%") {
          var dealHeight1 = getSavedSize.height;
          var dealTop1 = 41 + "px";
        } else {
          var dealHeight1 = getSavedSize.height + "px";
          var dealTop1 = getSavedPosition.top + 'px';
        }
        $("." + popupWindow.parent().parent().attr("id") + "_minsize").show();
        popupWindow.parent().parent().css({visibility: 'hidden'});
        $("." + popupWindow.parent().parent().attr("id") + "_minsize").stop().animate({
          top: dealTop1,
          left: dealLeft1,
          opacity: 0.5,
          width: dealWidth1,
          height: dealHeight1
        }, 200, () => {
          flag = true
          /* popupWindow.parent().parent().css({
             visibility:'visible'
           });*/
          popupWindow.css({
            visibility: 'visible'
          });
          popupWindow.removeClass("copyDialog");
          $("#"+settings.dialogId+"_dialog").removeClass("hasMin");
          $("." + popupWindow.parent().parent().attr("id") + "_minsize").hide();
          //popupWindow.find(".popupwindow_content").css("opacity",1);
          var defPosition = _RestoreSavedPosition(popupWindow);
          var defSize = _RestoreSavedSize(popupWindow);
          //popupWindow.find(".popupwindow_content").css("opacity",1);
          return jQuery.when(defPosition, defSize).then(function () {
            popupWindow.data("minimized", false);
            //显示子弹框
            if (popupWindow.data("settings").childDialog != "") {//有打开的子弹框
              $("#" + popupWindow.data("settings").childDialog + "_dialog").show();
            } else {
            }
            _TriggerEvent(popupWindow, "unminimize");
          });
        });

      }
    }

  }

  function _Destroy(popupWindow) {
    if (!_CheckPopupWindow(popupWindow)) return;
    var originalTarget = popupWindow.data("originalTarget");
    originalTarget.appendTo(popupWindow.data("originalParent"));
    if (popupWindow.data("minimized")) {
      popupWindow.remove();
    } else {
      popupWindow.data("overlay").remove();
    }
    originalTarget.trigger("destroy.popupwindow");
  }

//这个函数问题影响高度
  function _GetCurrentPosition(popupWindow) {
    if (!_CheckPopupWindow(popupWindow)) return undefined;
    return jQuery.extend({}, popupWindow.data("currentPosition"));
  }

  function _SetCurrentPosition(popupWindow, position) {
    jQuery.extend(popupWindow.data("currentPosition"), position);
  }

  function _SaveCurrentPosition(popupWindow) {
    var nowPsition = {};
    nowPsition.left = popupWindow.data("currentPosition").left;
    nowPsition.top = popupWindow.data("currentPosition").top;
    popupWindow.data("savedPosition", nowPsition);
    //popupWindow.data("savedPosition", _GetCurrentPosition(popupWindow));
  }

  function _RestoreSavedPosition(popupWindow) {
    return _ChangePosition(popupWindow, popupWindow.data("savedPosition"));
  }

  function _ChangePosition(popupWindow, params) {
    if (!_CheckPopupWindow(popupWindow)) return;
    var defRet = jQuery.Deferred();
    var settings = popupWindow.data("settings");
    var animationTime = (params.animationTime !== undefined) ? parseInt(params.animationTime) : settings.animationTime;
    var newPosition = {
      top: params.top,
      left: params.left
    };
    if (params.check) {
      if (!popupWindow.data("opened") || popupWindow.data("maximized") || popupWindow.data("minimized")) return;
      if (settings.keepInViewport) {
        var size = _GetCurrentSize(popupWindow);
        if (newPosition.top > settings.maxHeight - size.height) newPosition.top = settings.maxHeight - size.height;
        if (newPosition.left > settings.maxWidth - size.width) newPosition.left = settings.maxWidth - size.width;
        if (newPosition.top < 41) newPosition.top = 41;
        if (newPosition.left < 0) newPosition.left = 0;
      }
    }
    //这个问题
    var currentPosition = _GetCurrentPosition(popupWindow);
    //currentPosition.top != newPosition.top||
    if (currentPosition.left != newPosition.left) {
      popupWindow.animate(newPosition, {
        duration: animationTime,
        queue: false,
        complete: function () {
          _SetCurrentPosition(popupWindow, newPosition);
          if (params.event) _TriggerEvent(popupWindow, "move");
          defRet.resolve();
        }
      });
    } else {
      defRet.resolve();
    }
    return defRet.promise();
  }

  function _CheckPosition(popupWindow) {
    _ChangePosition(popupWindow, jQuery.extend({
      animationTime: popupWindow.data("settings").animationTime / _constants.secondaryAnimationTimeFactor,
      check: true,
      event: true,
    }, _GetCurrentPosition(popupWindow)));
  }

  function _GetCurrentSize(popupWindow) {
    if (!_CheckPopupWindow(popupWindow)) return undefined;
    return jQuery.extend({}, popupWindow.data("currentSize"));
  }

  function _SetCurrentSize(popupWindow, size) {
    jQuery.extend(popupWindow.data("currentSize"), size);
  }

  function _SaveCurrentSize(popupWindow) {
    var nowSize = {};
    nowSize.width = popupWindow.data().currentSize.width;
    nowSize.height = popupWindow.data().currentSize.height;
    popupWindow.data("savedSize", nowSize);
    //popupWindow.data("savedSize", _GetCurrentSize(popupWindow));
  }

  function _RestoreSavedSize(popupWindow) {
    return _ChangeSize(popupWindow, jQuery.extend({
      checkPosition: true,
      checkSize: false,
      event: false
    }, popupWindow.data("savedSize")));
  }

  function _ChangeSize(popupWindow, params) {
    if (!_CheckPopupWindow(popupWindow)) return;
    var defRet = jQuery.Deferred();
    var settings = popupWindow.data("settings");
    var animationTime = (params.animationTime !== undefined) ? parseInt(params.animationTime) : settings.animationTime;
    var newSize = {
      width: params.width,
      height: params.height
    };
    if (params.checkSize) {
      if (!popupWindow.data("opened") || popupWindow.data("maximized") || popupWindow.data("minimized")) return;
      if (settings.maxWidth && newSize.width > settings.maxWidth) newSize.width = settings.maxWidth;
      if (settings.minWidth && newSize.width < settings.minWidth) newSize.width = settings.minWidth;
      if (settings.maxHeight && newSize.height > settings.maxHeight) newSize.height = settings.maxHeight;
      if (settings.minHeight && newSize.height < settings.minHeight) newSize.height = settings.minHeight;
      if (popupWindow.data("collapsed")) {
        popupWindow.data("savedSize", jQuery.extend({}, newSize));
        delete newSize.height;
      }
    }
    var currentSize = _GetCurrentSize(popupWindow);
    if (currentSize.width != newSize.width || currentSize.height != newSize.height) {
      popupWindow.animate(newSize, {
        duration: animationTime,
        queue: false,
        complete: function () {
          _SetCurrentSize(popupWindow, newSize);
          if (params.event) _TriggerEvent(popupWindow, "resize");
          if (params.checkPosition) _CheckPosition(popupWindow);
          defRet.resolve();
        }
      });
    } else {
      defRet.resolve();
    }
    return defRet.promise();
  }

  function _CheckSize(popupWindow) {
    _ChangeSize(popupWindow, jQuery.extend({
      animationTime: popupWindow.data("settings").animationTime / _constants.secondaryAnimationTimeFactor,
      checkPosition: false,
      checkSize: true,
      event: true
    }, _GetCurrentSize(popupWindow)));
  }

  function _GetState(popupWindow) {
    if (!popupWindow.length) return undefined;
    if (!popupWindow.data("opened")) return "closed";
    if (popupWindow.data("minimized")) return "minimized";
    if (popupWindow.data("collapsed")) return "collapsed";
    if (popupWindow.data("maximized")) return "maximized";
    return "normal";
  }

  function _SetState(popupWindow, state) {
    if (!_CheckPopupWindow(popupWindow)) return;
    switch (state.toLowerCase()) {
      case "normal":
        if (!popupWindow.data("opened")) _Open(popupWindow);
        if (popupWindow.data("minimized")) _Unminimize(popupWindow);
        if (popupWindow.data("collapsed")) _Uncollapse(popupWindow);
        if (popupWindow.data("maximized")) _Unmaximize(popupWindow);
        break;
      case "closed":
        _Close(popupWindow);
        break;
      case "maximized":
        _Maximize(popupWindow);
        break;
      case "unmaximized":
        _Unmaximize(popupWindow);
        break;
      case "collapsed":
        _Collapse(popupWindow);
        break;
      case "uncollapsed":
        _Uncollapse(popupWindow);
        break;
      case "minimized":
        _Minimize(popupWindow);
        break;
      case "unminimized":
        _Unminimize(popupWindow);
        break;
    }
  }

  function _SetTitle(popupWindow, title) {
    if (!_CheckPopupWindow(popupWindow)) return;
    popupWindow.data("settings").title = title;
    popupWindow.find(".popupwindow_titlebar_text").text(title);
  }

  function _StatusBar(popupWindow, content) {
    if (!_CheckPopupWindow(popupWindow)) return;
    popupWindow.find(".popupwindow_statusbar_content").html(content);
  }

  function _GetBordersWidth(popupWindow, border) {
    if (border !== undefined) return parseInt(popupWindow.css("border-" + border + "-width"), 10);
    return {
      top: parseInt(popupWindow.css("border-top-width"), 10),
      bottom: parseInt(popupWindow.css("border-bottom-width"), 10),
      left: parseInt(popupWindow.css("border-left-width"), 10),
      right: parseInt(popupWindow.css("border-right-width"), 10)
    };
  }

  function _AddDocumentMouseEventHandlers(eventData) {
    eventData.popupWindow.fadeTo(0, eventData.opacity);
    if (!eventData.popupWindow.data("settings").mouseMoveEvents) eventData.popupWindow.data("tempSavedData", {
      position: _GetCurrentPosition(eventData.popupWindow),
      size: _GetCurrentSize(eventData.popupWindow)
    });
    jQuery(document)
      .on("mousemove", eventData, _Document_MouseMove)
      .on("mouseup", eventData, _Document_MouseUp);
  }

  function _TriggerEvent(popupWindow, eventName) {
    var eventData;
    if (eventName == "move") eventData = _GetCurrentPosition(popupWindow);
    if (eventName == "resize") eventData = _GetCurrentSize(popupWindow);
    popupWindow.data("originalTarget").trigger(eventName + ".popupwindow", eventData);
  }

  function _SetMinimizedArea() {
    var flex = {};
    if (_minimizedArea.direction == "horizontal") {//实现弹框一直在左下角
      // flex["flex-direction"]  = (_minimizedArea.position.indexOf("left") >= 0) ? "row" : "row-reverse";
      // flex["flex-wrap"]       = (_minimizedArea.position.indexOf("top") >= 0) ? "wrap" : "wrap-reverse";
    } else {
      // flex["flex-direction"]  = (_minimizedArea.position.indexOf("top") >= 0) ? "column" : "column-reverse";
      //flex["flex-wrap"]       = (_minimizedArea.position.indexOf("left") >= 0) ? "wrap" : "wrap-reverse";
    }
    _mainContainer.css(flex);
  }


  function _CheckPopupWindow(popupWindow) {
    if (popupWindow.length) return true;
    _Warning("jQuery PopupWindow is not initialized on this element");
    return false;
  }

  function _Warning(message) {
    message = "jQuery PopupWindow Warning: " + message;
    if (window.console.warn) {
      console.warn(message);
    } else if (window.console.log) {
      console.log(message);
    }
  }

  // **************************************************
  //  EVENT HANDLERS
  // **************************************************
  //在外部修改层叠关系
  function _outerSwitchzindex(popupWindow, getVal) {
    clearTimeout(window.stopSwitchZindexTimer);
    //判断父子弹框
    var getJqueryDom = $("#" + popupWindow.data("settings").dialogId + "_dialog");
    if (getVal == null) {
      if (getJqueryDom.find(".popupwindow").data("settings").isParent) {//父
        var dealZIndex = window.topZIndex + 1;
        getJqueryDom.css("zIndex", dealZIndex);
        window.topZIndex = dealZIndex;
        if (getJqueryDom.find(".popupwindow").data("settings").childDialog != "") {//有打开的子弹框
          jQuery("#" + getJqueryDom.find(".popupwindow").data("settings").childDialog + "_dialog").css("zIndex", dealZIndex);
        } else {
        }
      } else {//子
        //拿到当前弹框的信息
        //拿到父弹框元素 修改z-index
        var dealZIndex = window.topZIndex + 1;
        getJqueryDom.css("zIndex", dealZIndex);
        window.topZIndex = dealZIndex;
        jQuery("#" + getJqueryDom.find(".popupwindow").data("settings").parentDialog + "_dialog").css("zIndex", dealZIndex);
      }
    } else {
      var maxzIndex = window.topZIndex + 1;
      $(".popupwindow_container").each((index, nowelement) => {
        if (maxzIndex < parseInt($(nowelement).css("zIndex"))) {
          maxzIndex = parseInt($(nowelement).css("zIndex"));
        }
      });
      if (maxzIndex < getVal) {
        maxzIndex = getVal;
      }
      window.topZIndex = maxzIndex;
      if (getJqueryDom.find(".popupwindow").data("settings").isParent) {//父
        getJqueryDom.css("zIndex", maxzIndex);
        if (getJqueryDom.find(".popupwindow").data("settings").childDialog != "") {//有打开的子弹框
          jQuery("#" + getJqueryDom.find(".popupwindow").data("settings").childDialog + "_dialog").css("zIndex", maxzIndex);
        } else {
        }
      } else {//子
        //拿到当前弹框的信息
        //拿到父弹框元素 修改z-index
        getJqueryDom.css("zIndex", maxzIndex);
        jQuery("#" + getJqueryDom.find(".popupwindow").data("settings").parentDialog + "_dialog").css("zIndex", maxzIndex);
      }
    }
  }

  //修改层叠关系
  function _switchZIndex(event, getJqueryDom) {
    if (event != null || event != undefined) {//点击当前弹框的时候
      if (jQuery(".popupwindow_container").length <= 1) {//判断是否为最后一个
        if (window.topZIndex == 1) {//是否已经初始化zindex
          return false;
        } else {//只为一个时
          jQuery(".popupwindow_container").css("zIndex", 1);
          window.topZIndex = 1;
          if (jQuery(event.currentTarget).data("settings").isParent) {
            window.topDialog = jQuery(event.currentTarget).parent().parent().attr("id");
          }
        }
      } else {//层级替换
        //防止打开子弹框，触发抖动 动画
        /* if(window.topDialog == jQuery(event.currentTarget).parent().parent().attr("id")){return false;}*/
        //判断父子弹框
        try {//处理关闭弹框触发切换层级事件
          jQuery(event.currentTarget).data("settings").isParent;
        } catch (e) {
          return false;
        }
        if (jQuery(event.currentTarget).data("settings").isParent) {//父
          if (jQuery(event.currentTarget).data("settings").childDialog != "") {//有打开的子弹框 父 加动画
            //noOption
            if (!jQuery(event.currentTarget).parent().parent().hasClass("firstClick")) {
              $("#" + jQuery(event.currentTarget).data("settings").childDialog + "_dialog .popupwindow").removeClass("maskDialog");
              var animateTopOptionTimer = setTimeout(function () {
                $("#" + jQuery(event.currentTarget).data("settings").childDialog + "_dialog .popupwindow").addClass("maskDialog");
                clearTimeout(animateTopOptionTimer);
              }, 200);
            } else {
              jQuery(event.currentTarget).parent().parent().removeClass("firstClick");
              $("#" + jQuery(event.currentTarget).data("settings").childDialog + "_dialog .popupwindow").removeClass("maskDialog");
            }
          }
          if (window.topDialog != jQuery(event.currentTarget).parent().parent().attr("id")) {//父 子保持和父一致
            var dealZIndex = window.topZIndex + 1;
            jQuery(event.currentTarget).parent().parent().css("zIndex", dealZIndex);
            window.topZIndex = dealZIndex;
            window.topDialog = jQuery(event.currentTarget).parent().parent().attr("id");
            if (jQuery(event.currentTarget).data("settings").childDialog != "") {//有打开的子弹框 父
              jQuery("#" + jQuery(event.currentTarget).data("settings").childDialog + "_dialog").css("zIndex", dealZIndex);
            } else {
            }//没有打开子弹框
          }
        } else {//子
          //拿到当前弹框的信息
          //拿到父弹框元素 修改z-index
          if (jQuery("#" + jQuery(event.currentTarget).data("settings").parentDialog + "_dialog").attr("id") != window.topDialog) {
            var dealZIndex = window.topZIndex + 1;
            jQuery(event.currentTarget).css("zIndex", dealZIndex);
            window.topZIndex = dealZIndex;
            window.topDialog = jQuery("#" + jQuery(event.currentTarget).data("settings").parentDialog + "_dialog").attr("id");
            jQuery("#" + jQuery(event.currentTarget).data("settings").parentDialog + "_dialog").css("zIndex", dealZIndex);
            jQuery(event.currentTarget).parent().parent().css("zIndex", dealZIndex);
          }
        }

      }

    } else {
      //最小 最大的时候监听点击
      if (jQuery(".popupwindow_container").length <= 1) {//判断是否为最后一个
        if (window.topZIndex == 1) {
          return false;
        } else {//只为一个时
          jQuery(".popupwindow_container").css("zIndex", 1);
          window.topZIndex = 1;
          if (getJqueryDom.find(".popupwindow").data("settings").isParent) {
            window.topDialog = getJqueryDom.attr("id");
          }
        }
      } else {

        //针对这几个文件管理打开的播放弹框
        if (getJqueryDom != undefined) {
          //判断父子弹框
          if (getJqueryDom.find(".popupwindow").data("settings").isParent) {//父
            if (getJqueryDom.attr("id") != window.topDialog) {
              window.topDialog = getJqueryDom.attr("id");
              var dealZIndex = window.topZIndex + 1;
              getJqueryDom.css("zIndex", dealZIndex);
              if (getJqueryDom.find(".popupwindow").data("settings").childDialog != "") {//有打开的子弹框
                jQuery("#" + getJqueryDom.find(".popupwindow").data("settings").childDialog + "_dialog").css("zIndex", dealZIndex);
              } else {
              }
              window.topZIndex = dealZIndex;
              /*if(!noExclude(getJqueryDom.attr("id"))){
                window.topZIndex = dealZIndex;
              }*/

            }
          } else {//子
            //拿到当前弹框的信息
            //拿到父弹框元素 修改z-index
            if (getJqueryDom.attr("id") != window.topDialog) {
              var dealZIndex = window.topZIndex + 1;
              window.topZIndex = dealZIndex;
              getJqueryDom.css("zIndex", dealZIndex);
              jQuery("#" + getJqueryDom.find(".popupwindow").data("settings").parentDialog + "_dialog").css("zIndex", dealZIndex);
              window.topDialog = getJqueryDom.find(".popupwindow").data("settings").parentDialog + "_dialog";
              /*if(!noExclude(getJqueryDom.find(".popupwindow").data("settings").parentDialog+"_dialog")){
                window.topDialog = getJqueryDom.find(".popupwindow").data("settings").parentDialog+"_dialog";
              }*/
            }
          }
        } else {
        }
      }
    }
  }

  function noExclude(param) {
    var flag = false;
    var getArr = ["66_dialog", "67_dialog", "playVideoContainer_dialog"];
    getArr.forEach((item, index) => {
      if (param == item) {
        flag = true;
      }
    });
    return flag;
  }

  function _ButtonClose_Click(event) {
    if (jQuery(".popupwindow_container").length <= 2) {
      jQuery(".popupwindow_container").css("zIndex", 1);
      window.topZIndex = 1;
    }
    _Close(jQuery(event.currentTarget).closest(".popupwindow"));
    return false;
  }

  function _ButtonMax_Click(event) {
    var popupWindow = jQuery(event.currentTarget).closest(".popupwindow");
    if (!popupWindow.data("maximized")) {
      _Maximize(popupWindow);
    } else {
      _Unmaximize(popupWindow);
    }
  }

  function _ButtonCollapse_Click(event) {
    var popupWindow = jQuery(event.currentTarget).closest(".popupwindow");
    if (!popupWindow.data("collapsed")) {
      _Collapse(popupWindow);
    } else {
      _Uncollapse(popupWindow);
    }
  }

  function _ButtonMin_Click(event) {
    var popupWindow = jQuery(event.currentTarget).closest(".popupwindow");
    if (!popupWindow.data("minimized")) {
      _Minimize(popupWindow);
    } else {
      _Unminimize(popupWindow);
    }
  }

  //移动动画弹框删除
  function _removeMoveAnimatedDialog() {
    var initConfig = {
      dialogId: 'copyAnimatedDialog',
      childDialog: '',
      parentDialog: '',
      isParent: true,
      trueConfigClose: false
    }
    var dialogConfig = JSON.parse(JSON.stringify($("div#animateDialog .popupwindow").data("settings")));
    $.extend(dialogConfig, initConfig);
    $("div#animateDialog .popupwindow").data("settings", dialogConfig);
    _Close($("div#animateDialog .popupwindow"), true);
    _Destroy($("div#animateDialog .popupwindow"));
    $("div#animateDialog").remove();
  }

  function _Titlebar_MouseDown(event) {
    if ($("div#animateDialog").length > 0) {
      _removeMoveAnimatedDialog();
    }
    if (event.target !== event.currentTarget && !jQuery(event.target).hasClass("popupwindow_titlebar_text")) return false;
    var popupWindow = jQuery(event.currentTarget).closest(".popupwindow");
    var currentPosition = _GetCurrentPosition(popupWindow);
    var settings = popupWindow.data("settings");
    //为了解决闪烁，因为初始位置大小没有保持一致
    settings.left = parseFloat(popupWindow.css("left"));
    settings.top = parseFloat(popupWindow.css("top"));
    settings.width = parseFloat(popupWindow.width());
    settings.height = parseFloat(popupWindow.height());
    var getInfo = {};
    if (popupWindow.data("savedPosition") == undefined) {
      getInfo.savedPosition = {
        left: parseFloat(popupWindow.css("left")),
        top: parseFloat(popupWindow.css("top"))
      };
    }
    if (popupWindow.data("savedSize") == undefined) {
      getInfo.savedSize = {
        width: parseFloat(popupWindow.width()),
        height: parseFloat(popupWindow.height())
      };
    }
    _copyInit($(".copyAnimatedDialog"), settings, getInfo, 0);
    if (settings.isParent) {//父页面拖拽实现层级替换
      _switchZIndex(null, popupWindow.parent().parent());//实现拖拽时切换层级关系
    }
    $("div#animateDialog .popupwindow").show();//把东西放出来
    $("div#animateDialog .popupwindow").data("overlay").show();
    $("div#animateDialog .popupwindow").data("opened", true);
    popupWindow.addClass("copyDialog");
    if (!settings.modal) {
      popupWindow.data("overlay").css("background-color", "transparent").width("100%").height("100%");
      $("div#animateDialog .popupwindow").data("overlay").css("background-color", "transparent").width("100%").height("100%");
    }
    _AddDocumentMouseEventHandlers({
      // popupWindow     : popupWindow,
      popupWindow: $("div#animateDialog .popupwindow"),
      action: "drag",
      opacity: settings.dragOpacity,
      compensationX: event.pageX - currentPosition.left,
      compensationY: event.pageY - currentPosition.top
    });
    event.preventDefault();
  }
  //原弹框的拖拽事件
  function deal_Resizer_MouseDown (dialogId) {
    if(window.nowDialogId!=null){
      return;
    }
    $(".popupwindow_dotted_box").addClass("initHideDottedBox");
    //获取一次原弹框样式
    if(!$("div#" + dialogId + "_dialog").hasClass("hasResizing")){
      $("div#" + dialogId + "_dialog .popupwindow_dotted_box").attr("style", $("div#" + dialogId + "_dialog .popupwindow").attr("style"));
      $("div#" + dialogId + "_dialog .popupwindow_dotted_box").removeClass("initHideDottedBox");
    }
  }
  //原弹框的拖拽事件
  function deal_Resizer_Mouseout(dialogId) {
    if(window.nowDialogId!=null){
      return;
    }
    if(!$("div#" + dialogId + "_dialog").hasClass("hasResizing")) {//移动位置时不触发
      $("div#" + dialogId + "_dialog .popupwindow_dotted_box").addClass("initHideDottedBox").removeClass("showColor");
    }
  }
  function _Resizer_MouseDown(event) {
    var popupWindow = jQuery(event.currentTarget).parentsUntil(".popupwindow_container").find(".popupwindow");
    //由于100% 导致拖拽数值不识别
    var settings = popupWindow.data("settings");
    window.nowDialogId=settings.dialogId;
    $("div#" + settings.dialogId + "_dialog .popupwindow_dotted_box").removeClass("initHideDottedBox");
    $("div#" + settings.dialogId + "_dialog .popupwindow_dotted_box").addClass("showColor");
    $("div#" + settings.dialogId + "_dialog").addClass("hasResizing");
    // var popupWindow     = jQuery(event.currentTarget).closest(".popupwindow");
    //var popupWindow     = jQuery(event.currentTarget).closest(".popupwindow");
    var currentPosition = _GetCurrentPosition(popupWindow);
    var currentSize = _GetCurrentSize(popupWindow);
    var deal_currentSize_width = currentSize.width;
    var deal_currentSize_height = currentSize.height;
    //currentSize.width=="100%"?deal_currentSize_width= settings.maxWidth:deal_currentSize_width=currentSize.width;
    // currentSize.height=="100%"?deal_currentSize_height= settings.maxHeight:deal_currentSize_width=currentSize.height;
    _AddDocumentMouseEventHandlers({
      popupWindow: popupWindow,
      action: "resize",
      dimension: event.data.dimension,
      directionX: event.data.directionX,
      directionY: event.data.directionY,
      opacity: popupWindow.data("settings").resizeOpacity,
      startX: event.pageX + ((event.data.directionX == "left") ? deal_currentSize_width : -deal_currentSize_width),
      startY: event.pageY + ((event.data.directionY == "top") ? deal_currentSize_height : -deal_currentSize_height),
      compensationX: event.pageX - currentPosition.left,
      compensationY: event.pageY - currentPosition.top
    });
    event.preventDefault();
  }

  function _Document_MouseMove(event) {
    var popupWindow = event.data.popupWindow;
    var settings = popupWindow.data("settings");
    $("div#" + settings.dialogId + "_dialog").addClass("hasResizing");
    var newPosition = {};
    var newSize = {};
    switch (event.data.action) {
      case "drag":
        var currentPosition = _GetCurrentPosition(popupWindow);
        var currentSize = _GetCurrentSize(popupWindow);
        newPosition.top = event.pageY - event.data.compensationY;
        newPosition.left = event.pageX - event.data.compensationX;

        if (settings.keepInViewport) {
          var size = _GetCurrentSize(popupWindow);
          //由于100% 导致拖拽数值不识别
          var deal_currentSize_width = size.width;
          var deal_currentSize_height = size.height;
          size.width == "100%" ? deal_currentSize_width = settings.maxWidth : deal_currentSize_width = size.width;
          size.height == "100%" ? deal_currentSize_height = settings.maxHeight : deal_currentSize_height = size.height;
          //顶部临界值判断
          if (newPosition.top < 41) newPosition.top = 41;
          //底部临界值的判断
          if (newPosition.top > settings.maxHeight - deal_currentSize_height + deal_currentSize_height - 30) newPosition.top = settings.maxHeight - deal_currentSize_height + deal_currentSize_height - 30;
          // 左侧的临界值判断 如果我鼠标移动的距离+面板的宽度大于125 我就让他自己等于自己
          if (newPosition.left + deal_currentSize_width <= 100) {
            newPosition.left = (100 - deal_currentSize_width)
          }
          //如果鼠标移动的距离 大于 可视的宽度 - 面板的宽度  左侧移动的宽度就等于可视的宽度-面板的宽度
          if (newPosition.left > settings.maxWidth - deal_currentSize_width + deal_currentSize_width - 100) newPosition.left = settings.maxWidth - deal_currentSize_width + deal_currentSize_width - 100;
          //我想分离拖拽和改变大小
          if ((newPosition.top !== undefined && newPosition.top != currentPosition.top) || (newPosition.left !== undefined && newPosition.left != currentPosition.left)) {
            popupWindow.css(newPosition);
            if ($("div#animateDialog").length > 0) {//拖拽时
              _SetCurrentPosition($("#" + settings.dialogId + "_dialog .popupwindow"), newPosition);
            }
            _SetCurrentPosition(popupWindow, newPosition);
            if (settings.mouseMoveEvents) _TriggerEvent(popupWindow, "move");
          }
        }
        break;
      case "resize":
        var currentPosition = {
          top: parseFloat(jQuery(event.currentTarget).parentsUntil(".popupwindow_dotted_box").css("top")),
          left: parseFloat(jQuery(event.currentTarget).parentsUntil(".popupwindow_dotted_box").css("left")),
        };
        var currentSize = {
          width: parseFloat(jQuery(event.currentTarget).parentsUntil(".popupwindow_dotted_box").width()),
          height: parseFloat(jQuery(event.currentTarget).parentsUntil(".popupwindow_dotted_box").height()),
        };
        if (event.data.dimension != "height" && event.pageX > 0) {//left right
          if (event.data.directionX == "left") {
            var newWidth = event.data.startX - event.pageX;
            if (newWidth >= settings.minWidth && (!settings.maxWidth || newWidth <= settings.maxWidth)) {
              newSize.width = newWidth;
              newPosition.left = event.pageX - event.data.compensationX;
            }
          } else {
            var newWidth = event.pageX - event.data.startX
            if (parseFloat($("#" + settings.dialogId + "_dialog").find(".popupwindow_dotted_box").css("left")) + newWidth > settings.maxWidth) {
              newWidth = $(document).width() - parseFloat($("#" + settings.dialogId + "_dialog").find(".popupwindow_dotted_box").css("left"))
            } else {
              if (newWidth >= settings.minWidth && (!settings.maxWidth || newWidth <= settings.maxWidth)) {
                newSize.width = newWidth;
              }
            }
          }

        }
        if (event.data.dimension != "width" && event.pageY > 0) {//top bottom
          if (event.data.directionY == "top") {
            var newHeight = event.data.startY - event.pageY;
            if (newHeight >= settings.minHeight && (!settings.maxHeight || newHeight <= settings.maxHeight)) {
              newSize.height = newHeight;
              newPosition.top = event.pageY - event.data.compensationY;
              if (newSize.height > settings.maxHeight) {//最大高度
                newSize.height = settings.maxHeight;
                newPosition.top = 41;
              } else {//没到达最大高度 但top<41
                if (newPosition.top < 41) {
                  newSize.height = newSize.height - (41 - newPosition.top);
                  newPosition.top = 41;
                }
              }
            }
          } else {//bottom
            var newHeight = event.pageY - event.data.startY;
            if (newHeight >= settings.minHeight && (!settings.maxHeight || newHeight <= settings.maxHeight)) {
              if (newHeight > settings.maxHeight) {
                newSize.height = settings.maxHeight;
              } else {
                newSize.height = newHeight;
              }

            }
          }
        }
        /*var oldDottedDialogObj={//拿到之前的样式值 //防止小距离拖拽
            left:popupWindow.parent()
        };*/
        var dealDottedDialogObj = {};
        $.extend(dealDottedDialogObj, newSize);
        $.extend(dealDottedDialogObj, newPosition);
        /* dimension: "width" directionX: "left" directionY: undefined*/
        for (var nowkey in dealDottedDialogObj) {
          dealDottedDialogObj[nowkey] = dealDottedDialogObj[nowkey] + 'px'
         /* if(event.data.dimension=="width"){
               if(nowkey=="height"){
                 newSize.height=parseFloat($(popupWindow).parent().find(".popupwindow_dotted_box").height());
                 dealDottedDialogObj['height']=newSize.height+'px';
               }
               if(nowkey=="top"){
                 newPosition.top=parseFloat($(popupWindow).parent().find(".popupwindow_dotted_box").css("top"));
                 dealDottedDialogObj['top']=newPosition.top+'px';
               }
          }else if(nowkey=="both"){}else{//height
            if(nowkey=="width"){
              newSize.width=parseFloat($(popupWindow).parent().find(".popupwindow_dotted_box").width());
              dealDottedDialogObj['width']=newSize.width+'px';
            }
            if(nowkey=="left"){
              newPosition.left=parseFloat($(popupWindow).parent().find(".popupwindow_dotted_box").css("left"));
              dealDottedDialogObj['left']=newPosition.left+'px';
            }
          }*/
        }
        if (Object.keys(dealDottedDialogObj).length > 0) {
          $(popupWindow).parent().find(".popupwindow_dotted_box").css(dealDottedDialogObj);
        }
        //我想分离拖拽和改变大小
        if ((newPosition.top !== undefined && newPosition.top != currentPosition.top) || (newPosition.left !== undefined && newPosition.left != currentPosition.left)) {
          // popupWindow.css(newPosition);
          var dealNewPosition=popupWindow.data("currentPosition");
          $.extend(dealNewPosition, newPosition);
          popupWindow.data("currentPosition",dealNewPosition);
          //_SetCurrentPosition(popupWindow, newPosition);
          if (settings.mouseMoveEvents) _TriggerEvent(popupWindow, "move");
        }
        if ((newSize.width !== undefined && newSize.width != currentSize.width) || (newSize.height !== undefined && newSize.height != currentSize.height)) {
          //popupWindow.outerWidth(newSize.width).outerHeight(newSize.height);
          //_SetCurrentSize(popupWindow, newSize);
          var dealNewSize=popupWindow.data("currentSize");
          $.extend(dealNewSize, newSize);
          popupWindow.data("currentSize",dealNewSize);
          if (settings.mouseMoveEvents) _TriggerEvent(popupWindow, "resize");
        }
        break;
    }

  }

  function _Document_MouseUp(event) {
    var dialogData = event.data.popupWindow.data();
    var settings = event.data.popupWindow.data("settings");
    //赋值 设置信息及位置
    $("#" + settings.dialogId + "_dialog .popupwindow").data("settings", settings);
    switch (event.data.action) {
      case "drag":
        $("#" + settings.dialogId + "_dialog .popupwindow").css({
          "top": event.data.popupWindow.css("top"),
          "left": event.data.popupWindow.css("left")
        });
        break;
      case "resize":
        event.data.popupWindow.css({
          "top": dialogData.currentPosition.top + 'px',
          "left": dialogData.currentPosition.left + 'px',
          "width": dialogData.currentSize.width + 'px',
          "height": dialogData.currentSize.height + 'px',
        });
        //$("div#"+dialogId+"_dialog .popupwindow_dotted_box").addClass("initHideDottedBox");
        $("#" + settings.dialogId + "_dialog").find(".popupwindow_dotted_box").addClass("initHideDottedBox").removeClass("showColor");
        window.nowDialogId=null;
        break;
    }
    var popupWindow = $("#" + settings.dialogId + "_dialog .popupwindow");
    popupWindow.fadeTo(0, 1);
    jQuery(document)
      .off("mousemove", _Document_MouseMove)
      .off("mouseup", _Document_MouseUp);
    $("div#" + settings.dialogId + "_dialog").removeClass("hasResizing");//移除判定mouseover 和 mouseout class
    if (!settings.modal) popupWindow.data("overlay").width(0).height(0).css("background-color", "");
    if (!settings.mouseMoveEvents) {
      var currentPosition = _GetCurrentPosition(popupWindow);
      var currentSize = _GetCurrentSize(popupWindow);
      var savedData = popupWindow.data("tempSavedData");
      if (savedData.position.top != currentPosition.top || savedData.position.left != currentPosition.left) _TriggerEvent(popupWindow, "move");
      if (savedData.size.width != currentSize.width || savedData.size.height != currentSize.height) _TriggerEvent(popupWindow, "resize");
      popupWindow.removeData("tempSavedData");
    }
    //移除复制的弹框
    if ($("div#animateDialog").length > 0) {
      $("#" + settings.dialogId + "_dialog .popupwindow").removeClass("copyDialog");
      _removeMoveAnimatedDialog();
    }
  }

  function _Native_Drag(event) {
    switch (event.type) {
      case "dragstart":
        event.originalEvent.dataTransfer.effectAllowed = "move";
        var popupWindow = jQuery(event.currentTarget).closest(".popupwindow");
        var settings = popupWindow.data("settings");
        var boundary = this.getBoundingClientRect();
        popupWindow.data("adjust", {x: boundary.x - event.originalEvent.x, y: boundary.y - event.originalEvent.y});
        popupWindow.css({"opacity": settings.dragOpacity});
        break;
      case "drag":
        var popupWindow = jQuery(event.currentTarget).closest(".popupwindow");
        var settings = popupWindow.data("settings");
        var adjust = popupWindow.data("adjust");
        var newPosition = {top: event.originalEvent.y + adjust.y, left: event.originalEvent.x + adjust.x};
        if (event.originalEvent.x && event.originalEvent.y) {
          var size = _GetCurrentSize(popupWindow);
          var outside = (newPosition.top < 0)
            || (newPosition.left < 0)
            || (newPosition.top > settings.maxHeight - size.height)
            || (newPosition.left > settings.maxWidth - size.width);

          popupWindow.css(jQuery.extend(newPosition, {visibility: outside ? "hidden" : "visible"}));
          popupWindow.data("coords", newPosition);
        }
        break;
      case "dragend":
        event.preventDefault();
        event.stopPropagation();
        var popupWindow = jQuery(event.currentTarget).closest(".popupwindow");
        var settings = popupWindow.data("settings");
        var adjust = popupWindow.data("adjust");
        var newPosition = popupWindow.data("coords");
        0
        if (settings.keepInViewport) {
          var size = _GetCurrentSize(popupWindow);
          if (newPosition.top < 41) newPosition.top = 41;
          if (newPosition.left < 0) newPosition.left = 0;
          if (newPosition.top > settings.maxHeight - size.height) newPosition.top = settings.maxHeight - size.height;
          if (newPosition.left > settings.maxWidth - size.width) newPosition.left = settings.maxWidth - size.width;
        }
        popupWindow.css(jQuery.extend(newPosition, {"opacity": 1, visibility: "visible"}));
        _SetCurrentPosition(popupWindow, newPosition);
        if (settings.mouseMoveEvents) _TriggerEvent(popupWindow, "move");
        break;
      default:
      //
    }
    return true;
  }

  function _Native_Drag_Handle() {
    jQuery(this).parent().attr("draggable", "true");
  }

  let pageResize = function () {
    //用来监听高度的变化 获取初始的高度
    let maxHeight = document.documentElement.clientHeight - 41;
    let maxWidth = document.documentElement.clientWidth;
    jQuery(document).find(".popupwindow").each(function () {
      var popupWindow = jQuery(this);
      if(!$("div#" +  popupWindow.data("settings").dialogId + "_dialog").hasClass("hasResizing")) {
        popupWindow.data("settings").maxHeight = maxHeight;
        popupWindow.data("settings").maxWidth = maxWidth;
        let trueChangeTop = popupWindow.data().savedPosition != undefined || window.oldHeight == $(window).height() ? false : true;
        let trueChangeLeft = window.oldWidth == $(window).width() ? false : true;
        //根据浏览器大小 自动调整窗口位置
        if (popupWindow.data("settings").keepInViewport && popupWindow.data().opened) {
          if ($(window).height() - 40 < $(popupWindow).height() + parseFloat($(popupWindow).css("top")) && trueChangeTop) {
            popupWindow.data("settings").top = (($(window).height() - 40) - $(popupWindow).height()) / 2;
            popupWindow.data("settings").top = popupWindow.data("settings").top < 40 ? 40 : popupWindow.data("settings").top + 40;
            popupWindow.data().currentPosition.top = popupWindow.data("settings").top;
          }
          if ($(window).width() < $(popupWindow).width() + popupWindow.data().currentPosition.left && trueChangeLeft) {
            popupWindow.data("settings").left = $(window).width() - $(popupWindow).width();
            popupWindow.data().currentPosition.left = popupWindow.data("settings").left;
          }
          popupWindow.css({
            "top": popupWindow.data().currentPosition.top + "px",
            "left": popupWindow.data().currentPosition.left + "px"
          });
          // _CheckPosition(popupWindow);
          // _CheckSize(popupWindow);
        }
      }
    });
    window.oldHeight = $(window).height();
    window.oldWidth = $(window).width();
  }
  $(function () {
    jQuery(window).on("resize", debounce(pageResize, 400, false, true));
  });
  return jQuery;
});

