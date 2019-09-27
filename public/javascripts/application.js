$(window).on('beforeunload', function(){
  $('main, footer').animate({
    opacity: 0,
  }, 300);
});
$(document).ready(function () {
  product_display.init();
  $('[data-toggle="product-list-display"]').on('click', function(){
    product_display.set_display($(this).data('value'));
  });
  $("[data-toggle=nav-sm-display]").click(function(){
    $($(this).data('target')).toggleClass('open-nav');
  });
  $('[data-toggle="change-currency"]').on('click', function(){
    var currency_code = $(this).data('value');
    if(currency_code != '') {
      Cookies.set('currency', currency_code);
      if($('#locomotive-section-page-search').length > 0) {
        location.reload();
      }
      else {
        $('.currency-list .currency-format').css('display', 'none');
        $('.currency-list .currency-format[data-currency='+currency_code+']').css('display', 'inline');
        $('#current_currency').html($(this).html());
        currencies.selected = currency_code;
      }
    }
  });
  $( ".product-thumbnail-img.loader img" ).load(function() {
    // Handler for .load() called.
    $(this).css('opacity', 1);
    $(this).parents('.loader').find('.loader-icon').delay('1s').remove();
  });

  $('.carousel-multi-item').on('slide.bs.carousel', function (e) {
      var $e = $(e.relatedTarget);
      var idx = $e.index();
      var itemsPerSlide = 4;
      var totalItems = $('.carousel-item').length;

      if (idx >= totalItems-(itemsPerSlide-1)) {
          var it = itemsPerSlide - (totalItems - idx);
          for (var i=0; i<it; i++) {
              // append slides to end
              if (e.direction=="left") {
                  $('.carousel-item').eq(i).appendTo('.carousel-inner');
              }
              else {
                  $('.carousel-item').eq(0).appendTo('.carousel-inner');
              }
          }
      }
  });
  $(".carousel").swipe({

    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

      if (direction == 'left') $(this).carousel('next');
      if (direction == 'right') $(this).carousel('prev');

    },
    allowPageScroll:"vertical"

  });

  $(document).on('ShopinvaderForm:after-error',
    function (element)
    {
      $('.main-loader').addClass('d-none');
      $('#generic-error-message').modal('show');
    }
  );

  $(document).on('ShopinvaderForm:before-submit',
    function (element)
    {
      $('.main-loader').removeClass('d-none');
    }
  );

  $(document).on('ShopinvaderForm:after-submit',
    function (event, element)
    {
      $('.main-loader').addClass('d-none');
      var new_document = $('<div></div>').append($.parseHTML(element.ajaxpage));
      if($(element.target).attr('action') == '/invader/cart/add_item') {
        main_modal.show(
          new_document.find('#product-modal-add .title').html(),
          new_document.find('#product-modal-add .content').html(),
          ''
        );
      }
    }
  );
  $('.rating, .rating-tooltip').hover(
    function (event, element)
    {
      $(this).find('.rating-tooltip').css('display', 'block');

    }, function(event, element)
    {
      $(this).find('.rating-tooltip').css('display', 'none');
    }
  );


  $('body').on('click',".cart-items .delete",
    function() {
      $('form#'+$(this).data('form-submit')).submit();
    }
  );

  $('body').on('change',"[data-autosubmit]",
    function() {
      $(this).parents('form').submit();
    }
  );
  $('[data-toggle=display-hover]').hover(
    function() {
      $($(this).attr('data-target')).css('display', 'block');
    },
    function() {
      $($(this).attr('data-target')).css('display', 'none');
    }
  );
  $('[data-toggle=display-hover]').hover(
    function() {
      $($(this).attr('data-target')).css('display', 'block');
    },
    function() {
      $($(this).attr('data-target')).css('display', 'none');
    }
  );
  $('.nav-header-controls-item').hover(
    function() {
      $('.nav-header-controls .header-controls-dropdown-content').hide();
      $(this).find('.header-controls-dropdown-content').slideDown(200);
    },
    function() {
      $(this).find('.header-controls-dropdown-content').delay('1500').slideUp(100);
    }
  );
  $('body').on('change', '.product-qty input',
    function(event) {
      var max_value = 100;
      var min_value = 1;
      /*Set custom max value*/
      if($(this).attr('max')) {
        max_value = $(this).attr('max');
      }
      /*Set custom min value*/
      if($(this).attr('min')) {
        min_value = $(this).attr('min');
      }
      var current_value = parseInt($(this).val())

      if(current_value > max_value) {
        current_value = max_value;
      }
      if(current_value < min_value) {
        current_value = min_value;
      }
      if(isNaN(current_value)) {
        current_value = min_value;
      }
      $(this).val(current_value);
      if($(this).parents('.cart-line-qty').length > 0) {
        /*Input in cart lines*/
        $(this).parents('form').submit();
      }
    }
  );
  $('body').on('click', '.product-qty [data-type]',
    function(event) {
      var input_qty = $(event.currentTarget).parent('.input-group').find('input.form-control');

      if(input_qty.length > 0) {
        var qty = input_qty.val();
        if($(this).attr('data-type') == 'minus') {
          qty--;
          if(qty < 1) {
            qty = 1;
          }
        }
        else {
          qty++;
        }
        input_qty.val(qty);
        input_qty.trigger('change');
      }
    }
  );

  $('body').on('submit', '#cart_address', function(event) {
    event.preventDefault();
    if($(this).find('#use_specific_address:checked').length == 0) {
      var shipping_addresss_id = $('input.input-shipping-address:checked').val();
      $('input.input-invoicing-address[value='+shipping_addresss_id+']').prop('checked', true);
    }
    $(this).get(0).submit();
  });

  /*common event*/
  $('body').on('click', '[data-link]',
    function(){
      window.location=$(this).attr('data-link');
    }
  );

  $('body').on('click', '[data-scrollto]',
    function(){
      $('html, body').animate({
          scrollTop: $($(this).data('scrollto')).offset().top - $('.navbar-fixed-top').height()
      }, 1500);
    }
  );

});

