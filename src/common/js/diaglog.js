// 页面初始化
// $(function () {
// import {hasClass} from "element-ui/src/utils/dom";
let oldHeight=$(window).height();
let oldWidth=$(window).width();
//自适应高数设置
export let saveDialog = {
  top:'100px',
  left: $(window).width()-500+'px',
  height: (($(window).height()-40)*0.7)>=490?490+'px':((($(window).height()-40)*0.7)<366?366+'px':490+'px'),

}

 function getPosition () {
  // debugger
  let smallTools = document.querySelector('#smallTools')
   $('#dialog1').css({
     top: `${smallTools.offsetTop +40+ 'px'}`,
     left: `${smallTools.offsetLeft+'px'}`,
   })
  // window.addEventListener('resize',()=>{
  //   let smallTools = document.querySelector('#smallTools')
  //   saveDialog={
  //     top: `${smallTools.offsetTop + '40px'}`,
  //     left: `${smallTools.offsetLeft+'px'}`
  //   }
  // })
}
// export var saveDialog = {
//   top: `${smallToolsTop + '40px'}`,
//   left: `${smallToolsLeft+'px'}`,
//   height: '500px'
// };

// saveDialog={
//   top: `${smallTools.offsetTop + '40px'}`,
//   left: `${smallTools.offsetLeft+'px'}`
// }

 export function Init() {
   getPosition();
   saveDialog.top='100px';
   saveDialog.left=$(window).width()-500+'px';
   saveDialog.height=(($(window).height()-40)*0.7)>=490?490+'px':((($(window).height()-40)*0.7)<366?366+'px':490+'px');
   // 最大化时保存弹窗的位置大小
   var preDialogWidth = 0;
   var preDialogHeight = 0;
   var preDialogLeft = "0px";
   var preDialogTop = "0px";
   var el_dlg_right_bottom = document.getElementById("dlg_right_bottom");
   var el_dialog = document.getElementById("dialog");
   var el_dialog1 = document.getElementById("dialog1");
   var minHeight = $(el_dialog).attr("minheight");
   var minWidth = $(el_dialog).attr("minwidth");
   var right = document.getElementById("dlg_right");
   var bottom = document.getElementById("dlg_bottom");
   var mouseStart = {};
   var divStart = {};
   var rightStart = {};
   var bottomStart = {};
   // drag from right
   // right.onmousedown = function (ev) {
   //   var oEvent = ev || event;
   //   mouseStart.x = oEvent.clientX;
   //   mouseStart.y = oEvent.clientY;
   //   rightStart.x = right.offsetLeft;
   //   if (right.setCapture) {
   //     right.onmousemove = doDragToRightBottomToRight;
   //     right.onmouseup = stopDragToRightBottomToRight;
   //     right.setCapture();
   //   }
   //   else {
   //     document.addEventListener("mousemove", doDragToRightBottomToRight, true);
   //     document.addEventListener("mouseup", stopDragToRightBottomToRight, true);
   //   }
   // };
   // function doDragToRightBottomToRight(ev) {
   //   var oEvent = ev || event;
   //   var l = oEvent.clientX - mouseStart.x + rightStart.x;
   //   var w = l + el_dlg_right_bottom.offsetWidth;
   //   if (w < el_dlg_right_bottom.offsetWidth) {
   //     w = el_dlg_right_bottom.offsetWidth;
   //   }
   //   else if (w > document.documentElement.clientWidth - el_dialog.offsetLeft) {
   //     w = document.documentElement.clientWidth - el_dialog.offsetLeft - 2;
   //   }
   //   if (w < minWidth) return;
   //   el_dialog.style.width = w + "px";
   // };
   // function stopDragToRightBottomToRight() {
   //   if (right.releaseCapture) {
   //     right.onmousemove = null;
   //     right.onmouseup = null;
   //     right.releaseCapture();
   //   }
   //   else {
   //     document.removeEventListener("mousemove", doDragToRightBottomToRight, true);
   //     document.removeEventListener("mouseup", stopDragToRightBottomToRight, true);
   //   }
   // };
   // drag from bottom
   bottom.onmousedown = function (ev) {
     var oEvent = ev || event;
     mouseStart.x = oEvent.clientX;
     mouseStart.y = oEvent.clientY;
     bottomStart.y = bottom.offsetTop;
     if (bottom.setCapture) {
       bottom.onmousemove = doDragToRightBottomToBottom;
       bottom.onmouseup = stopDragToRightBottomToBottom;
       bottom.setCapture();
     } else {
       document.addEventListener("mousemove", doDragToRightBottomToBottom, true);
       document.addEventListener("mouseup", stopDragToRightBottomToBottom, true);
     }
   };

   function doDragToRightBottomToBottom (ev) {
     var oEvent = ev || event;
     var t = oEvent.clientY - mouseStart.y + bottomStart.y;
     var h = t + el_dlg_right_bottom.offsetHeight;
     if (h < el_dlg_right_bottom.offsetHeight) {
       h = el_dlg_right_bottom.offsetHeight;
     } else if (h > document.documentElement.clientHeight - el_dialog.offsetTop) {
       h = document.documentElement.clientHeight - el_dialog.offsetTop - 2;
     }
     if (h < minHeight) return;
     el_dialog.style.height = h + "px";
   }

   function stopDragToRightBottomToBottom () {
     saveDialog.height=el_dialog.style.height
     if (bottom.releaseCapture) {

       bottom.onmousemove = null;
       bottom.onmouseup = null;
       bottom.releaseCapture();
     } else {
       document.removeEventListener("mousemove", doDragToRightBottomToBottom, true);
       document.removeEventListener("mouseup", stopDragToRightBottomToBottom, true);
     }
   }
   // // drag from right bottom
   el_dlg_right_bottom.onmousedown = function (ev) {
     var oEvent = ev || event;
     mouseStart.x = oEvent.clientX;
     mouseStart.y = oEvent.clientY;
     divStart.x = el_dlg_right_bottom.offsetLeft;
     divStart.y = el_dlg_right_bottom.offsetTop;
     if (el_dlg_right_bottom.setCapture) {
       el_dlg_right_bottom.onmousemove = doDragToRightBottom;
       el_dlg_right_bottom.onmouseup = stopDragToRightBottom;
       el_dlg_right_bottom.setCapture();
     } else {
       document.addEventListener("mousemove", doDragToRightBottom, true);
       document.addEventListener("mouseup", stopDragToRightBottom, true);
     }
   };

   function doDragToRightBottom (ev) {
     var oEvent = ev || event;
     var l = oEvent.clientX - mouseStart.x + divStart.x;
     var t = oEvent.clientY - mouseStart.y + divStart.y;
     var w = l + el_dlg_right_bottom.offsetWidth;
     var h = t + el_dlg_right_bottom.offsetHeight;
     if (w < el_dlg_right_bottom.offsetWidth) {
       w = el_dlg_right_bottom.offsetWidth;
     } else if (w > document.documentElement.clientWidth - el_dialog.offsetLeft) {
       w = document.documentElement.clientWidth - el_dialog.offsetLeft - 2;
     }
     if (h < el_dlg_right_bottom.offsetHeight) {
       h = el_dlg_right_bottom.offsetHeight;
     } else if (h > document.documentElement.clientHeight - el_dialog.offsetTop) {
       h = document.documentElement.clientHeight - el_dialog.offsetTop - 2;
     }
     if (w < minWidth) return;
     el_dialog.style.width = w + "px";saveDialog.width= w + "px";
     if (h < minHeight) return;
     el_dialog.style.height = h + "px"; saveDialog.height=h + "px";
   };

   function stopDragToRightBottom () {
     if (el_dlg_right_bottom.releaseCapture) {
       el_dlg_right_bottom.onmousemove = null;
       el_dlg_right_bottom.onmouseup = null;
       el_dlg_right_bottom.releaseCapture();
     } else {
       document.removeEventListener("mousemove", doDragToRightBottom, true);
       document.removeEventListener("mouseup", stopDragToRightBottom, true);
     }
   }
   // 移动
   $("#dialog #dlg_top").bind("mousedown", moveHandler);

   // 最大化 || 还原
   $(".dlg_btn_max_top").bind("click", maxDialog(el_dialog));
   $(".dlg_btn_reback_top").bind("click", rebackDialog(el_dialog));
// });
   // 还原
   function rebackDialog (el_dialog) {
     el_dialog = $("#dialog")[0];
     el_dialog1 = $("#dialog1")[0];
     el_dialog.style.left = preDialogLeft;
     el_dialog.style.top = preDialogTop;
     el_dialog.style.width = preDialogWidth + "px";
     el_dialog.style.height = preDialogHeight + "px";
     saveDialog.left=preDialogLeft!=""?reDialogLeft:saveDialog.left;
     saveDialog.top=preDialogTop!=""?preDialogTop:saveDialog.top;
     saveDialog.width=preDialogWidth!=""?preDialogWidth + "px":saveDialog.width;
     saveDialog.height=preDialogHeight!=""?preDialogHeight + "px":saveDialog.height;

     $(this).blur();
     $(this).removeClass("dlg_btn_reback_top").addClass("dlg_btn_max_top");
     $(".dlg_btn_max_top").unbind("click").bind("click", maxDialog);
   }

   // 最大化
   function maxDialog (el_dialog) {
     el_dialog = $("#dialog")[0];
     el_dialog1 =$("#dialog")[0];
     preDialogWidth = el_dialog.offsetWidth;
     preDialogHeight = el_dialog.offsetHeight;
     preDialogLeft = el_dialog.style.left;
     preDialogTop = el_dialog.style.top;
     el_dialog.style.left = 0 + "px";
     el_dialog.style.top = 0 + "px";
     el_dialog.style.width = window.innerWidth - 5 + "px";
     el_dialog.style.height = window.innerHeight - 5 + "px";
     $(this).blur();
     $(this).removeClass("dlg_btn_max_top").addClass("dlg_btn_reback_top");
     $(".dlg_btn_reback_top").unbind("click").bind("click", rebackDialog);
   }

// 移动
   function moveHandler (eve) {
     var $trgt = $(event.target);
     if (!$trgt.hasClass("dlg_top")) return;
     var x = eve.pageX - el_dialog.offsetLeft
     var y = eve.pageY - el_dialog.offsetTop
     document.addEventListener('mousemove', move)

     function move (e) {
       if(!$("#dialog").hasClass("moveDilaog")){
         $("#dialog1").css({
           "left":$("#dialog").css("left"),
           "top":$("#dialog").css("top"),
           "width":$("#dialog").width()+"px",
           "height":$("#dialog").height()+"px"
         })
         $("#dialog").addClass("moveDilaog");
       }
       if(!$("#dialog1").hasClass("showMoveDialog")){
         $("#dialog1").addClass("showMoveDialog");
       }
       el_dialog1.style.left = e.pageX - x + 'px'
       el_dialog1.style.top = e.pageY - y + 'px'
       saveDialog.top=el_dialog1.style.top
       saveDialog.left=el_dialog1.style.left
       let clientWidth = document.body.clientWidth
       let clientHeight = document.body.clientHeight
       let width = el_dialog1.clientWidth
       let height = el_dialog1.clientHeight
       if (el_dialog1.offsetTop <= 41) {
         el_dialog1.style.top = 41 + 'px'
       }
       if (el_dialog1.offsetLeft <= 0 - width + 50) {
         el_dialog1.style.left = 0 - width + 50 + 'px'
       }
       if (el_dialog1.offsetTop >= clientHeight - 50) { //如果超出了当前top值
         el_dialog1.style.top = clientHeight - 50 + 'px'
       }
       if (el_dialog1.offsetLeft >= clientWidth - 50) {
         el_dialog1.style.left = clientWidth - 50 + 'px'
       }
     }

     document.addEventListener('mouseup', function (e) {
       // saveDialog.top=e.currentTarget.offsetTop
       document.removeEventListener('mousemove', move);
       $("#dialog").css({
         "left":$("#dialog1").css("left"),
         "top":$("#dialog1").css("top")
       });
       $("#dialog").removeClass("moveDilaog");
       $("#dialog1").removeClass("showMoveDialog");
     })
     // }
   }
   //弹框自适应
   window.addEventListener('resize', function () {
     if($("#dialog").css("left")!="-10000px"){//代表当隐显示
       returnDialogCss(true)
     }
   })
 }
 export function returnDialogCss(trueChangeDom){
   if($(window).height()!=oldHeight||trueChangeDom==false) {//高度改变
     oldHeight=$(window).height();
     //top height
     var dealTop = parseFloat(saveDialog.top)||parseFloat($("#dialog").css("top"));
     var dealHeight =parseFloat(saveDialog.height)|| $("#dialog").height();
     var getNowheight = dealHeight + dealTop;
     if (getNowheight > oldHeight - 40) {
       if (oldHeight - 40 > dealHeight) {
         //总值大于自身高度 只需要改变 top
         dealTop = ((oldHeight - 40) - dealHeight) + "px";
         dealHeight=dealHeight+"px";
       } else {//既要改变高度 还要改变top
         if ((oldHeight - 40) > (dealTop + 376)) {
           dealHeight = 376 + "px";//只减小高度
           dealTop=dealTop+"px";
         } else {//既要改变高度 还要改变top
           dealHeight = 376 + "px";//只减小高度
           dealTop = ((oldHeight - 40) - 376) + "px";
         }
       }
     }else{
       //保持原有的值不变
       dealHeight=dealHeight+"px";
       dealTop=dealTop+"px";
     }
     if(parseInt(dealTop)<50){
       dealTop=50+"px";
     }
     if(trueChangeDom==true){
       $("#dialog").css({"height":dealHeight, "top":dealTop});
     }
     saveDialog.top=dealTop;
     saveDialog.height=dealHeight;
   }

   if(oldWidth!=$(window).width()||trueChangeDom==false){//宽度发生了变化
     //left
     oldWidth=$(window).width();
     let dealLeft=parseFloat(saveDialog.left)||parseFloat($("#dialog").css("left"));
     if(oldWidth-dealLeft<500){
       dealLeft=(oldWidth-500)+"px";
     }else{
       if(dealLeft=="-10000"){//隐藏状态
         dealLeft=(oldWidth-500)+"px";
       }else{
         //保持原有的值不变
         dealLeft=dealLeft+"px";
       }
     }
     if(trueChangeDom==true) {$("#dialog").css({"left": dealLeft});}
     saveDialog.left=dealLeft;
   }
 }
// export {saveDialog}
