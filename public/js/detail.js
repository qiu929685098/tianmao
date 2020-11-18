import './libray/jquery.js';
// import './libray/jquery-bf.js';
import { baseurl } from './libray/baseurl.js'; //引入公共的地址


//点击增减购买数量
! function() {
    let inval = $('.de2>input').attr('value');
    $('.b1').on('click', function() {
        inval++;
        $('.de2>input').attr('value', inval);
    });
    $('.b2').on('click', function() {
        inval--;
        if (inval < 0) {
            inval = 0;
        }
        $('.de2>input').attr('value', inval);
    });
}();

//点击获得商品id
! function() {
    let id = location.search.split('=')[1]; //获得地址栏中的id
    $('head>title').html(id);

    $.ajax({
        type: "get",
        url: `${baseurl}/product/getItem`,
        data: { id: id },
        dataType: "json",
        success: function(res) {
            res = res[0];
            console.log(res);
            //渲染商品标题
            let tle = `
                <h2>${res.title}</h2>
                <p>${res.title}</p>
            `;
            //渲染商品价格
            let pric = res.price + 30;
            let pri = `
                <p>
                    <span>价格</span>
                    <del>￥${pric} </del>
                </p>
                <p>
                    <span>促销价</span>
                    <del style="text-decoration: none;">￥${res.price}</del>
                    <em>品牌促销</em>
                </p>
            `;
            //渲染商品图片
            let picc = `
                <img src="${res.url}" alt="" >
                `;
            let bpicc = `
                <img src="${res.url}" alt="" class="bpic">
            `;
            //渲染商品库存
            let num = `
                <em>${res.sailnumber}</em>
            `;

            //添加商品标题
            $('.hd').append(tle);
            //添加商品价格
            $('.title').append(pri);
            //添加商品图片
            $('.spic').append(picc);
            $('.bf').append(bpicc);
            //渲染商品库存
            $('.sail').append(num);


            (function() {
                let small = $('.spic'),
                    big = $('.bf'),
                    movebox = $('.sf'),
                    img = $('.bpic');
                small.on('mouseover', function(ev) {

                    let x, y;
                    movebox.css({
                        width: (small.width() * big.width() / img.width()) + 'px',
                        height: (small.height() * big.height() / img.height()) + 'px'
                    });
                    movebox.removeClass('hide').addClass('show');
                    big.removeClass('hide').addClass('show');
                    small.on('mousemove', function(ev) {

                        y = ev.pageY - small.offset().top - movebox.height() / 2;
                        x = ev.pageX - small.offset().left - movebox.width() / 2;
                        let ratio = img.width() / small.width();
                        if (y < 0) { y = 0 } else if (y > small.height() - movebox.height()) { y = small.height() - movebox.height() }
                        if (x < 0) { x = 0 } else if (x > small.width() - movebox.width()) { x = small.width() - movebox.width() }
                        movebox.css({ 'top': y + 'px', 'left': x + 'px' });

                        img.css({
                            top: ratio * -y + 'px',
                            left: ratio * -x + 'px'
                        });
                    });
                    small.on('mouseout', function() {
                        movebox.removeClass('show').addClass('hide');
                        big.removeClass('show').addClass('hide');

                    })
                });
            })();
        }
    });

}();