$(document).ready(function() {
    $('div.codenav').codenav({
        "version": "0.0.1",
        "list": [
            {
                "id": "google",
                "list": [],
                fn: function(value) {
                    if(value) {
                        window.location = 'https://www.google.com/search?q=' + encodeURI(value);
                    } else {
                        window.location = 'https://www.google.com/'
                    }
                    return;
                }
            },
            {
                "id": "github",
                "list": [
                    { "id": "laravel", "url": "https://github.com/laravel/laravel" },
                    { "id": "october", "url": "https://github.com/octobercms/october" },
                    { "id": "jquery", "url": "https://github.com/jquery/jquery"},
                    { "id": "underscore", "url": "https://github.com/jashkenas/underscore" },
                    { "id": "angular", "url": "https://github.com/angular/angular" },
                    { "id": "backbone", "url": "https://github.com/jashkenas/backbone" },
                    { "id": "moment", "url": "https://github.com/moment/moment" },
                ],
                fn: function(value) {

                    if(value) {
                        var item = _.findWhere(this.list, { id: value });
                        if(item && item.url) {
                            window.location = item.url;
                        } else {
                            window.location = 'https://github.com/search?q=' + encodeURI(value);
                        }
                    } else {
                        window.location = 'https://github.com/'
                    }
                    return;
                }
            }
        ]
    });
});
