$(function(){

    //Horizontal Scrolling of Divs When Div is Clicked

    $('html, body').animate({scrollLeft: $('.current')[0].offsetLeft}, 800);
    console.log($( window ).width());

    var index = 1, mar = 0;
    var childCount = $('.rightPanel-inner').children().length;
    var parentWidth = parseInt($('.rightPanel-inner').css("width"));

    $('.rightPanel-inner').on('click', '.next', function(){

        var current = $(this);
        var present = $(".current");
        var sidenavId = $(current).attr("id");

        var sideNavElement = $("a[href='#"+ sidenavId +"']")[0];
        var children = $(sideNavElement).children();

        $('.jspPane a span').removeClass("active");
        $(children[0]).addClass("active");

        var width = parseInt($(present).css("width"));
        mar += Math.ceil((100*width)/parentWidth);

        $(present).removeClass("current");
        $(current).removeClass("next");
        $(current).addClass("current");

        $('.rightPanel').animate({scrollLeft: current[0].offsetLeft}, 800);

        if(index != childCount){

            index++;
            var nextEl = $('.rightPanel-inner .box:nth-child('+(index+1)+')');
            $(nextEl).addClass("next");
        }
        else{

            var presentEl = $('.rightPanel-inner .box:nth-child(1)');
            $(presentEl).addClass("current");
            var nextEl = $('.rightPanel-inner .box:nth-child(2)');
            $(nextEl).addClass("next");
            index = 1;
        }
    });

    // Changing the active menu item on click and Scroll to desired Chapter on clicking element in SideNav

    $('.jspPane a').click(function(e){

        e.preventDefault();

        var curr = $(this);
        $('.jspPane a span').removeClass("active");
        var child = $(curr).children();
        $(child[0]).addClass("active");

        var href = $(curr).attr("href");
        var el = $(href + "");
        el = el[0];

        $('.box').removeClass("current");
        $('.box').removeClass("next");
        $(el).addClass("current");
        index = $(el).index() + 1;

        if($(el).next(".box").length != 0){

            var nextEl = $(el).next(".box");
            nextEl = nextEl[0];
            $(nextEl).addClass("next");
        }


        if($(window).width() <= 800)
            $('html, body').animate({scrollTop: $(el).offset().top}, 800);
        else{

            $('.rightPanel').animate({scrollLeft: el.offsetLeft}, 800);
        }
    })

    // Initialising PageLoader for Skills Page

    $('.chart').easyPieChart({

        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
        }
    });

    // Progress Bar For Skills Page

    progressBar(90, $('#progressBar'));
    progressBar(95, $('#progressBar2'));
    progressBar(87, $('#progressBar3'));

    // Responsive Menu

    var $menu = $('#menu1'),
    $menulink = $('.menu-link');
    $menulink.click(function () {
        $menulink.toggleClass('active');
        $menu.toggleClass('active');
        return false;
    });

    $('nav#menu1 a').click(function () {
        $('#menu1').removeClass('active');
    });

    //Keeping chapter in focus while resizing

    $(window).resizeend({

        onDragEnd : function(){

            $('.rightPanel').animate({scrollLeft: $('.current')[0].offsetLeft}, 800);
        },
        runOnStart : true
    });
});

