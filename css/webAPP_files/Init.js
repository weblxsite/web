// var u = navigator.userAgent, app = navigator.appVersion;
// var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
// var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// alert('是否是Android：'+isAndroid);
// alert('是否是iOS：'+isiOS);

/* ======================================== 页面初始化 ======================================== */

function inIt(){
	// var scale = 1 / devicePixelRatio;
	// document.querySelector('html').setAttribute('data-dpr',''+devicePixelRatio+'');//
	// document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
	var doc = document.documentElement;
	var deviceWidth = doc.clientWidth;
	if(deviceWidth > 1080) deviceWidth = 1080;
	doc.style.fontSize = deviceWidth / 10 + 'px';
	var rem_len = parseInt(doc.style.fontSize,10);
	document.querySelector('body').style.width = doc.clientWidth +'px';
	document.querySelector('body').style.height = doc.clientHeight +'px';
	var header = parseInt(document.querySelector('.lx-header-top').offsetHeight,10);
	var footer = parseInt(document.querySelector('.lx-footer').offsetHeight,10);
	document.querySelector('.lx-body-main').style.height = (doc.clientHeight-header-footer)/deviceWidth*10 +'rem';
	document.querySelector('.lx-body-main').style.overflowY = 'auto';
	document.querySelector('.lx-body-main').style.overflowX = "hidden";
}

/* ======================================== 自定义图片滚动 ======================================== */

/**
 * [imgInit                 自定义图片滚动]
 * [_listScroll_left        向左滑动]
 * [_listScroll_right       向右滑动]
 * [_touchhandler           触摸事件处理] 
 * @param  {[w]}            [设备宽度]
 * @param  {[_timeId]}      [计时器]
 * @param  {[_scrollings]}  [图片列表]
 * @param  {[_lxUIimg]}     [图片class]
 * @param  {[_len]}         [图片列表长度]
 * @param  {[_touchStart]}     [触摸前偏移值]
 * @param  {[_touchEnd]}     [触摸后偏移值]
 * @param  {[_num]}         [触摸后偏移值]
 * @param  {[_oldLeft]}    [移动前 translate3d 的left值]
 * @param  {[_countNum]}   [计数器]
 */
var _width      = document.documentElement.clientWidth;
var _timeId     = null;
var _scrollings = null;
var _lxUIimg    = null;
var _len        = null;
var _touchStart = 0;// 触摸前偏移值
var _touchEnd   = 0; // 触摸后偏移值
var _num        = 0; // 触摸后偏移值
var _oldLeft    = 0;//  移动前 translate3d 的left值
var _countNum   = 0;// 计数器
function imgInit(_className){
	_lxUIimg = document.querySelector('.'+_className+'');
	_lxUIimg.style.transitionDuration="500ms";
	_lxUIimg.style.transform="translate3d(0px, 0px, 0px)";
	_scrollings = _lxUIimg.getElementsByTagName('div');
	_len = _scrollings.length;	
	for (var i = 0; i < _len; i++) {
		_scrollings.item(i).style.left = i*_width+"px";
		EventUtil.addHandler(_scrollings.item(i),"touchstart",_touchhandler);
		EventUtil.addHandler(_scrollings.item(i),"touchmove",_touchhandler);
		EventUtil.addHandler(_scrollings.item(i),"touchend",_touchhandler);
	};
	_timeId=window.setTimeout("_listScroll_left()",3000);
}
// 向左滑动
function _listScroll_left(){
	_countNum++;
	_lxUIimg.style.transform="translate3d("+(-_width*_countNum)+"px, 0px, 0px)";
	var i_index = _countNum%(parseInt(_len));
	switch(true){
		case _countNum > 0 :
			_scrollings.item(i_index).style.left = (_countNum)*_width+"px";
			break;
		case i_index == 0:
			_scrollings.item(i_index).style.left = (_countNum)*_width+"px";
			break;
		case _countNum < 0:
			_scrollings.item(i_index+(_len)).style.left = (_countNum)*_width+"px";
			break;
	}
	_timeId=window.setTimeout("_listScroll_left()",3000);
}
// 向右滑动
function _listScroll_right(){
	_countNum--;
	_lxUIimg.style.transform="translate3d("+(-_width*_countNum)+"px, 0px, 0px)";
	var i_index = _countNum%(parseInt(_len));
	switch(true){
		case _countNum >= 0 :
			_scrollings.item(i_index).style.left = (_countNum)*_width+"px";
			break;
		case _countNum < 0 && _countNum > -parseInt(_len):
			_scrollings.item(i_index+(_len)).style.left = (_countNum)*_width+"px";
			break;
		case i_index == 0:
			_scrollings.item(i_index).style.left = (_countNum)*_width+"px";
			break;
		case _countNum <= -parseInt(_len):
			_scrollings.item(i_index+(_len)).style.left = (_countNum)*_width+"px";
			break;
	}
	_timeId=window.setTimeout("_listScroll_left()",3000);
}
// 图片左右触摸事件
function _touchhandler(){
	switch(event.type){
		case "touchstart":
			event.preventDefault();
			window.clearTimeout(_timeId);
			_touchStart = event.touches[0].clientX;
			var results = _lxUIimg.style.transform;
			_oldLeft = results.substring(results.indexOf('(')+1,results.indexOf('px'));
			break;
		case "touchmove":
			event.preventDefault();
			_touchEnd = event.changedTouches[0].clientX;
			_num = _touchEnd - _touchStart;
			_lxUIimg.style.transform="translate3d("+(_num+parseInt(_oldLeft))+"px, 0px, 0px)";
			break;
		case "touchend":
			event.preventDefault();
			_touchEnd = event.changedTouches[0].clientX;
			_num = _touchEnd - _touchStart;
			switch(true){
				/* ====================== 向右滑动 ====================== */
				case _num < 150 && _num > 0:// Failed
					_lxUIimg.style.transform="translate3d( "+(parseInt(_oldLeft))+"px, 0px, 0px)";
					_timeId=window.setTimeout("_listScroll_left()",3000);
					break;
				case _num > 150:// SuccessFul
					_listScroll_right();
					break;
				/* ====================== 向左滑动 ====================== */
				case _num > -150 && _num < 0: 
					_lxUIimg.style.transform="translate3d("+(parseInt(_oldLeft))+"px, 0px, 0px)";
					_timeId=window.setTimeout("_listScroll_left()",3000);
					break;
				case _num < -150: // SuccessFul
					window.clearTimeout(_timeId);
					_listScroll_left();
					break;
				case _num == 0:
					window.location.href = this.childNodes[0].href;
					break;
				default:
					break;
			}
			break;
	}
}

/* ======================================== 上拉滚动 ======================================== */


/* ======================================== 事件兼容 ======================================== */

var EventUtil = {
	addHandler:function(element,type,handler){
		// alert(index)
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