var _el_ys = '';
var _html_v = '';
function SetCalendar(el,html_v,year, month,data) {
    data = data.toString();
    _el_ys = el;
    _html_v = html_v;
    var daynumber = GetMDay(year, month); //当月天数  
    var firstnumber = WeekNumber(year, month, 1); //当月第一天星期几 
    var lastnumber = WeekNumber(year, month, daynumber); //当月最后一天星期几 
    var weeknumber = (daynumber - (7 - firstnumber) - (lastnumber + 1)) / 7; //除去第一个星期和最后一个星期的周数  
    var day = 1;
    var name;
    var calendar = "";
    var w_height       = $('#'+_el_ys+'').outerHeight();
    var w_width        = $('#'+_el_ys+'').outerWidth();
    var td_w = parseFloat(w_width)/7+"px";
    var td_h = parseFloat(w_height)/(weeknumber+4)+"px";
    calendar += "<table class='calendar-model' border=\"0\" cellspacing=\"1\">";
    calendar += "<tr>";
    calendar += "<td style='width:"+td_w+";height:"+td_h+"'>日</td>";
    calendar += "<td style='width:"+td_w+";height:"+td_h+"'>一</td>";
    calendar += "<td style='width:"+td_w+";height:"+td_h+"'>二</td>";
    calendar += "<td style='width:"+td_w+";height:"+td_h+"'>三</td>";
    calendar += "<td style='width:"+td_w+";height:"+td_h+"'>四</td>";
    calendar += "<td style='width:"+td_w+";height:"+td_h+"'>五</td>";
    calendar += "<td style='width:"+td_w+";height:"+td_h+"'>六</td>";
    calendar += "</tr>";
    calendar += "<tr>";
    var i = 0;
    for (i = 0; i < firstnumber; i++){ //第一个星期
        calendar += "<td style='width:"+td_w+";height:"+td_h+"'></td>";
    }
    for (i = firstnumber; i < 7; i++) {
        name = year + "-" + month + "-" + day;
        if(month < 10){
            name = year + "-0" + month + "-" + day;
        }
        if(day <10){
            name = year + "-" + month + "-0" + day;
        }
        if(month < 10 && day < 10){
            name = year + "-0" + month + "-0" + day;
        }
        var  istrue = '';
        if(day <10){
            var day_1 = '0'+day;
            istrue = data.indexOf(day_1); 
        }else{
            istrue = data.indexOf(day); 
        }
        if(istrue != -1){
            calendar += "<td style='width:"+td_w+";height:"+td_h+"' ><span id=\"" + name + "\">" + day + "</span><span class='hasdata'></span></td>";
        }else{
            calendar += "<td style='width:"+td_w+";height:"+td_h+"' ><span id=\"" + name + "\">" + day + "</span></td>";
        }
        day++;
    }
    calendar += "</tr>";
    var number = 0; //星期数，末尾添加空行用，统一样式。
    for (i = 0; i < weeknumber; i++){ //其他星期 
        calendar += "<tr>";
        for (var k = daynumber - (7 - firstnumber) - (weeknumber - 1) * 7; k < daynumber - (7 - firstnumber) - (weeknumber - 1) * 7 + 7; k++) {
            name = year + "-" + month + "-" + day;
            if(month < 10){
                name = year + "-0" + month + "-" + day;
            }
            if(day <10){
                name = year + "-" + month + "-0" + day;
            }
            if(month < 10 && day < 10){
                name = year + "-0" + month + "-0" + day;
            }
            if(day <10){
                var day_1 = '0'+day;
                istrue = data.indexOf(day_1); 
            }else{
                istrue = data.indexOf(day); 
            }
            if(istrue != -1){
                calendar += "<td style='width:"+td_w+";height:"+td_h+"' ><span id=\"" + name + "\">" + day + "</span><span class='hasdata'></span></td>";
            }else{
                calendar += "<td style='width:"+td_w+";height:"+td_h+"' ><span id=\"" + name + "\">" + day + "</span></td>";
            }
            day++;
        }
        calendar += "</tr>";
        number++;
    }
    calendar += "<tr>"; 
    for (i = 0; i < lastnumber + 1; i++){//最后一个星期
        name = year + "-" + month + "-" + day;
        if(month < 10){
            name = year + "-0" + month + "-" + day;
        }
        if(day <10){
            name = year + "-" + month + "-0" + day;
        }
        if(month < 10 && day < 10){
            name = year + "-0" + month + "-0" + day;
        }
        if(day <10){
            var day_1 = '0'+day;
            istrue = data.indexOf(day_1);  
        }else{
            istrue = data.indexOf(day); 
        }
        if(istrue != -1){
            calendar += "<td style='width:"+td_w+";height:"+td_h+"' ><span id=\"" + name + "\">" + day + "</span><span class='hasdata'></span></td>";
        }else{
            calendar += "<td style='width:"+td_w+";height:"+td_h+"' ><span id=\"" + name + "\">" + day + "</span></td>";
        }
        day++;
    }
    for (i = lastnumber + 1; i < 7; i++) {
        calendar += "<td>";
        calendar += "</td>";
    }
    calendar += "</tr>";
    if (number == 3) {
        calendar += "<tr><td style='width:"+td_w+";height:"+td_h+"'></td><td style='width:"+td_w+";height:"+td_h+"'></td><td style='width:"+td_w+";height:"+td_h+"'></td><td style='width:"+td_w+";height:"+td_h+"'></td><td style='width:"+td_w+";height:"+td_h+"'></td><td style='width:"+td_w+";height:"+td_h+"'></td><td style='width:"+td_w+";height:"+td_h+"'></td></tr>";
    }
    calendar += "</table>";
    imgInit();
    return calendar;
}
// 给定年月获取当月天数
function GetMDay(y, m) {
    var mday = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0 && y % 100 == 0)) //判断是否是闰月
        mday[1] = 29;
    return mday[m - 1];
}
// 获取星期数 
function WeekNumber(y, m, d) {
    var wk;
    if (m <= 12 && m >= 1) {
        for (var i = 1; i < m; ++i) {
            d += GetMDay(y, i);
        }
    }
    /*根据日期计算星期的公式*/
    wk = (y - 1 + (y - 1) / 4 - (y - 1) / 100 + (y - 1) / 400 + d) % 7;
    //0对应星期天，1对应星期一 
    return parseInt(wk);
}
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
 * [imgInit                 自定义图片滚动]
 * @param  {[_touchStart]}     [触摸前偏移值]
 * @param  {[_touchEnd]}     [触摸后偏移值]
 * @param  {[_num]}         [触摸后偏移值]
 */

