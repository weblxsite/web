/* ======================================== 自定义弹窗 ====================================== */
/**
 * [toLxalert description]
 * @param  {[issure]} issure  [是否提示框]
 * @param  {[message]} message [显示内容]
 */
function toLxalert(issure,message){
	var w_height       = document.documentElement.clientHeight;
	var w_width        = document.documentElement.clientWidth;
	var lxalert_hidden = document.querySelector('.lx-hiddenMain');
	var lxalert        = document.querySelector('.lx-alert');
	var ok             = document.querySelector('.lx-ok');
	var cancel         = document.querySelector('.lx-cancel');
	var lxmessage      = document.querySelector('.lx-message');
	/* ======= 弹窗出现及元素初始化 ======= */
	lxalert_hidden.style.display = 'block';
	lxalert.style.display        = 'block';
	lxalert.className            = 'lx-alert animated zoomIn';
	lxalert.style.height         = 0.3*w_height+'px';
	lxalert.style.top            = 0.3*w_height+'px';
	lxalert.style.width          = 0.8*w_width+'px';
	lxalert.style.left           = 0.1*w_width+'px';
	var blist                    = parseInt(document.querySelector('.lx-button-list').offsetHeight,10);
	ok.style.height              = 0.5*blist+'px';
	ok.style.lineHeight          = 0.5*blist+'px';
	cancel.style.height          = 0.5*blist+'px';
	cancel.style.lineHeight      = 0.5*blist+'px';
	if(issure == true){
		cancel.style.display  = 'none';
		ok.style.float        = 'none';
		ok.style.marginTop    = '0';
		ok.style.marginBottom = '0';
		ok.style.marginRight  = 'auto';
		ok.style.marginLeft   = 'auto';
	}
	lxmessage.innerHTML = ""+message+"";
	/* ======= 确定 ======= */
	ok.onclick = function(){
		lxalert.className = 'lx-alert animated zoomOut';
		lxalert_hidden.style.display = 'none';
		setTimeout(function(){lxalert.style.display = 'none';},500)
	}
	/* ======= 取消 ======= */
	cancel.onclick = function(){
		lxalert.className = 'lx-alert animated zoomOut';
		lxalert_hidden.style.display = 'none';			
		setTimeout(function(){lxalert.style.display = 'none';},500)
	}
}