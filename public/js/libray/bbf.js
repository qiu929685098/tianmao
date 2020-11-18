(function() {
    let small = $('.spic'),
        big = $('.bf'),
        movebox = $('.sf'),
        img = $('.bpic');
    small.eq(_index).on('mouseover', function(ev) {
        let x, y;
        movebox.eq(_index).css({
            width: (small.eq(_index).width() * big.eq(_index).width() / img.eq(_index).width()) + 'px',
            height: (small.eq(_index).height() * big.eq(_index).height() / img.eq(_index).height()) + 'px'
        });
        movebox.eq(_index).removeClass('hide').addClass('show');
        big.eq(_index).removeClass('hide').addClass('show');
        small.eq(_index).on('mousemove', function(ev) {

            y = ev.pageY - small.eq(_index).offset().top - movebox.eq(_index).height() / 2;
            x = ev.pageX - small.eq(_index).offset().left - movebox.eq(_index).width() / 2;
            let ratio = img.eq(_index).width() / small.eq(_index).width();
            if (y < 0) { y = 0 } else if (y > small.eq(_index).height() - movebox.eq(_index).height()) { y = small.eq(_index).height() - movebox.eq(_index).height() }
            if (x < 0) { x = 0 } else if (x > small.eq(_index).width() - movebox.eq(_index).width()) { x = small.eq(_index).width() - movebox.eq(_index).width() }
            movebox.eq(_index).css({ 'top': y + 'px', 'left': x + 'px' });

            img.eq(_index).css({
                top: ratio * -y + 'px',
                left: ratio * -x + 'px'
            });
        });
        small.eq(_index).on('mouseout', function() {
            movebox.eq(_index).removeClass('show').addClass('hide');
            big.eq(_index).removeClass('show').addClass('hide');

        })
    });
})();