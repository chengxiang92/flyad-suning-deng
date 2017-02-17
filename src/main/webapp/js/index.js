/**
 * @date: 2017/1/19.
 * @auth: chengxiang92
 * @mail：chengxiang92@foxmail.com
 */
var LOAD = {
    numEle:{},
    imgSrcArray:{},
    Init:function (numEle, imgSrcArray) {
        //       LOAD.numEle = numEle;
        LOAD.imgSrcArray = imgSrcArray;
    },
    Start:function (callback) {
        var num = 0;
        jQuery.imgpreload( LOAD.imgSrcArray,{
            each: function () {
                num++;
                //          LOAD.numEle.html(parseInt(num/LOAD.imgSrcArray.length*100)+"%");
            },
            all: function(){
                callback();
            }
        });
    }
}
var TIMER = {
    tms : 20,
    timer : {},
    numELe: {},
    Init:function (numEle) {
        TIMER.numELe = numEle
    },
    Start: function (callback) {
        var num = TIMER.tms;
        TIMER.timer = setInterval(function () {
            num--;
            $("#q-tms").html(num);
            if(num == 0){
                clearInterval(TIMER.timer);
                callback();
            }
        },1000);
    },
    Stop:function () {
        clearInterval(TIMER.timer);
    }
}
    var _isStart = false;
    var imgSrcArray = new Array();
    var _imgCdn = "http://i.fly-ad.cn/suning/yuanxiao/"
    imgSrcArray.push(_imgCdn + "bg-2.jpg");
    imgSrcArray.push(_imgCdn + "title.png");
    imgSrcArray.push(_imgCdn + "index.png");
    imgSrcArray.push(_imgCdn + "index-1.png");
    imgSrcArray.push(_imgCdn + "index-2.png");
    imgSrcArray.push(_imgCdn + "index-3.png");
    imgSrcArray.push(_imgCdn + "snow.png");
    imgSrcArray.push(_imgCdn + "btn-1.png");
    imgSrcArray.push(_imgCdn + "btn-rule.png");
    imgSrcArray.push(_imgCdn + "btn-1-f.png");
    LOAD.Init("", imgSrcArray);
    LOAD.Start(function () {
        console.log("ok");
        if(_isStart){
            $("#container").fadeIn(500);
            setTimeout(function () {
                $("#index-t").show();
                $(".js-index").show();
                setTimeout(function () {
                    $("#rolling").show();
                },1000);
            },500);
        }else{
            _isStart = true;
        }
    });
