(function($) {
    $.fn.codenav = function(options, lang) {

        // Rewrite this
        var self = this;

        // Set defaults
        var defaults = {
            "lang": "en",
            "name": "codenav",
            "version": "0.0.1",
            "list": "file:///D:/dev/codenav/list.json",
            "animation": {
                "console": {
                    "slidedown": 200,
                    "fadein": 200,
                    "fadeout": 400,
                },
                "message": {
                    "slidedown": 400,
                    "slideup": 800,
                    "fadein": 400,
                    "fadeout": 800,
                    "delay": 3000
                }
            },
            "commands": {
                "clear": {
                    "_fn": "fnClearExec()",
                    "regexp": /^(clear)$/,
                    "valid": null,
                    "exec": null
                },
                "version": {
                    "_fn": "fnVersionExec()",
                    "regexp": /^(version)$/,
                    "valid": null,
                    "exec": null
                },
                "help": {
                    "_fn": "fnHelpExec()",
                    "regexp": /^(help)$/,
                    "valid": null,
                    "exec": null
                },
                "echo": {
                    "_fn": "fnEchoExec(input)",
                    "regexp": /^(echo).*$/,
                    "valid": null,
                    "exec": null
                },
                "go": {
                    "_fn": "fnGoExec(input)",
                    "regexp": /^(go).*$/,
                    "valid": null,
                    "exec": null
                },
                "search": {
                    "_fn": "fnSearchExec(input)",
                    "regexp": /^(google|bing|npm|bower|jquery).*$/,
                    "valid": null,
                    "exec": null
                }
            }
        };

        // Define languages
        var lang = {
            // English
            "en": {
                "notfound": "the command \"{0}\" does not exist!",
                "empty": "at least one argument is needed!",
                "version": "version: {0}",
                "help": "these commands are available: {0}",
                "go_index": "these pages are available: {0}",
                "go_notfound": "the page \"{0}\" does not exist!"
            },
            // German
            "de": {
                "notfound": "Der Befehl \"{0}\" existiert nicht!",
                "empty": "Es wird mindestens ein Argument benötigt!",
                "version": "Version: {0}",
                "help": "Folgende Befehle sind verfügbar: {0}",
                "go_index": "Folgende Seiten sind verfügbar: {0}",
                "go_notfound": "Die Seite \"{0}\" existiert nicht!"
            }
        };

        // Combine defaults and options
        options = $.extend(defaults, options);

        // Run ajax request if list is string
        if(typeof options.list == 'string' && options.list.match(/^(http|https|file)\:\/\/.*$/)) $.ajax(
            { type: 'GET',  url: options.list }
        ).success(function(res) {
            options.list = JSON.parse(res);
        }).fail(function() {
            options.list = {};
        });

        // Helper to return text in the right language
        var helperLang = function(key, vals) {
            var string = lang[options.lang][key];
            _.each(vals, function(val, i) {
                string = string.replace('{' + i + '}', val);
            });
            return string;
        }

        // Helper to show a message
        var helperMessage = function(message) {
            // Insert message
            $(self).find('div.cn-message').html('<div class="cn-hidden">' + _.escape(message) + '</div>');
            // Animate slidedown and fadein
            $(self).find('div.cn-message').find('div').slideDown(
                { queue: true, duration: options.animation.message.slidedown}
            ).animate(
                { opacity: 1 },
                { queue: true, duration: options.animation.message.fadein }
            );
            // Animate slideup and fadeout with delay
            $(self).find('div.cn-message').find('div').delay(options.animation.message.delay).animate(
                { opacity: 0 },
                { queue: true, duration: options.animation.message.fadeout }
            ).slideUp(
                { queue: true, duration: options.animation.message.slideup}
            );
            return;
        };

        // Helper to put a message into console
        var helperConsole = function(message) {
            // Insert message
            $(self).find('div.cn-console').prepend('<div class="cn-hidden">' + message + '</div>');
            // Animate slidedown and fadein
            $(self).find('div.cn-console').find('div').slideDown(
                { queue: true, duration: options.animation.console.slidedown}
            ).animate(
                { opacity: 1 },
                { queue: true, duration: options.animation.console.fadein }
            );
            return;
        };

        // Function clear exec
        var fnClearExec = function() {
            // Animate fadeout
            $(self).find('div.cn-console').find('div').animate(
                { opacity: 0 },
                { queue: true, duration: options.animation.console.fadeout }
            );
            // Clear container after queue
             $(self).find('div.cn-console').find('div').queue(function() {
                 $(self).find('div.cn-console').html('');
             });
            return;
        };

        // Function version exec
        var fnVersionExec = function() {
            // Display name and current version
            helperConsole(
                helperLang('version', [options.version])
            );
            return;
        };

        // Function help exec
        var fnHelpExec = function() {
            // Display usable commands
            helperConsole(
                helperLang('help', [Object.keys(options.commands).join(', ')])
            );
            return;
        };

        // Function echo exec
        var fnEchoExec = function(input) {
            // Remove command
            query = _.escape(input.replace(/^(echo)\s*/, ''));
            // Write in console if input is given else send message
            if(query) helperConsole(query);
            else helperMessage(helperLang('empty'));
            return;
        };

        // Function go exec
        var fnGoExec = function(input) {
            // Strip input to query
            var query = input.replace(/^(go)\s*/, '');
            var success = null;
            // Return message if go is empty
            if(!query) {
                var tmp = [];
                _.each(options.list, function(item) {
                    tmp.push(item.id);
                });
                helperConsole(
                    helperLang('go_index', [tmp.join(', ')])
                );
                return;
            }
            // Check list for matches
            _.each(options.list, function(item) {
                if(query == item.id) {
                    window.location = item.url;
                    success = true;
                }
            });
            // Return if success
            if(success) return;
            // Return message if theres no match
            helperMessage(
                helperLang('go_notfound', [query])
            );
            return;
        };

        // Function search exec
        var fnSearchExec = function(input) {
            // Strip input to query
            var query = input.replace(/^(google|bing|npm|bower|jquery)\s?/, '');

            if(input.match(/^(google)/)) {
                window.location = 'https://www.google.de/search?q=' + encodeURI(query);
            }

            if(input.match(/^(bing)/)) {
                window.location = 'https://www.bing.com/search?q=' + encodeURI(query);
            }

            if(input.match(/^(npm)/)) {
                window.location = 'https://www.npmjs.com/search?q=' + encodeURI(query);
            }

            if(input.match(/^(bower)/)) {
                window.location = 'http://bower.io/search/?q=' + encodeURI(query);
            }

            if(input.match(/^(jquery)/)) {
                window.location = 'http://api.jquery.com/?s=' + encodeURI(query);
            }

            return;
        };

        // Create Input
        $(self).append('<div class="cn-input"></div>');
        $(self).find('div.cn-input').append('<label for="codenav">Input</label><input type="text" id="codenav" autofocus>');

        // Create message
        $(self).append('<div class="cn-message"></div>');

        // Create console
        $(self).append('<div class="cn-console"></div>');

        // Bind change
        $(self).find('#codenav').on('change', function() {

            var input = $(this).val();
            var success = null;

            _.each(options.commands, function(config, key) {
                if(!success && config.regexp.exec(input)) {
                    if(typeof config._fn == 'string') eval(config._fn);
                    if(typeof config._fn == 'function') config._fn(input);
                    success = true;
                }
            });

            $(this).val(null);

            if(success) return;

            helperMessage(helperLang('notfound', [input]));

        });
    };
}(jQuery));