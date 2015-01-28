(function($) {
    $.fn.waechter = function(config) {
        // Rewrite this
        var self = this;
        var defaults = {
            version: '0.0.2',
            algorithm: {
                shouldSort: true,
                threshold: 0.5,
                distance: 1000,
                keys: ['id']
            },
            items: [
                {
                    id: 'google', items: [],
                    fn: function() {
                        console.log('google');
                    }
                },
                {
                    id: 'bing', items: [],
                    fn: function() {
                        console.log('bing');
                    }
                },
            ]
        };

        config = jQuery.extend(defaults, config);

        $(self).append('<div class="wae-input"><input type="text" autofocus></div>');
        $(self).append('<div class="wae-items"><ul></ul></div>');

        var storage = {}, helper = {
            set: function(key, val) {
                 storage[key] = val;
                 return null;
            },
            get: function(key) {
                return storage[key];
            },
            element: function(key) {
                return $(self).find(storage[key]);
            },
            search: function(key, input, items, algorithm) {
                var fuse = new Fuse(items, algorithm);
                storage[key] = fuse.search(input);
                return storage[key].length;
            }
        }

        helper.set('el-input', 'div.wae-input input');
        helper.set('el-items', 'div.wae-items ul');

        helper.set('var-regexp', /^([a-z]+)\s+(.+)$/);
        helper.set('var-input-recent', '');

        helper.element('el-input').on('keyup', function(event) {

            var input = $(this).val();
            var input_recent = helper.get('var-input-recent');

            var key = event.which;
            var key_allowed = [9, 13, 17, 38, 40, 91];

            if(_.isEqual(input, input_recent) || _.contains(key_allowed, key)) return null;

            var input_regexp = input.match(helper.get('var-regexp'));

            if(input_regexp) {
                console.log('second search');
            } else {
                helper.search('var-fuse', input, config.items, config.algorithm);
                console.log('first search');
            }

            helper.element('el-items').html('');
            helper.set('var-is-selected', false);
            helper.set('var-eq-selected', 0);

            _.each(helper.get('var-fuse'), function(object) {
                helper.element('el-items').append('<li>' + object.id + '</li>');
            });

        });

        helper.element('el-input').on('keydown', function(event) {

            // TAB
             if (_.isEqual(event.which, 9)) {
                event.preventDefault();
            }

            // ENTER
             if (_.isEqual(event.which, 13)) {
                event.preventDefault();
            }

            // ARROWUP
             if (_.isEqual(event.which, 38)) {
                event.preventDefault();
            }

            // ARROWDOWN
             if (_.isEqual(event.which, 40)) {
                event.preventDefault();
            }

            // SUPER
             if (_.contains([17, 40], event.which)) {
                event.preventDefault();
            }

        });
    };
}(jQuery));


        //


       //  var fnHelper = {
       //      val: {},
       //      set: function(key, element) {
       //          this.val[key] = element;
       //          return;
       //      },
       //      get: function(key) {
       //          var element =  $(self).find(this.val[key]);
       //          return element;
       //      },
       //      clear: function(element) {
       //          $(self).find(element).html('');
       //          return element;
       //      },
       //      append: function(element, value) {
       //         $(self).find(element).append(value);
       //         return;
       //      },
       //      prepend: function(element, value) {
       //         $(self).find(element).prepend(value);
       //         return;
       //      },
       //      // visible: function(element) {
       //      //     var element =  $(self).find(element);
       //      //     if(element.css('display') == 'none') {
       //      //         return false;
       //      //     } else {
       //      //         return true;
       //      //     }
       //      // },
       //      // fadeIn: function(element, config) {
       //      //     var config = jQuery.extend({ delay: 0, fade: 400, slide: 400 }, config);
       //      //     var element = $(self).find(element);

       //      //     element.delay(config.delay).slideDown(
       //      //         { queue: false, duration: config.slide }
       //      //     ).animate(
       //      //         { opacity: 1 }, { queue: false, duration: config.fade }
       //      //     );
       //      //     return;
       //      // },
       //      // fadeOut: function(element, config) {
       //      //     var config = jQuery.extend({ delay: 0, fade: 400, slide: 400 }, config);
       //      //     var element = $(self).find(element);

       //      //     element.delay(config.delay).slideDown(
       //      //          { queue: true, duration: config.slide }
       //      //     ).animate(
       //      //         { opacity: 0 }, { queue: true, duration: config.fade }
       //      //     );
       //      //     return;
       //      // }
       //  };


       //  $(self).append('<div class="cn-input"><input type="text" autofocus></div>');
       //  $(self).append('<div class="cn-list"><ul></ul></div>');
       //  $(self).append('<div class="cn-message"><div class="cn-hidden"></div></div>');

       //  fnHelper.set('elementInput', 'div.cn-input input');
       //  fnHelper.set('elementList', 'div.cn-list ul');

       //  fnHelper.set('recentInput', '');
       //  fnHelper.set('recentResult', null);
       //  fnHelper.set('recentSelected', 0);


       //  var createList = function(input, list, config) {

       //      var fuse = new Fuse(list, config);
       //      var result = fuse.search(input);

       //      fnHelper.set('recentSelected', -1);
       //      fnHelper.set('recentLength', result.length);

       //      fnHelper.get('elementList').html('');

       //      _.each(result, function(obj, i) {
       //          fnHelper.append(fnHelper.val.elementList, '<li>' + obj.id + '</li>');
       //      });

       //      fnHelper.get('elementList').children().on('click', function() {
       //          var regexp = fnHelper.get('elementInput').val().match(/^([a-z]+)\s+(.+)$/);

       //          if(regexp) {
       //              fnHelper.get('elementInput').val(regexp[1] + ' ' + $(this).html());
       //          } else {
       //              fnHelper.get('elementInput').val($(this).html() + ' ');
       //          }
       //          fnHelper.get('elementList').html('');
       //      });

       //      return result;
       //  };


       //  fnHelper.get('elementInput').on('keyup', function(e) {

       //      if (!_.isEqual(e.which, 9) && !_.isEqual(e.which, 13) && !_.isEqual(e.which, 38) && !_.isEqual(e.which, 40) && !_.isEqual(e.which, 91) && !_.isEqual($(this).val(), fnHelper.val.recentInput)) {

       //          fnHelper.set('recentInput', $(this).val());

       //          var regexp = $(this).val().match();

       //          if(regexp) {
       //              createList(regexp[2], _.find(config.list, { id: regexp[1] }).list, { shouldSort: true, threshold: 0.3, distance: 1000, keys: ['id'] });
       //          } else {
       //              createList($(this).val(), config.list, { shouldSort: true, threshold: 0.3, distance: 1000, keys: ['id'] });
       //          }

       //      }

       //  });

       // fnHelper.get('elementInput').on('keydown', function(e) {
       //      // Event tab
       //      if (_.isEqual(e.which, 9)) {
       //          // Prevent default action
       //          e.preventDefault();

       //          var regexp = $(this).val().match(/^([a-z]+)\s+(.+)$/);
       //          // Clear list and set command
       //          var selected = fnHelper.val.recentSelected;
       //          if(selected < 0) selected = 0;
       //          if(fnHelper.get('elementList').children().eq(selected).length) {

       //              if(regexp) {
       //                  fnHelper.get('elementInput').val(regexp[1] + ' ' + fnHelper.get('elementList').children().eq(selected).html());
       //              } else {
       //                  fnHelper.get('elementInput').val(fnHelper.get('elementList').children().eq(selected).html() + ' ');
       //              }
       //              fnHelper.get('elementList').html('');
       //          }

       //      }
       //      // Event enter
       //      if (_.isEqual(e.which, 13)) {
       //          // Prevent default action
       //          e.preventDefault();
       //          fnHelper.get('elementList').html('');

       //          var regexp = $(this).val().match(/^([a-z]+)\s*(.+)?$/);
       //          var listItem = _.find(config.list, { id: regexp[1] });

       //          if(regexp && listItem) {
       //              if(!regexp[2]) regexp[2] = '';
       //              listItem.fn(regexp[2]);
       //          } else {
       //              console.log('error')
       //          }
       //      }
       //      // Event up
       //      if (_.isEqual(e.which, 38)) {
       //          // Prevent default action
       //          e.preventDefault();

       //          var regexp = $(this).val().match(/^([a-z]+)\s+(.+)$/);
       //          // Select upper element
       //          if(fnHelper.val.recentSelected) {
       //              fnHelper.get('elementList').children().eq(fnHelper.val.recentSelected).removeClass('selected');
       //              fnHelper.set('recentSelected', fnHelper.val.recentSelected - 1);
       //              fnHelper.get('elementList').children().eq(fnHelper.val.recentSelected).addClass('selected');

       //              if(regexp) {
       //                  fnHelper.get('elementInput').val(regexp[1] + ' ' + fnHelper.get('elementList').children().eq(fnHelper.val.recentSelected).html());
       //              } else {
       //                  fnHelper.get('elementInput').val(fnHelper.get('elementList').children().eq(fnHelper.val.recentSelected).html() + ' ');
       //              }

       //          }
       //      }
       //      // Event down
       //      if (_.isEqual(e.which, 40)) {
       //          // Prevent default action
       //          e.preventDefault();

       //          var regexp = $(this).val().match(/^([a-z]+)\s(.+)$/);
       //          // Select lower element
       //          if((fnHelper.val.recentLength - 1) > fnHelper.val.recentSelected) {
       //              fnHelper.get('elementList').children().eq(fnHelper.val.recentSelected).removeClass('selected');
       //              fnHelper.set('recentSelected', fnHelper.val.recentSelected + 1);
       //              fnHelper.get('elementList').children().eq(fnHelper.val.recentSelected).addClass('selected');

       //              if(regexp) {
       //                  fnHelper.get('elementInput').val(regexp[1] + ' ' + fnHelper.get('elementList').children().eq(fnHelper.val.recentSelected).html());
       //              } else {
       //                  fnHelper.get('elementInput').val(fnHelper.get('elementList').children().eq(fnHelper.val.recentSelected).html() + ' ');
       //              }

       //          }
       //      }

//     };

// }(jQuery));