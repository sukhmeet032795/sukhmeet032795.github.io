(function($){
    $.resizeend = function(el, options){
        var base = this;

        base.$el = $(el);
        base.el = el;

        base.$el.data("resizeend", base);
        base.rtime = new Date(1, 1, 2000, 12,00,00);
        base.timeout = false;
        base.delta = 200;

        base.init = function(){
            base.options = $.extend({},$.resizeend.defaultOptions, options);

            if(base.options.runOnStart) base.options.onDragEnd();

            $(base.el).resize(function() {

                base.rtime = new Date();
                if (base.timeout === false) {
                    base.timeout = true;
                    setTimeout(base.resizeend, base.delta);
                }
            });

        };
        base.resizeend = function() {
            if (new Date() - base.rtime < base.delta) {
                setTimeout(base.resizeend, base.delta);
            } else {
                base.timeout = false;
                base.options.onDragEnd();
            }
        };

        base.init();
    };

    $.resizeend.defaultOptions = {
        onDragEnd : function() {},
        runOnStart : false
    };

    $.fn.resizeend = function(options){
        return this.each(function(){
            (new $.resizeend(this, options));
        });
    };

})(jQuery);