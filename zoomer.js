;(function($) {
    $.fn.extend({
        zoomer: function( options ) {

            var containerWidth  = options.container.width()  || $(window).width();
            var containerHeight = options.container.height() || $(window).height();
            var containerOffset = options.container.offset() || $(window).offset();

            return this.each(function() {
                var self       = this;
                var $self      = $(this);
                $self.maxed    = false;
                var offset     = $self.offset();
                var properties = {
                    width    : $self.width(),
                    height   : $self.height(),
                    position : $self.css('position'),
                    left     : offset.left - containerOffset.left,
                    top      : offset.top - containerOffset.top
                }
                $self.bind('click', {target: $self, defaults: properties, width: containerWidth, height: containerHeight, containerOffset: containerOffset}, $.handleClick);
            })
        }
    });
    $.handleClick = function(event) {
        var target          = event.data.target;
        var properties      = event.data.defaults;
        var maxed           = event.data.target.maxed;
        var containerOffset = event.data.containerOffset;
        var parentOffset    = target.parent().offset();
        target.maxed        = !maxed;
        if(!maxed) {
            var dummyCss        = target.css(['width', 'height', 'position'])
            var dummy           = $('<div class="dummy"></div>').addClass(target.attr('class')).css(dummyCss).insertAfter(target);
            target.css({
                position: 'absolute',
                left    : properties.left,
                top     : properties.top
            });
            target.stop().animate({
                width : event.data.width - 6,
                left  : 0,
                top   : -parentOffset.top + containerOffset.top,    
                height: event.data.height - 6
            }, 250);
        } else {
            target.stop().animate({
                width : properties.width,
                left  : properties.left,
                top   : properties.top,
                height: properties.height
            }, 250, function() {
                $('.dummy').remove();
                target.css({
                    position: '',
                    left    : '',
                    top     : ''
                });
            });
        }
    }
})(jQuery)