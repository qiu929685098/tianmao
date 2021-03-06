$.fn.extend({
    carousel: function a(d) {
        var c = this;
        d = $.extend($.fn.carousel.defaults, d);
        d.width = +d.width;
        d.height = +d.height;
        d.speed = +d.speed;
        d.needPrevAndNextBtnGroup = !!d.needPrevAndNextBtnGroup;
        d.needPagination = !!d.needPagination;
        var h = d,
            k = h.width,
            f = h.height,
            r = h.speed,
            j = h.needPrevAndNextBtnGroup,
            v = h.needPagination;
        c.css({ width: k, height: f });
        c.find(".swiper-item").css({ width: k });
        var e = null;
        var m = false;
        var o = {
            init: function q() {
                this.cloneItem();
                this.initBoxAndItem();
                this.initButtonGroup();
                this.initPagination()
            },
            cloneItem: function s() {
                var w = c.find(".swiper-item:not(:first-child)").clone().addClass("cloned");
                var x = c.find(".swiper-item:not(:last-child)").clone().addClass("cloned");
                c.find(".swiper-wrapper").prepend(w).append(x)
            },
            initBoxAndItem: function t() {
                var z = this;
                var x = $(".swiper-item");
                x.not(".cloned").eq(0).addClass("active");
                var w = $(".active").index();
                var y = x.length;
                c.find(".swiper-wrapper").css({ "width": y * k, "transform": "translate3d(".concat(-parseInt(w) * k, "px, 0, 0)") });
                setTimeout(function() { z.transitionToggle(true) }, 100);
                o.autoPlay()
            },
            initButtonGroup: function u() {
                if (j) {
                    $(".swiper-container").append('\n                            <div class="swiper-btn-group">\n                                <div class="swiper-btn-group_prev"></div>\n                                <div class="swiper-btn-group_next"></div>\n                            </div>\n                        ');
                    $(".swiper-btn-group_prev").unbind("click").bind("click", this.prev);
                    $(".swiper-btn-group_next").unbind("click").bind("click", this.next)
                }
            },
            prev: function g() {
                clearTimeout(m);
                m = setTimeout(function() {
                    clearInterval(e);
                    var A = o,
                        F = c.find(".swiper-item"),
                        B = F.length,
                        x = c.find(".active"),
                        y = x.index(),
                        E = c.find(".swiper-wrapper"),
                        z = $(".swiper-pagination-item"),
                        D = $(".swiper-pagination-item_active"),
                        w = D.index();
                    var C = (B + 2) / 3;
                    if (y !== 1) {
                        x.removeClass("active").prev().addClass("active");
                        E.css("transform", "translate3d(-".concat(k * --y, "px, 0px, 0px)"))
                    } else {
                        A.transitionToggle(false);
                        x.removeClass("active");
                        F.not(".cloned").eq(2).addClass("active");
                        var G = c.find(".active").index();
                        E.css("transform", "translate3d(-".concat(k * G, "px, 0px, 0px)"));
                        setTimeout(function() {
                            A.transitionToggle(true);
                            A.prev()
                        }, 100);
                        return false
                    }
                    if (!w) { z.removeClass("swiper-pagination-item_active").eq(C - 1).addClass("swiper-pagination-item_active") } else { D.removeClass("swiper-pagination-item_active").prev().addClass("swiper-pagination-item_active") }
                    A.autoPlay()
                }, 100)
            },
            next: function i() {
                clearTimeout(m);
                m = setTimeout(function() {
                    clearInterval(e);
                    var A = o,
                        F = c.find(".swiper-item"),
                        B = F.length,
                        x = c.find(".active"),
                        y = x.index(),
                        E = c.find(".swiper-wrapper"),
                        z = $(".swiper-pagination-item"),
                        D = $(".swiper-pagination-item_active"),
                        w = D.index();
                    var C = (B + 2) / 3;
                    if (y !== B - 2) {
                        x.removeClass("active").next().addClass("active");
                        E.css("transform", "translate3d(-".concat(k * ++y, "px, 0px, 0px)"))
                    } else {
                        A.transitionToggle(false);
                        x.removeClass("active");
                        F.not(".cloned").eq(C - 3).addClass("active");
                        var G = c.find(".active").index();
                        E.css("transform", "translate3d(-".concat(k * G, "px, 0px, 0px)"));
                        setTimeout(function() {
                            A.transitionToggle(true);
                            A.next()
                        }, 100);
                        return false
                    }
                    if (w !== C - 1) { D.removeClass("swiper-pagination-item_active").next().addClass("swiper-pagination-item_active") } else { z.removeClass("swiper-pagination-item_active").eq(0).addClass("swiper-pagination-item_active") }
                    A.autoPlay()
                }, 100)
            },
            initPagination: function b() {
                if (v) {
                    $(".swiper-container").append('<div class="swiper-pagination"></div>');
                    var y = $(".swiper-item").not(".cloned").length;
                    var x = "";
                    for (var w = 0; w < y; w++) { x += '<div class="swiper-pagination-item"></div>' }
                    $(".swiper-pagination").html(x).find(".swiper-pagination-item").eq(0).addClass("swiper-pagination-item_active")
                }
            },
            transitionToggle: function l(w) { if (w) { c.find(".swiper-wrapper").addClass("swiper-wrapper-transition") } else { c.find(".swiper-wrapper").removeClass("swiper-wrapper-transition") } },
            autoPlay: function p() { e = setInterval(function() { o.next() }, r) },
            handleSlide: function n() {
                var B = c.find(".swiper-wrapper");
                var x = window.navigator.appVersion;
                var z = 0;
                var A = 0;
                var w = false;
                var y = 0;
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(x)) {} else {
                    c.unbind("mousedown").bind("mousedown", function(D) {
                        var C = D.clientX;
                        z = C;
                        y = B.css("transform");
                        y = -y.split("-")[1].split(",")[0];
                        w = true
                    }).unbind("mousemove").bind("mousemove", function(F) {
                        var D = F.clientX;
                        if (w) {
                            clearInterval(e);
                            o.transitionToggle(false);
                            var E = D - z;
                            A = Math.abs(E);
                            var C = y + E;
                            B.css("transform", "translate3d(".concat(C, "px, 0px, 0px)"));
                            if (Math.abs(E) >= 150) {
                                w = false;
                                o.transitionToggle(true);
                                if (E > 0) { o.prev() } else { o.next() }
                            }
                        }
                    }).unbind("mouseup").bind("mouseup", function(D) {
                        var C = D.clientX;
                        w = false;
                        if (A < 150) {
                            o.transitionToggle(true);
                            B.css("transform", "translate3d(".concat(y, "px, 0px, 0px)"));
                            setTimeout(function() { o.autoPlay() }, 300)
                        }
                    })
                }
            }
        };
        o.init()
    }
});
$.fn.carousel.defaults = { width: 800, height: 300, speed: 3000, needPrevAndNextBtnGroup: true, needPagination: true };