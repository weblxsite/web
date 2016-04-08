/* ======================================== 事件兼容 ======================================== */
var EventUtil = {
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false)
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type] = handler;
        }
    },
    getEvent:function(event){
        return event ? event : window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    removeHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false)
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type] = null;
        }
    }
}
/**
 * [imgInit                 横向滚动]
 * [listScrollleft        向左滑动]
 * [listScrollright       向右滑动]
 * [touchhandler           触摸事件处理] 
 * @param  {[w]}            [设备宽度]
 * @param  {[scrollings]}  [图片列表]
 * @param  {[lxUIimg]}     [图片class]
 * @param  {[len]}         [图片列表长度]
 * @param  {[touchStart]}     [触摸前偏移值]
 * @param  {[touchEnd]}     [触摸后偏移值]
 * @param  {[num]}         [触摸后偏移值]
 * @param  {[oldLeft]}    [移动前 translate3d 的left值]
 * @param  {[countNum]}   [计数器]
 */
function scrollTouch(className) {
    var width      = 0;
    var scrollings = null;
    var lxUIimg    = null;
    var len        = null;
    var touchStart = 0;// 触摸前偏移值
    var touchEnd   = 0; // 触摸后偏移值
    var num        = 0; // 触摸后偏移值
    var oldLeft    = 0;//  移动前 translate3d 的left值
    var countNum   = 0;// 计数器
    imgInit(className);
    function imgInit(className){
        width = parseInt($(".add-user").outerWidth())+ 7;
        lxUIimg = document.querySelector(''+className+'');
        scrollings = lxUIimg.getElementsByTagName('div');
        len = scrollings.length; 
        for (var i = 0; i < len; i++) {
            scrollings.item(i).style.left = i*width+"px";
             scrollings.item(i).style.transitionDuration="500ms";
            EventUtil.addHandler(scrollings.item(i),"touchstart",touchhandler);
            EventUtil.addHandler(scrollings.item(i),"touchmove",touchhandler);
            EventUtil.addHandler(scrollings.item(i),"touchend",touchhandler);
        };
    }
    // 向左滑动
    function listScrollleft(){
        if(parseInt(scrollings.item(len-1).style.left) > 0){
            for (var i = 0; i < len; i++) {
                var left = scrollings.item(i).style.left;
                var trleft = parseInt(left) - width*3;
                scrollings.item(i).style.left = trleft+'px';
                scrollings.item(i).style.transitionDuration="300ms";
            }
            if(parseInt(scrollings.item(len-1).style.left) < 0){
                for (var i = 0; i < len; i++) {
                    var left = scrollings.item(i).style.left;
                    var trleft = parseInt(left) + width*3;
                    scrollings.item(i).style.left = trleft+'px';
                    scrollings.item(i).style.transitionDuration="300ms";
                }
            }
        }
    }
    // 向右滑动
    function listScrollright(){
        if(parseInt(scrollings.item(0).style.left) !== 0){
            for (var i = 0; i < len; i++) {
                var left = scrollings.item(i).style.left;
                var trleft = parseInt(left) + width*3;
                scrollings.item(i).style.left = trleft+'px';
                scrollings.item(i).style.transitionDuration="300ms";
            }
        }
    }
    // 图片左右触摸事件
    function touchhandler(){
        switch(event.type){
            case "touchstart":
                touchStart = event.touches[0].clientX;
                break;
            case "touchmove":
                touchEnd = event.changedTouches[0].clientX;
                break;
            case "touchend":
                touchEnd = event.changedTouches[0].clientX;
                num = touchEnd - touchStart;
                switch(true){
                    case num > 0:// SuccessFul 向右滑动
                        listScrollright();
                        break;                        
                    case num < 0: // SuccessFul 向左滑动
                        listScrollleft();
                        break;
                    default:
                        break;
                }
                break;
        }
    }
}