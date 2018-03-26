(function($) {

    var ShopinvaderForm = function(link, options) {

        var $this = this;
        $.extend(this, $.fn, {
          init : function () {
            //$this.find('form[data-shopinvader-form]')
            link.on('submit','form[data-shopinvader-form]', $this.submit_form);
          },

          submit_form : function (event) {

            $this.target = $(event.target);
            $this.originalEvent = event;
            $this.trigger_before_submit_ajaxpage();
            var form = new FormData(event.target);
            $.ajax({
              "method": $this.target.attr('method'),
              "url": $this.target.attr('action'),
              "data": $(event.target).serialize(),
              "dataType": 'html',
              "success": function(ajaxpage) {
                $this.render_ajaxpage(ajaxpage);
                $this.trigger_after_submit_ajaxpage();
              }
            });

            event.preventDefault();
          },
          render_ajaxpage: function(ajaxpage) {
            $this.ajaxpage = ajaxpage;
            $(ajaxpage).find('[data-shopinvader-container]').each(function(index, element) {
              if(element.id) {
                $('#'+element.id+'[data-shopinvader-container]').replaceWith(element) ;
              }
            });

          },
          trigger_before_submit_ajaxpage : function () {
            $(document).trigger('ShopinvaderForm:before-submit', {target: $this.target, originalEvent: $this.originalEvent, ajaxpage: $this.ajaxpage} );
          },
          trigger_after_submit_ajaxpage : function () {
            $(document).trigger('ShopinvaderForm:after-submit', {target: $this.target, originalEvent: $this.originalEvent, ajaxpage: $this.ajaxpage} );
          }
      });

      this.init();
    };

    $.fn.ShopinvaderForm = function(opts) {
        new ShopinvaderForm(this, opts);
        return this;
    };

    $(document).ShopinvaderForm({});
})(jQuery);