var Q = {
    num:0,
    dArray:{},
    qArray:{},
    answerId: "",
    questionId:"",
    questionIdArray:new Array(),
    rightNums:0,
    wrongNums:0,
    showId:1,
    isShowIng : false,
    Init: function () {
        if(_isStart){
            $("#container").fadeIn(500);
            setTimeout(function () {
                $("#index-t").show();
                $(".js-index").show();
                setTimeout(function () {
                    $("#rolling").show();
                },1000);
            },500);
        }else{
            _isStart = true;
        }
        Q.dArray = Q.RandomDeng(11);
        Q.qArray = Q.RandomQuestion(11);
        Q.BindEvent();
        Q.InitDeng(1);
        Q.InitDeng(2);
        TIMER.Init($("#q-tms"));
        Shake.StartShakeListener();
    },
    BindEvent:function () {
        $("#btn-1").click(function () {
            $("#index").hide();
            $("#list").show();
        });

        $("#question-btn-close").click(function () {
           $("#question").hide();
           TIMER.Stop();
           Q.isOpenAllQuestion();
        });
        
        $(".js-d1, .js-d2").click(function () {
            var num = $(this).attr("v");
            Q.OpenQuestion(num);
        });

        $(".js-q-a").click(function () {
            $(".check").removeClass("check");
            $(this).find(".js-a-icon").addClass("check");
        });

        $(".js-a-icon").click(function () {
            $(".check").removeClass("check");
            $(this).addClass("check");
        });

        $("#q-btn-ok").on("touchstart",function () {
            Q.CheckAnswer();
            return false;
        });

        $("#btn-2").click(function () {
           Q.ChangeDeng();
        });
        $(".js-share").click(function () {
           $(this).hide();
            Q.ResetShare(0);
        });
        $("#btn-4").click(function () {
            Q.wrongNums = 0;
            $("#btn-light").hide();
            $("#share-2").show();
            Q.ResetShare(1);
        });
        $("#btn-6").click(function () {
            window.location.href = "http://c.m.suning.com/tongxun122.html";
        });
        $("#btn-7").click(function () {
            $("#share-1").show();
        });
        $("#suc-btn-close").click(function () {
            $("#suc").hide();
        });
        $("#rule-btn-close").click(function () {
            $("#rule").hide();
        });
        $("#btn-rule").click(function () {
            $("#rule").show();
        });

        $(".js-music").click(function () {
            var v = $(this).attr("v");
            $(".js-music").hide();
            $(".js-music").each(function () {
               if($(this).attr("v") != v){
                   $(this).show();
               }
            });
            if(v == 1){
                document.getElementById("music-bg").pause();
            }else{
                document.getElementById("music-bg").play();
            }
        })
    },
    ResetShare:function (type) {
        var link = "http://suning.fly-ad.cn/suning-yuanxiao/index.html";
        if(type == 1){
            link = "http://suning.fly-ad.cn/suning-yuanxiao/share.html?sn="+Q.qArray[Q.questionId].id;
        }
        RefreshShare("", "", link, "");
    },

    AddQuestionId: function(questionId){
        var isHas = false;
        for(var i= 0;i< Q.questionIdArray.length; i++){
            if(Q.questionIdArray[i] == questionId){
                isHas = true;
            }
        }
        if(!isHas){
            Q.questionIdArray.push(questionId);
        }
    },
    isOpenAllQuestion:function(){
        if(Q.questionIdArray.length == 4){
            Q.ChangeDeng();
        }
    },
    ChangeDeng:function () {
        Q.questionIdArray = new Array();
        if(! Q.isShowIng){
            Q.isShowIng = true;
            var a,b;
            var nextShow = Q.showId;
            if(Q.showId == 1){
                a = $(".js-d1");b = $(".js-d2");
                Q.showId = 2;
            }else{
                b = $(".js-d1");a = $(".js-d2");
                Q.showId = 1;
            }
            var i= 0;
            var timer  = setInterval(function () {
                if(i==4){
                    clearInterval(timer);
                    Q.InitDeng(nextShow);
                    Q.isShowIng = false;
                    return false;
                }
                var d = $(b[i]);
                $(a[i]).addClass("out").removeClass("in");
                setTimeout(function() {
                    d.addClass("in").removeClass("out").removeClass("d-f3");
                }, 225);
                i++;
            },225);
        }
    },
    CheckAnswer:function () {
        var answerId = $(".check").attr("v");
        if(answerId != undefined){
            if(answerId == Q.answerId){
                Q.qArray[Q.questionId].status = "1";
                Q.rightNums ++;
                $(".js-d1, .js-d2").each(function () {
                    var v = $(this).attr("v");
                    if(v == (Q.questionId+"")){
                        $(this).find(".d-r").html("答对");
                        if(_playing){
                            document.getElementById("music-suc").play();
                        }
                    }
                });
            }else{
                Q.qArray[Q.questionId].status = "-1";
                $(".js-d1, .js-d2").each(function () {
                    var v = $(this).attr("v");
                    if(v == (Q.questionId+"")){
                        $(this).find(".d-r").html("答错");
                        if(_playing) {
                            document.getElementById("music-fal").play();
                        }
                        Q.wrongNums ++;
                    }
                });
            }
            TIMER.Stop();
            $("#question").hide();
            if(Q.rightNums >= 3){
                Q.rightNums = 0;
                setTimeout(function () {
                    $("#suc").show();
                },500);
            }
            Q.isOpenAllQuestion();
            return true;
        }else{
            return false;
        }
    },
    InitDeng: function (type) {
        console.log(Q.num);
        var ele = {};
        if(type == 1){
            ele = $(".js-d1");
        }else{
            ele = $(".js-d2");
        }
        ele.each(function () {
            Q.GetDengAndQuestion();
            Q.qArray[Q.num].status = "0";
            console.log(Q.num);
            $(this).attr("v",Q.num);
            $(this).find("img").attr("src", _imgCdn+"/d-"+Q.dArray[Q.num].name+".png");
            $(this).find(".js-n1").html(Q.qArray[Q.num].notice);
            $(this).find(".d-r").html("");
            Q.num++;
        });
    },
    GetDengAndQuestion:function () {
        if(Q.num == 11){
            Q.num = 0;
        }
        if(Q.qArray[Q.num].status == "1"){
            Q.num++;
            return GetRandomNum();
        }
        return Q.num;
    },
    OpenQuestion:function (num) {
        if(Q.wrongNums >=3){
            $("#btn-light").show();
        }else{
            $("#btn-light").hide();
        }
        var question = Q.qArray[num];
        if(question.status != "0"){
            return;
        }
        $("#q-t").html(question.title);
        $("#q-n").html("("+question.notice+")");
        var t = 0;
        $(".js-a").each(function () {
            $(this).html(question.answerArray[t].title);
            t++;
        });
        TIMER.Start(function () {
            if(!Q.CheckAnswer()){
                Q.qArray[Q.questionId].status = "-1";
                $(".js-d1, .js-d2").each(function () {
                    var v = $(this).attr("v");
                    if(v == (Q.questionId+"")){
                        $(this).find(".d-r").html("答错");
                        if(_playing){
                            document.getElementById("music-fal").play();
                        }
                        Q.wrongNums ++;
                    }
                });
                $("#question").hide();
                Q.isOpenAllQuestion();
            }
        });
        $("#q-tms").html(TIMER.tms);
        $(".check").removeClass("check");
        Q.answerId = question.answerId;
        Q.questionId = num;
        Q.AddQuestionId(num);
        $("#question").show();
    },
    //随机题目
    RandomQuestion:function (num) {
        var t = _questionArray;
        var y = new Array();
        for(var i=0; i<num ; i++){
            var r = GetRandomNum(0, t.length-1);
            y.push(t[r]);
            t.remove(r);
        }
        return y;
    },
    RandomDeng:function (num) {
        var t = _dengArray;
        var y = new Array();
        for(var i=0; i<num ; i++){
            var r = GetRandomNum(0, t.length-1);
            y.push(t[r]);
            t.remove(r);
        }
        return y;
    }
}
Array.prototype.remove=function(dx){
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
}
function GetRandomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}
var _questionArray = [
    Question("1","七仙女嫁出去一个","打一成语" ,"C", [
        Answer("A", "六根清净"),
        Answer("B", "七窍生烟"),
        Answer("C", "六神无主")
    ]),
    Question("2","颠三倒四","打一字", "A", [
        Answer("A", "泪"),
        Answer("B", "田"),
        Answer("C", "沉")
    ]),
    Question("3","眼药水使用说明","打一成语", "B", [
        Answer("A", "滴水不漏"),
        Answer("B", "引人注目"),
        Answer("C", "引人入胜")
    ]),
    Question("4","新春佳节话元宵","打一报刊名", "A", [
        Answer("A", "半月谈"),
        Answer("B", "故事会"),
        Answer("C", "读者")
    ]),
    Question("5","一枝红杏出墙来","打一成语", "B", [
        Answer("A", "满园春色"),
        Answer("B", "对外开放"),
        Answer("C", "自挂东南枝")
    ]),
    Question("6","五句话","打一成语", "C", [
        Answer("A", "沉默寡言"),
        Answer("B", "呆若木鸡"),
        Answer("C", "三言两语")
    ]),
    Question("7","还不走，车来了","打一字", "A", [
        Answer("A", "连"),
        Answer("B", "嫑"),
        Answer("C", "辆")
    ]),
    Question("8","池塘亮底","打一字","B", [
        Answer("A", "感"),
        Answer("B", "汗"),
        Answer("C", "涸")
    ]),
    Question("9","半耕半读","打一字", "A", [
        Answer("A", "勤"),
        Answer("B", "讲"),
        Answer("C", "学")
    ]),
    Question("10","静候送礼人","打一成语", "A", [
        Answer("A", "待人接物"),
        Answer("B", "无节操"),
        Answer("C", "喜大普奔")
    ]),
    Question("11","扁担作字两头看 ","打一成语", "C", [
        Answer("A", "独树一帜"),
        Answer("B", "一模一样"),
        Answer("C", "始终如一")
    ]),
    Question("12","十八姑娘一枝花","打一成语", "A", [
        Answer("A", "成人之美"),
        Answer("B", "软萌妹纸"),
        Answer("C", "花容月貌")
    ]),
    Question("13","爱好旅游","打一成语", "C", [
        Answer("A", "周游列国"),
        Answer("B", "游山玩水"),
        Answer("C", "喜出望外")
    ]),
    Question("14","婚期定在元宵后","打一成语", "A", [
        Answer("A", "喜成连理"),
        Answer("B", "大喜过望"),
        Answer("C", "喜气生辉")
    ]),
    Question("15","开创爬山最高纪录","打一成语", "A", [
        Answer("A", "登峰造极"),
        Answer("B", "登高望远"),
        Answer("C", "你咋不上天呢？")
    ]),
    Question("16","TAXI都没生意","打一韩国明星", "C", [
        Answer("A", "金秀贤"),
        Answer("B", "宋仲基"),
        Answer("C", "车太贤")
    ]),
    Question("17","何处拾贝壳","打一中国电视剧名", "B", [
        Answer("A", "幻城"),
        Answer("B", "上海滩"),
        Answer("C", "老九门")
    ]),
    Question("18","武大郎盛情宴请好友","打一成语", "B", [
        Answer("A", "孤芳自赏"),
        Answer("B", "高朋满座"),
        Answer("C", "叨陪末座")
    ]),
    Question("19","打算明年生小孩","打一电影", "B", [
        Answer("A", "小鬼当家"),
        Answer("B", "宝贝计划"),
        Answer("C", "星际宝贝")
    ]),
    Question("20","大学食堂的粥","打一专辑名", "C", [
        Answer("A", "狠狠爱"),
        Answer("B", "中国火"),
        Answer("C", "范特西")
    ]),
    Question("21","懒惰的蜘蛛","打一成语", "B", [
        Answer("A", "闻鸡起舞"),
        Answer("B", "一丝不挂"),
        Answer("C", "虫鱼之学")
    ]),
    Question("22","屡试屡成","打一动物名", "A", [
        Answer("A", "百灵"),
        Answer("B", "博美"),
        Answer("C", "巴西龟")
    ]),
    Question("23","参观航空","打一《三国演义》人名", "B", [
        Answer("A", "赵云"),
        Answer("B", "张飞"),
        Answer("C", "王元姬")
    ]),
    Question("24","醒后得知一场梦","打一《西游记》人物", "A", [
        Answer("A", "悟空"),
        Answer("B", "白晶晶"),
        Answer("C", "金角大王")
    ]),
    Question("25","一头猪说：“加油啊”","打一食品", "C", [
        Answer("A", "薯片"),
        Answer("B", "蛋挞"),
        Answer("C", "朱古力")
    ]),
    Question("26","把玫瑰写成了百合","打一歌名", "A", [
        Answer("A", "花田错"),
        Answer("B", "La vie en rose"),
        Answer("C", "野百合也有春天")
    ]),
    Question("27","聊斋","打一歌名", "B", [
        Answer("A", "爱的供养"),
        Answer("B", "死了都要爱"),
        Answer("C", "逆战")
    ])
]
var _dengArray = [
    Deng("1", "apple"),
    Deng("2", "asus"),
    Deng("3", "honor"),
    Deng("4", "huawei"),
    Deng("5", "lenovo"),
    Deng("6", "meizu"),
    Deng("7", "nuoio"),
    Deng("8", "oppo"),
    Deng("9", "samsung"),
    Deng("10", "vivo"),
    Deng("11", "xiaomi")
]
function Question(id, title, notice, answerId, answerArray) {
    var obj = {
        id: id,
        title: title,
        notice : notice,
        answerId : answerId,
        answerArray: answerArray,
        status: 0
    }
    return obj;
}
function Answer(id, title) {
    var obj = {
        id: id,
        title :title
    }
    return obj;
}
function Deng(id, name) {
    var obj = {
        id: id,
        name :name
    }
    return obj;
}
var _playing = true;

