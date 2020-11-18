! function() {
    //比例思维：根据公式
    //大图/小图 = 大放/小放
    const scale = $('.scale');
    const spic = $('.spic');
    const sf = $('.sf');
    const bpic = $('.bpic');
    const bf = $('.bf');
    //1.spic添加鼠标移入移出事件，让对象小放和大放显示。
    spic.on('mouseover', function() {
        sf.css('visibility', 'visible');
        bf.css('visibility', 'visible');
        //2.重新获取小放的尺寸同时求得彼此放大的比例
        console.log(bpic.width());
        sf.width(spic.width() * bf.width() / bpic.width());
        sf.height(spic.height() * bf.height() / bpic.height());

        //3.放大的比例>1
        let bili = bpic.width() / spic.width();

        //4.spic添加鼠标移动
        spic.on('mousemove', function(ev) {


            var ev = ev || window.event;
            //限定范围
            let l = ev.clientX - scale.offsetLeft - sf.width() / 2;
            let t = ev.clientY - scale.offsetTop - sf.height() / 2;
            console.log(scale.offsetLeft);
            if (l <= 0) {
                l = 0;
            } else if (l >= spic.width() - sf.width() - 2) {
                l = spic.width() - sf.width() - 2;
            }

            if (t <= 0) {
                t = 0;
            } else if (t >= spic.height() - sf.height() - 2) {
                t = spic.height() - sf.height() - 2;
            }
            sf.css('left', `${l} + px`);
            sf.css('top', `${t} + px`);

            bpic.css('left', `${-l * bili} + px`);
            bpic.css('top', `${-t * bili} + px`);
        });
    });
    spic.on('mouseleave', function() {
        sf.css('visibility', 'hidden');
        bf.css('visibility', 'hidden');
    });
}();