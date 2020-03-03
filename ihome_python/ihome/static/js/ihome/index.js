//模态框居中的控制
function centerModals(){
    $('.modal').each(function(i){   //遍历每一个模态框
        var $clone = $(this).clone().css('display', 'block').appendTo('body'); //克隆所有的当前的样式，并插入到 <body> 元素的结尾
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top-30);  //修正原先已经有的30个像素
    });
}

function setStartDate() {
    var startDate = $("#start-date-input").val();
    if (startDate) {
        $(".search-btn").attr("start-date", startDate);//在搜索框中赋予属性start-date
        $("#start-date-btn").html(startDate);
        $("#end-date").datepicker("destroy");
        $("#end-date-btn").html("离开日期");
        $("#end-date-input").val("");
        $(".search-btn").attr("end-date", "");
        $("#end-date").datepicker({
            language: "zh-CN",
            keyboardNavigation: false,
            startDate: startDate,
            format: "yyyy-mm-dd"
        });
        $("#end-date").on("changeDate", function() {
            $("#end-date-input").val(
                $(this).datepicker("getFormattedDate")
            );
        });
        $(".end-date").show();
    }
    $("#start-date-modal").modal("hide");
}

function setEndDate() {
    var endDate = $("#end-date-input").val();
    if (endDate) {
        $(".search-btn").attr("end-date", endDate);//在搜索框中赋予属性end-date
        $("#end-date-btn").html(endDate);//这个框的文本也展示
    }
    $("#end-date-modal").modal("hide");
}

function goToSearchPage(th) {
    var url = "/search.html?";
    url += ("aid=" + $(th).attr("area-id"));//在后面获取了，获取城区信息是局部请求
    url += "&";
    var areaName = $(th).attr("area-name");//在后面获取了
    if (undefined == areaName) areaName="";
    url += ("aname=" + areaName);
    url += "&";
    url += ("sd=" + $(th).attr("start-date"));//前面找出来了
    url += "&";
    url += ("ed=" + $(th).attr("end-date"));//前面找出来了
    location.href = url;//要跳转的页面
}

$(document).ready(function(){
    // 检查用户的登录状态
    $.get("/api/v1.0/session", function(resp) {
        if ("0" == resp.errno) {
            $(".top-bar>.user-info>.user-name").html(resp.data.name);//.user-name是找类对象
            $(".top-bar>.user-info").show();
        } else {
            $(".top-bar>.register-login").show();
        }
    }, "json");

    // 获取幻灯片要展示的房屋基本信息
    $.get("/api/v1.0/houses/index", function(resp){
        if ("0" == resp.errno) {
            $(".swiper-wrapper").html(template("swiper-houses-tmpl", {houses:resp.data}));

            // 设置幻灯片对象，开启幻灯片滚动
            var mySwiper = new Swiper ('.swiper-container', {
                loop: true,
                autoplay: 2000,
                autoplayDisableOnInteraction: false,
                pagination: '.swiper-pagination',
                paginationClickable: true
            });
        }
    });

    // 获取城区信息
    $.get("/api/v1.0/areas", function(resp){
        if ("0" == resp.errno) {
            $(".area-list").html(template("area-list-tmpl", {areas:resp.data}));

            $(".area-list a").click(function(e){
                $("#area-btn").html($(this).html());
                $(".search-btn").attr("area-id", $(this).attr("area-id"));
                $(".search-btn").attr("area-name", $(this).html());
                $("#area-modal").modal("hide");
            });
        }
    });
    $('.modal').on('show.bs.modal', centerModals);      //当模态框出现的时候
    $(window).on('resize', centerModals);               //当窗口大小变化的时候
    $("#start-date").datepicker({//#是找id，  .是找class
        language: "zh-CN",
        keyboardNavigation: false,
        startDate: "today",
        format: "yyyy-mm-dd"
    });
    $("#start-date").on("changeDate", function() {
        var date = $(this).datepicker("getFormattedDate");
        $("#start-date-input").val(date);
    });
})