(function($) {
    $.fn.codenav = function(options) {

        // Rewrite this
        var self = this;

        // Set defaults
        var defaults = {

        };

        // Function check input
        var checkValid = function(input) {
            var valid = false;
            _.each(options.allowed, function(command) {
                if (command == input) valid = true;
                // console.log('command: ' + command + ', input: ' + input);
            });
            return valid;
        };

        // Function show version
        var funcVersion = function() {
            $(self).find('div.cn-console').prepend('<div>Codenav version: ' + options.version + '</div>');
        };

        // Function to execute the command
        var funcExec = function(input) {
            switch(input) {
                case 'version':
                funcVersion();
                break;
                case 'help':
                console.log('help not defined!');
                break;
                case 'echo':
                console.log('echo not defined!');
                break;
                case 'goto':
                console.log('goto not defined!');
                break;

            }
        };

        // Function log input
        var logInput = function(input) {
            console.log('input: ' + input);
        };

        // Create Input
        $(self).append('<div class="cn-input"></div>');
        $(self).find('div.cn-input').append('<label for="codenav">Input</label><input type="text" id="codenav" />');

        // Create console
        $(self).append('<div class="cn-console"></div>');
        $(self).find('div.cn-console').prepend('Console ready!');

        // Bind change
        $(self).find('#codenav').on('change', function() {
            var input = $(this).val();
            var valid = checkValid(input);

            //
            if(valid) funcExec(input);
            // logInput(input);
            if(!valid) $(self).find('div.cn-console').prepend('<div>' + input + ' is a unknown command!</div>');

            $(this).val('');

        });
    };
}(jQuery));