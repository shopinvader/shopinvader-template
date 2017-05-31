$(document).ready(function () {
  cookie_alert.init();
  $('.carousel-multi-item .item').each(function(){
    var itemToClone = $(this);

    for (var i=1;i<4;i++) {
      itemToClone = itemToClone.next();

      // wrap around if at end of item collection
      if (!itemToClone.length) {
        itemToClone = $(this).siblings(':first');
      }

      // grab item, clone, add marker class, add to collection
      itemToClone.children(':first-child').clone()
        .addClass("cloneditem-"+(i))
        .appendTo($(this));
    }
  });
  $(document).on('ShopinvaderForm:before-submit',
    function ()
    {
      console.log('DISPLAY OVERLAY');
      $('body').wait_overlay('show');
    }
  );

  $(document).on('ShopinvaderForm:after-submit',
    function (event, element)
    {
      console.log('HIDE OVERLAY');
      $('body').wait_overlay('hide');
      console.log($(element.target));
      var new_document = $('<div></div>').append($.parseHTML(element.ajaxpage));

      if($(element.target).find('[name=action_method]').val() == 'post' && $(element.target).find('[name=action_proxy]').val() == 'cart/item') {
        console.log(new_document.find('#product-modal-add'));
        main_modal.show(
          new_document.find('#product-modal-add .title').html(),
          new_document.find('#product-modal-add .content').html(),
          ''
        );
      }
    }
  );
  $('.side-cart').slideReveal({
    trigger: $(".display-side-cart"),
    position: "right",
    width: "360px",
    push: false,
    zIndex: 800,
    show: function(sidecart){
      sidecart.addClass("left-shadow-overlay");
    },
    hidden: function(sidecart){
      sidecart.removeClass("left-shadow-overlay");
    }
  });

  /*cart*/
  $('body').on('change', '.product-qty input',
    function(event) {
      //$('form#'+$(this).data('form-submit')).submit();
    });
  $('body').on('click',".cart-items .delete",
    function() {
      $('form#'+$(this).data('form-submit')).submit();
    }
  );
  $('body').on('click', '.product-qty .input-group-addon[data-type]',
    function(event) {
      var input_qty = $('#'+$(this).attr('data-field'));
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

  /*common event*/
  $('body').on('click', '[data-link]',
      function(){
        if(typeof(Turbolinks) != 'undefined') {
          Turbolinks.visit($(this).attr('data-link'));
        }
        else {
          window.location=$(this).attr('data-link');
        }

      }
    );

  $('body').on('click', '[data-scrollto]',
    function(){
      console.log($(this).data('scrollto'));
      $('html, body').animate({
          scrollTop: $($(this).data('scrollto')).offset().top - $('.navbar-fixed-top').height()
      }, 1500);
    }
  );
});

(function ( $ ) {

    var template = '<div class="wait-overlay-section modal-backdrop fade in text-center text-danger"><i class="fa fa-spinner fa-pulse fa-5x  text-danger"></i></div>';

    $.fn.wait_overlay = function(action) {
      if ( action === "show") {
        $(template).appendTo(this);
      }
      else {
        this.find('.wait-overlay-section').remove();
      }
        return this;
    };
}( jQuery ));



var cookie_alert = {
  id: '.alert-cookie',
  init: function() {
    if(localStorage.getItem('accept_cookies') != "true") {
      $(cookie_alert.id).removeClass('hidden');
    }
    $(cookie_alert.id).find('.btn').click(
      function() {
        localStorage.setItem('accept_cookies', true);
      }
    );
  }
}

var main_modal = {
  id: 'main-modal',
  show: function(title, body, footer) {
    $('#'+main_modal.id+' .modal-body').html(body);
    if(typeof(footer) != 'undefined') {
      $('#'+main_modal.id+' .modal-footer').html(footer);
      $('#'+main_modal.id+' .modal-footer').removeClass('hidden');
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