var _lxUIimg    = null;
var _touchStart = 0;// 触摸前偏移值
var _touchEnd   = 0; // 触摸后偏移值
var _num        = 0; // 触摸后偏移值
function imgInit(){
    _lxUIimg = document.getElementById(''+_el_ys+'');;
    EventUtil.addHandler(_lxUIimg,"touchstart",_touchhandler);
    EventUtil.addHandler(_lxUIimg,"touchmove",_touchhandler);
    EventUtil.addHandler(_lxUIimg,"touchend",_touchhandler);
}
var date = new Date();
var year = date.getFullYear();
var mouth = date.getMonth() + 1;
// var day = date.getDate();
// 图片左右触摸事件
function _touchhandler(el){
    var date = new Date();
    var toyear = date.getFullYear();
    var tomonth =  date.getMonth() + 1;
    var today = date.getDate();
    switch(event.type){
        case "touchstart":
            _touchStart = event.touches[0].clientX;
            break;
        case "touchmove":
            _touchEnd = event.changedTouches[0].clientX;
            break;
        case "touchend":
            _touchEnd = event.changedTouches[0].clientX;
            _num = _touchEnd - _touchStart;
            switch(true){
                case _num > 150:// SuccessFul 向右滑动 
                    if(mouth >1){
                       mouth--; 
                    }else{
                        year--;
                        mouth = 12;
                    }
                    data = getdata();
                    $("#"+_el_ys+"").html(SetCalendar(""+_el_ys+"",""+_html_v+"",year, mouth,data));
                    $("table").find('span').eq(0).addClass('active');
                    var d = $("table").find('span').eq(0).attr('id');
                    var y = d.substring(0,4);
                    var m = d.substring(5,7);
                    var day = d.substring(8);
                    var html = y+'年'+m+"月"+day+"日";
                    $("."+_html_v+"").html(html);
                    $("table").find('span').each(function() {
                        if(tomonth == m && toyear == y){
                            if($(this).text() == today){
                                $("table").find('span').removeClass('active');
                                $(this).addClass('todayactive');
                            }
                        }
                        $(this).click(function(event) {
                            $("table").find('span').removeClass('active');
                            $(this).addClass('active');
                            var d = $(this).attr('id');
                            var y = d.substring(0,4);
                            var m = d.substring(5,7);
                            var day = d.substring(8);
                            var html = y+'年'+m+"月"+day+"日"
                            $(".ht_date").html(html)
                        });
                    });
                    break;
                case _num < -150: // SuccessFul 向左滑动
                    if(mouth <12){
                       mouth++; 
                    }else{
                        year++;
                        mouth = 1;
                    }
                    data = getdata();
                    $("#"+_el_ys+"").html(SetCalendar(""+_el_ys+"",""+_html_v+"",year, mouth,data));
                    $("table").find('span').eq(0).addClass('active');
                    var d = $("table").find('span').eq(0).attr('id');
                    var y = d.substring(0,4);
                    var m = d.substring(5,7);
                    var day = d.substring(8);
                    var html = y+'年'+m+"月"+day+"日";
                    $("."+_html_v+"").html(html);
                    // alert(today)
                    $("table").find('span').each(function() {
                        if(tomonth == m && toyear == y){
                            if($(this).text() == today){
                                $("table").find('span').removeClass('active');
                                $(this).addClass('todayactive');
                            }
                        }
                        $(this).click(function(event) {
                            $("table").find('span').removeClass('active');
                            $(this).addClass('active');
                            var d = $(this).attr('id');
                            var y = d.substring(0,4);
                            var m = d.substring(5,7);
                            var day = d.substring(8);
                            var html = y+'年'+m+"月"+day+"日"
                            $(".ht_date").html(html)
                        });
                    });
                    break;
            }
        break;
    }
}
function getdata(){
    return [];
}