var main_modal = {
  id: 'main-modal',
  show: function(title, body, footer) {
    $('#'+main_modal.id+' .modal-body').html(body);
    if(typeof(footer) != 'undefined') {
      $('#'+main_modal.id+' .modal-footer').html(footer);
      $('#'+main_modal.id+' .modal-footer').removeClass('d-none');
    }
    $('#'+main_modal.id+' .modal-title').html(title);
    $('#'+main_modal.id).modal('show');
  },
  close: function() {

    $('#'+main_modal.id).modal('hide');
  },
  clear: function() {
    $('#'+main_modal.id+' .modal-body').html('');
    $('#'+main_modal.id+' .modal-footer').html('');
    $('#'+main_modal.id+' .modal-title').html('');
  }
};

function contact_recaptcha(event){
  $('.form-contact [type=submit]').attr('disabled', false);
}

class product_display {
  static init() {
    if(this.get_cookies() == null){
      this.set_cookies('list');
    }
    else {
      this.change_controls();
      if(product_display.get_cookies() != 'list') {
        //this.set_display();
      }
    }
  }
  static change_controls(){
    $('[data-toggle="product-list-display"]')
      .removeClass('btn-outline-primary')
      .addClass('btn-outline-dark');
    var display_mode = this.get_cookies();
    $('[data-toggle="product-list-display"][data-value="'+display_mode+'"]')
      .removeClass('btn-outline-dark')
      .addClass('btn-outline-primary');
  }
  static set_cookies(display){
    Cookies.set('product_display', display);
  }
  static get_cookies() {
    return Cookies.get('product_display');
  }
  static set_display(mode){
    if(mode != null) {
      product_display.set_cookies(mode);
    }
    else {
      var mode = product_display.get_cookies();
    }
    product_display.change_controls();
    var col_css ="";
    var $target = $('#search-result');
    $target.find('.product-col').removeClass (function (index, className) {
        return (className.match (/(^|\s)col-\S+/g) || []).join(' ');
    });
    if(mode  == 'list') {
      $target.find('.product-thumbnail')
        .removeClass('product-thumbnail-vertical')
        .addClass('product-thumbnail-horizontal');
      col_css = "col-12";
    } else {
      $target.find('.product-thumbnail')
        .removeClass('product-thumbnail-horizontal')
        .addClass('product-thumbnail-vertical');
      col_css = "col-12  col-sm-4 col-lg-3 col-xl-2";
    }
    $target.find('.product-col').addClass(col_css);
  }
}