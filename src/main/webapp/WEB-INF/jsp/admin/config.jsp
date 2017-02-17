<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Amaze UI Admin table Examples</title>
    <meta name="description" content="这是一个 table 页面">
    <meta name="keywords" content="table">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="icon" type="image/png" href="/assets/i/favicon.png">
    <link rel="apple-touch-icon-precomposed" href="/assets/i/app-icon72x72@2x.png">
    <meta name="apple-mobile-web-app-title" content="Amaze UI" />
    <link rel="stylesheet" href="/assets/css/amazeui.min.css"/>
    <link rel="stylesheet" href="/assets/css/admin.css">
</head>
<body>
<!--[if lte IE 9]>
<p class="browsehappy">你正在使用<strong>过时</strong>的浏览器，Amaze UI 暂不支持。 请 <a href="http://browsehappy.com/" target="_blank">升级浏览器</a>
    以获得更好的体验！</p>
<![endif]-->

<header class="am-topbar am-topbar-inverse admin-header">
    <div class="am-topbar-brand">
    </div>

    <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: '#topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>

    <div class="am-collapse am-topbar-collapse" id="topbar-collapse">
        <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list">
            <li class="am-hide-sm-only"><a href="javascript:;" id="admin-fullscreen"><span class="am-icon-arrows-alt"></span> <span class="admin-fullText">开启全屏</span></a></li>
        </ul>
    </div>
</header>
<div style="display: none">
    <canvas id="canvas"></canvas>
</div>
<div class="am-cf admin-main">
    <!-- sidebar start -->
    <div class="admin-sidebar am-offcanvas" id="admin-offcanvas">
        <div class="am-offcanvas-bar admin-offcanvas-bar">
            <ul class="am-list admin-sidebar-list">
                <li><a href="config.do"><span class=""></span> 全局设置</a></li>
            </ul>
        </div>
    </div>
    <!-- sidebar end -->

    <!-- content start -->
    <div class="admin-content">
        <div class="admin-content-body">
            <hr>
            <div class="am-tabs am-margin" data-am-tabs>
                <ul class="am-tabs-nav am-nav am-nav-tabs">
                    <li class="am-active"><a href="#tab1">配置设置</a></li>
                </ul>
                <div class="am-tabs-bd">
                    <div class="am-tab-panel am-fade am-in am-active" id="tab1">
                        <div class="am-g">
                            <div class="am-u-sm-12 am-u-md-8">
                                <div class="am-btn-toolbar">
                                    <div class="am-btn-group am-btn-group-xs">
                                        <button id="update" type="button" class="am-btn am-btn-default"><span class="am-icon-save"></span> 更新</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="am-g">
                            <div class="am-u-sm-12 am-u-md-2 am-text-right admin-form-text">
                                分享标题:
                            </div>
                            <div class="am-u-sm-12 am-u-md-2 am-text-left">
                                <input id="title" style="width: 400px;" value="${config.title}">
                            </div>
                            <div class="am-u-sm-12 am-u-md-8">
                            </div>
                        </div>
                        <hr>
                        <div class="am-g">
                            <div class="am-u-sm-12 am-u-md-2 am-text-right admin-form-text">
                                分享描述:
                            </div>
                            <div class="am-u-sm-12 am-u-md-10">
                                <input id="desc" style="width: 400px;" value="${config.desc}">
                            </div>
                        </div>
                        <hr>
                        <div class="am-g">
                            <div class="am-u-sm-12 am-u-md-2 am-text-right admin-form-text">
                                分享图片:
                            </div>
                            <div class="am-u-sm-12 am-u-md-10">
                                <img id="shareImg" src="http://test.fly-ad.cn/suning-yuanxiao/shareimg/${config.img}.jpg" style="width: 100px; height: 100px;">
                                <input id="file" type="file" name="更换图片">
                                <input type="hidden" value="${config.img}" id="img">
                            </div>
                        </div>
                        <hr>
                        <div class="am-g">
                            <div class="am-u-sm-12 am-u-md-2 am-text-right admin-form-text">
                                规则介绍:
                            </div>
                            <div class="am-u-sm-12 am-u-md-10">
                                <textarea id="rule" style="width: 400px; height: 300px;">${config.rule}</textarea>
                            </div>
                        </div>
                        <hr>
                        <div class="am-g">
                            <div class="am-u-sm-12 am-u-md-2 am-text-right admin-form-text">
                                cnzz 统计:
                            </div>
                            <div class="am-u-sm-12 am-u-md-10">
                                <a href="http://new.cnzz.com/v1/login.php?siteid=1261166023" target="cnzz">点此进入</a>【密码：123456】
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <footer class="admin-content-footer">
            <hr>
            <p class="am-padding-left">© 2014 AllMobilize, Inc. Licensed under MIT license.</p>
        </footer>

    </div>
    <!-- content end -->
</div>

<a href="#" class="am-icon-btn am-icon-th-list am-show-sm-only admin-menu" data-am-offcanvas="{target: '#admin-offcanvas'}"></a>

<footer>
    <hr>
    <p class="am-padding-left">© 2014 AllMobilize, Inc. Licensed under MIT license.</p>
</footer>

<!--[if lt IE 9]>
<script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
<script src="http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js"></script>
<script src="assets/js/amazeui.ie8polyfill.min.js"></script>
<![endif]-->

<!--[if (gte IE 9)|!(IE)]><!-->
<script src="/assets/js/jquery.min.js"></script>
<!--<![endif]-->
<script src="/assets/js/amazeui.min.js"></script>
<script src="/assets/js/app.js"></script>
<script src="/suning-yuanxiao/js/megapix-image.js"></script>
<script src="/suning-yuanxiao/js/exif.js"></script>
<script src="/suning-yuanxiao/js/compress.js"></script>
<script>
    var _isSubing = false;
    $(document).ready(function () {

        COMPRESS.Init("file","shareImg","canvas", function (imgBase64) {
            $.ajax({
                url: "upload.do",
                type: "post",
                data: {
                    "imgBase64": imgBase64
                },
                success: function (e) {
                    if(e.code == "1"){
                        document.getElementById("shareImg").src = imgBase64;
                        $("#img").val(e.data);
                    }
                },
                error: function (e) {
                    console.log(e);
                },
            });
        });

        $("#update").click(function () {
            var title = $("#title").val();
            var desc = $("#desc").val();
            var img = $("#img").val();
            var rule = $("#rule").val();
            $.ajax({
                url: "update.do",
                type: "post",
                data: {
                    "title":title,
                    "desc":desc,
                    "img":img,
                    "rule": rule
                },
                success: function (e) {
                    _isSubing = false;
                    if(e == "1"){
                        alert("更新成功，点击确定刷新页面!");
                        window.location = window.location;
                    }
                },
                error: function (e) {
                    _isSubing = false;
                },
            });
        });
    });
</script>
</body>
</html>
