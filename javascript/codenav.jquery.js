(function($) {
    $.fn.codenav = function(config, lang) {

        // Rewrite this
        var self = this;

        // Set defaults
        var defaults = {
            "lang": "en",
            "name": "codenav",
            "version": "0.0.1",
            "list": [
                {
                    "id": "google",
                    fn: function(value) {
                        window.location = 'https://www.google.de/search?q=' + encodeURI(value);
                        return;
                    }
                },
                {
                    "id": "bing",
                    fn: function(value) {
                        window.location = 'https://www.bing.com/search?q=' + encodeURI(value);
                        return;
                    }
                },
            ]
        };

        // Combine defaults and config
        config = jQuery.extend(defaults, config);

        var fnHelper = {
            clear: function(element) {
               $(self).find(element).html(null);
               return;
            },
            fadeIn: function(element, config) {
                var config = jQuery.extend({delay: 0, fade: 400, slide: 400}, config);
                var element = $(self).find(element);
                element.delay(config.delay).slideDown(
                    {queue: true, duration: config.slide}
                ).animate(
                    {opacity: 1}, {queue: true, duration: config.fade}
                );
                return;
            },
            fadeOut: function(element, config) {
                var config = jQuery.extend({delay: 0, fade: 400, slide: 400}, config);
                var element = $(self).find(element);
                element.delay(config.delay).animate(
                    {opacity: 0}, {queue: true, duration: config.fade}
                ).slideUp(
                    {queue: true, duration: config.slide}
                );
                return;
            }


        }

        // Helper to show a message
        var helperMessage = function(message) {
            // Insert message
            $(self).find('div.cn-message').html('<div class="cn-hidden">' + _.escape(message) + '</div>');
            // Animate slidedown and fadein
            $(self).find('div.cn-message').find('div').slideDown(
                { queue: true, duration: config.animation.message.slidedown}
            ).animate(
                { opacity: 1 },
                { queue: true, duration: config.animation.message.fadein }
            );
            // Animate slideup and fadeout with delay
            $(self).find('div.cn-message').find('div').delay(config.animation.message.delay).animate(
                { opacity: 0 },
                { queue: true, duration: config.animation.message.fadeout }
            ).slideUp(
                { queue: true, duration: config.animation.message.slideup}
            );
            return;
        };

        // Helper to put a message into console
        var helperConsole = function(message) {
            // Insert message
            $(self).find('div.cn-console').prepend('<div class="cn-hidden">' + message + '</div>');
            // Animate slidedown and fadein
            $(self).find('div.cn-console').find('div').slideDown(
                { queue: true, duration: config.animation.console.slidedown}
            ).animate(
                { opacity: 1 },
                { queue: true, duration: config.animation.console.fadein }
            );
            return;
        };

        // Create Input
        $(self).append('<div class="cn-input"><input type="text" id="codenav" autofocus></div>');

        // Create Command
        $(self).append('<div class="cn-items"><ul></ul></div>');

        // Create message
        $(self).append('<div class="cn-message"><div class="cn-hidden">aasds</div></div>');

        // Create console
        $(self).append('<div class="cn-console"></div>');

        fnHelper.fadeOut('.cn-console');
        fnHelper.fadeIn('.cn-message div');
        fnHelper.fadeOut('.cn-message div', {delay: 3000});

        // Bind change
        $(self).find('#codenav').on('change', function() {
            $('div.cn-items ul').html('');
            $(this).val($(this).val() + ' ');
            console.log($(this).val());
        });

        $(self).find('#codenav').on('keydown', function(e) {
            var keyCode = e.keyCode || e.which;

            if (keyCode == 9) {
                e.preventDefault();

                $('div.cn-input input').val($('div.cn-items ul li').eq(0).html()).change();
            }
        });

        var keyuprecent = '';

        $(self).find('#codenav').on('keyup', function() {
            // define keyupinput
            var keyupinput = $(this).val();
            // Fire just once per keypress
            if(keyuprecent == keyupinput) return;  keyuprecent = keyupinput;
            // Clean list
            $('div.cn-items ul').html('');
            // Create fuse object
            var fuse = new Fuse(config.cmd, { threshold: 0.4, keys: ["id"] });

            _.each(fuse.search(keyupinput), function(obj, i) {
                 $('div.cn-items ul').append('<li>' + obj.id + '</li>');
            });

            $('div.cn-items ul li').on('click', function() {
                $('div.cn-input input').val($(this).html()).change();
            });

        });
    };
}(jQuery));