var Shake = {
    Params: {
        direct: "", // 方向
        minshaketimes: 3, // 最小晃动次数
        shaketimes: 0, // 横竖屏切换次数
        isshake: false, // 是否晃动手机
        predate: null, // 上一次摇动的时间
        isstopListen: false, // 是否停止监听
        stoptimespan: 500, // 多少毫秒内不摇手机，视为停止，默认500ms
    },
    // 侦听手机摇一摇
    StartShakeListener: function () {
        // 启动侦听
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', deviceMotionHandler, false);
        } else {
            alert('本设备不支持devicemotion事件');
        }

        // 侦听
        function deviceMotionHandler(eventData) {
            if (Shake.Params.isstopListen) return;
            var acceleration = eventData.accelerationIncludingGravity,
                x, y, z;

            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            if ((Math.abs(y) < Math.abs(x) && Math.abs(y) <= 5 && Math.abs(x) >= 5) ||
                (Math.abs(y) < Math.abs(z) && Math.abs(y) <= 5 && Math.abs(z) >= 5)) {
                //"横屏";
                CheckShake(new Date(), "h");
            } else {
                //"竖屏"
                CheckShake(new Date(), "v");
            }
        }

        // 检查手机是否摇
        function CheckShake(d, curd) {
            if (Shake.Params.predate == null) {
                Shake.Params.predate = d;
            } else {
                if (Shake.Params.direct == curd) return;
                var secspan = d.getTime() - Shake.Params.predate.getTime();
                Shake.Params.predate = d;
                // 时间间隔大于
                if (secspan > 100 && secspan < Shake.Params.stoptimespan) {
                    Shake.Params.shaketimes++;
                    if (Shake.Params.shaketimes >= Shake.Params.minshaketimes) {
                        // 摇晃了手机
                        DeviceShake();
                        Shake.Params.isshake = true;
                        StopShakeHandler();
                    }
                }
            }
            Shake.Params.direct = curd;
        }

        // 摇晃手机停止设置
        function StopShakeHandler() {
            function StopCheck() {
                if (!Shake.Params.isshake) return false;
                var date = new Date();
                var timespan = date.getTime() - Shake.Params.predate.getTime();
                // 超过500ms算停止摇一摇
                if (timespan > Shake.Params.stoptimespan || Shake.Params.isstopListen) {
                    // 停止摇晃了
                    DeviceStopShake();
                    Shake.Params.isshake = false;
                    Shake.Params.shaketimes = 0;
                    Shake.Params.isstopListen = true;
                    return false;
                }
                setTimeout(function () {
                    StopCheck();
                }, Shake.Params.stoptimespan);
            }
            StopCheck();
        }
    },
    // 停止监听
    StopShakeListener: function () {
        Shake.Params.isstopListen = true;
    },
    // 重新监听
    RestartShakeListener: function () {
        Shake.Params.isstopListen = false;
    },
    // 设置停止的监听间隔
    SetStopTimespan: function (t) {
        Shake.Params.stoptimespan = t;
    }
}
// 停止晃动回调方法
function DeviceShake() {
    Shake.StopShakeListener();
    if(_playing){
        document.getElementById("music-bg").pause();
        _playing = false;
        $("#shake").hide();
    }else{
        document.getElementById("music-bg").play();
        _playing = true;
        $("#shake").show();
    }
    setTimeout(function () {
        Shake.RestartShakeListener();
    },1000);
}
// 晃动回调方法
function DeviceStopShake() {
    //alert("开始晃动");
}
