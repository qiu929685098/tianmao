import './libray/jquery.js';
import './libray/jquery-bf.js';
//放大镜
$("#small").imgzoom({ times: "1" });
//放大镜tab切换
// ! function() {

//     $('.de-l>ul>li>img').on('mouseover', function() {
//         let img1 = $(this).attr('src');
//         let img2 = $('#small>img').attr('src');
//         img2 = img1;
//         $('#small>img').attr('src', 'img2');
//         console.log(img1);
//         console.log(img2);
//     });
// }();

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