import './libray/jquery.js';
import './libray/jquery.md5.js';
import cookie from './libray/cookie.js';

//遮罩层
! function() {
    $('.mask-btn').on('click', function() {
        $('.reg-top-mask').hide();
    });
}();


//板块一滑动块
! function() {
    //一、定义了一个获取元素的方法
    function getEle(selector) {
        return document.querySelector(selector);
    }
    //二、获取到需要用到的DOM元素
    var box = getEle(".block"), //容器
        bgColor = getEle(".block-bg"), //背景色
        txt = getEle(".block-txt"), //文本
        slider = getEle(".block-btn"), //滑块
        // icon = getEle(".slider>i"),
        successMoveDistance = box.offsetWidth - slider.offsetWidth, //解锁需要滑动的距离
        downX, //用于存放鼠标按下时的位置
        isSuccess = false; //是否解锁成功的标志，默认不成功

    //三、给滑块添加鼠标按下事件
    slider.onmousedown = mousedownHandler;

    //3.1鼠标按下事件的方法实现
    function mousedownHandler(e) {
        bgColor.style.transition = "";
        slider.style.transition = "";
        var e = e || window.event || e.which;
        downX = e.clientX;
        //在鼠标按下时，分别给鼠标添加移动和松开事件
        document.onmousemove = mousemoveHandler;
        document.onmouseup = mouseupHandler;
    };

    //四、定义一个获取鼠标当前需要移动多少距离的方法
    function getOffsetX(offset, min, max) {
        if (offset < min) {
            offset = min;
        } else if (offset > max) {
            offset = max;
        }
        return offset;
    }

    //3.1.1鼠标移动事件的方法实现
    function mousemoveHandler(e) {
        var e = e || window.event || e.which;
        var moveX = e.clientX;
        var offsetX = getOffsetX(moveX - downX, 0, successMoveDistance);
        bgColor.style.width = offsetX + "px";
        slider.style.left = offsetX + "px";

        if (offsetX == successMoveDistance) {
            success();
        }
        //如果不设置滑块滑动时会出现问题（目前还不知道为什么）
        e.preventDefault();
    };

    //3.1.2鼠标松开事件的方法实现
    function mouseupHandler(e) {
        if (!isSuccess) {
            bgColor.style.width = 0 + "px";
            slider.style.left = 0 + "px";
            bgColor.style.transition = "width 0.8s linear";
            slider.style.transition = "left 0.8s linear";
        }
        document.onmousemove = null;
        document.onmouseup = null;
    };

    //五、定义一个滑块解锁成功的方法
    function success() {
        isSuccess = true;
        txt.innerHTML = "验证成功";
        bgColor.style.backgroundColor = "#7ac23c";
        slider.className = "slider active";
        // icon.className = "iconfont iconchenggong";
        //滑动成功时，移除鼠标按下事件和鼠标移动事件
        slider.onmousedown = null;
        document.onmousemove = null;


        //六、解锁成功启用按钮
        $('.next').attr('disabled', false);
        $('.next').css('cursor', 'pointer');
        $('.next').css('background-color', 'rgba(255,0,54,.8)');
    };
    //七、验证手机号
    let telflag = false;
    $('.username').on('input', function() {
        if (this.value !== '') {
            var reg = /^1[345789]\d{9}$/;
            if (reg.test(this.value)) {
                $('.username-txt').html('✔');
                $('.username-txt').css('color,green');
                telflag = true;
            } else {
                $('.username-txt').html('❌手机号码格式不正确，请重新输入');
                $('.username-txt').css('color,red');
                telflag = false;
            }
        } else {
            $('.username-txt').html('❌请输入你的手机号码');
            $('.username-txt').css('color,red');
            telflag = false;
        }
    });

}();

//注册信息
$('#submit').on('click', function() {
    // 省略1万字的表单验证环节
    let password = $.md5($('[name=password]').val());
    $.ajax({
        type: "post",
        url: "http://10.31.162.70:8888/users/reg",
        data: {
            username: $('[name=username]').val(),
            password: password
        },
        dataType: "json",
        success: function(response) {
            alert('单身狗，去购物吧！')
            console.log(response);
        }
    });
});