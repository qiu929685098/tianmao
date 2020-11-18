import './libray/jquery.js';
import './libray/jquery-banner.js';
import './libray/jquery.lazyload.min.js';

const baseurl = 'http://10.31.162.70:8888';
//轮播图
$(".swiper-container").carousel({
    width: 1230,
    height: 500,
    speed: 5000,
    needPrevAndNextBtnGroup: true,
    needPagination: true
});

//懒加载
$('.lazy').lazyload({
    effect: "fadeIn"
});

//天猫超市定时器
! function() {
    $('.mart-tab ul li').on('mouseover', function() {
        clearInterval(D1);
        $(this).addClass('active').siblings().removeClass('active');
        $('.tabs').eq($(this).index()).show().siblings('.tabs').hide();
    });
    $('.mart-tab ul li').on('mouseout', function() {
        D1 = window.setInterval(fn, 1000);
    });

    function fn() {
        $('.li1').toggleClass('active');
        $('.li2').toggleClass('active');
        $('.tabs').eq($('.mart-tab>ul>.active').index()).show().siblings('.tabs').hide();
    }
    let D1 = window.setInterval(fn, 1000);
}();

//顶部弹出框
! function() {
    $(window).on('scroll', function() {
        let top = $(document).scrollTop();
        if (top > 800) {
            $(".top-mask").slideDown(600);
        } else {
            $(".top-mask").slideUp(600);
        }
    })

}();

//侧边导航栏
! function() {
    //1、点击小图添加类名，并且大图开始运动
    $('.side-main a').on('click', function() {
        let top = $('.louceng').eq($(this).index()).offset().top
        $('html').animate({
            scrollTop: top
        }, 600);
    });
    //2、大图运动，给小图添加类名
    $(window).on('scroll', function() {
        let top = $(document).scrollTop();
        let index = Math.round(top / 700);
        $('.side-main a').eq(index).addClass('ho').siblings().removeClass('ho');
    });
    //3、运动隐藏显示导航栏
    $(window).on('scroll', function() {
        let top = $(document).scrollTop();
        if (top > 500) {
            $(".side").show(600);
        } else {
            $(".side").hide(600);
        }
    })
}();




//监听距离
$(window).on('scroll', function() {
    $('#timebox').html($(document).scrollTop().toFixed(1));
})

//渲染商品数据
! function() {
    $.ajax({
        type: "get",
        url: `${baseurl}/product/getProducts`,
        dataType: "json",
        success: function(res) {
            // 获得数据后进行字符串拼接
            console.log(res);
            let tempLi = '';
            res.forEach((elm, i) => {
                tempLi += `<li class="bg">
                <div class="box">
                    <a href="./detail.html?id=${elm.id}">
                        <img class="lazy " src="./images/loading.gif" data-original="${elm.url}" alt=" " >
                        <div class="title ">${elm.title}</div>
                        <span class="spice ">￥${elm.price}</span>
                    </a>
                </div>
                </li>
            `;
            });
            $('.listul').append(tempLi);

            $("img.lazy").lazyload({
                // threshold: 200, //图片距离200的时候加载
                effect: "fadeIn" //图片显示方式，淡入淡出
            });
        }
    });
}();