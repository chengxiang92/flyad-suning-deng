/**
 * Created by 祥 on 2016/4/29.
 */
// alert弹框需要
$(function () {
    // alert弹框需要
    $("body").append('<div id="alertlay" class="absolute top0 fullpage hide"><div id="alertcontent"><div id="alertmsg"></div><div id="alertokbtn" onclick="$(\'#alertlay\').addClass(\'hide\');">好的</div></div></div>');
    $("body").append('<div id="alertconfirmlay" class="fullpage hide"><div id="alertconfirmcontent"><div id="alertconfirmmsg"></div><div id="confirmokbtn">好的</div><div id="confirmcancelbtn">取消</div></div></div>');
});
// 基础弹框
window.alert = function (msg) {
    $("#alertmsg").html(msg);
    $("#alertlay").removeClass("hide");
    return false;
}
window.confirm = function (msg, okcallback, cancelcallback) {
    $("#alertconfirmmsg").html(msg);
    $("#alertconfirmlay").removeClass("hide");
    $("#confirmokbtn").click(function () {
        if (okcallback) {
            okcallback();
        }
        $("#alertconfirmlay").addClass("hide");
        return true;
    });
    $("#confirmcancelbtn").click(function () {
        if (cancelcallback) {
            cancelcallback();
        }
        $("#alertconfirmlay").addClass("hide");
        return false;
    });
    return false;
}
// 动态设置页面标题（兼容android与IOS）
function setTitle(title) {
    var $body = $('body');
    document.title = title;
    // hack在微信等webview中无法修改document.title的情况
    var $iframe = $('<iframe src="http://i.fly-ad.cn/bpoint.jpg" width="0" height="0"></iframe>');
    $iframe.on('load', function () {
        setTimeout(function () {
            $iframe.off('load').remove();
        }, 0);
    }).appendTo($body);
}
// 机型判断
function isAndroid() {
    var ua = navigator.userAgent;
    if (/Android (\d+\.\d+)/.test(ua)) {
        return true;
    } else {
        return false;
    }
}
function isIos() {
    var ua = navigator.userAgent;
    if (/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua)) {
        return true;
    } else {
        return false;
    }
}
var phoneWidth = parseInt(window.screen.width);
var phoneScale = phoneWidth / 640;
var ua = navigator.userAgent;
if (/Android (\d+\.\d+)/.test(ua)) {
    var version = parseFloat(RegExp.$1);
    // andriod 2.3
    if (version > 2.3) {
        document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
        // andriod 2.3以上
    } else {
        document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
    }
    // 其他系统
} else {
    document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
}
var ww = $(window).width();;
var wh = $(window).height();
var percentw;
var percenth;
function SelfAdaption(){
    percentw = ww / designWidht;
    percenth = wh / designHeight;
    $(".fullpage,.innerfullpage").css({
        "width": ww + "px",
        "height": wh + "px",
        "background-size": ww + "px " + wh + "px"
    });
    $(".adaptH").each(function(){
        var h = $(this).attr("height");
        if (h != undefined) {
            $(this).css({"height": h*percenth + "px"});
        }
    });
    $(".nomove").on("touchmove",function(e){
        e.preventDefault();
        return false;
    });
    $(".centerX").each(function(){
        var w = $(this).attr("width");
        if (w != undefined) {
            if(w>ww){
                $(this).css({"left": -((w-ww)/2) + "px"});
            }else if(w==ww){
                $(this).css({"left": "0px"});
            }else{
                $(this).css({"left": (ww-w)/2 + "px"});
            }
        }
    });

    $(".centerY").each(function(){
        var h = $(this).attr("height");
        if (h != undefined) {
            if(h>wh){
                $(this).css({"top": -((h-wh)/2) + "px"});
            }else if(h==wh){
                $(this).css({"top": "0px"});
            }else{
                $(this).css({"top": (wh-h)/2 + "px"});
            }
        }
    });
    
    $(".locate").each(function () {
        var left = $(this).attr("left");
        var top = $(this).attr("top");
        var bottom = $(this).attr("bottom");
        var right = $(this).attr("right");
        if (left != undefined) {
            $(this).css({"left": left * percentw + "px"});
        }
        if (top != undefined) {
            $(this).css({"top": top * percenth + "px"});
        }
        if (bottom != undefined) {
            $(this).css({"bottom": bottom * percenth + "px"});
        }
        if (right != undefined) {
            $(this).css({"right": right * percenth + "px"});
        }
    });
}
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+ ";path=/";;
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


function ajax(src, callback) {
    var script = document.createElement('script'), cb = "callback_" + (new Date()).getMilliseconds() + parseInt(Math.random() * 1000);
    //整理cb参数    
    if (callback) {
        if (src.indexOf("?") != -1) {
            src += "&callback=" + cb;
        } else {
            src += "?callback=" + cb;
        }
    }
//回调 
    window[cb] = function (a) {
        callback(a);
        window[cb] = null;
        return;
    }
//写入    
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', src);
    document.getElementsByTagName("head")[0].appendChild(script);
}

var _isWeixinReady = true;
function AudioAutoPlayById(id){
    var audio = document.getElementById(id);audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {audio.play();_isWeixinReady = true}, false);
    document.addEventListener('YixinJSBridgeReady', function() {audio.play();}, false);
}
function InitAudioById(id){
    var audio = document.getElementById(id);audio.play();audio.pause();
    document.addEventListener("WeixinJSBridgeReady", function () {audio.play();audio.pause(); _isWeixinReady = true}, false);
    document.addEventListener('YixinJSBridgeReady', function() {audio.play();audio.pause();}, false);
}