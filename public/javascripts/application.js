$(document).ready(function () {

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
      $('.main-loader').removeClass('d-none');
    }
  );

  $(document).on('ShopinvaderForm:after-submit',
    function (event, element)
    {
      console.log('HIDE OVERLAY');
      $('.main-loader').addClass('d-none');
      console.log($(element.target));
      var new_document = $('<div></div>').append($.parseHTML(element.ajaxpage));

      if($(element.target).find('[name=action_method]').val() == 'post' && $(element.target).find('[name=action_proxy]').val() == 'cart/item') {
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
      console.log(event);
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


  /*cart*/
  $('body').on('change', '.cart-line-qty .product-qty input',
    function(event) {
      var form = $(event.currentTarget).parents('form');
      console.log($(event.currentTarget));
      $(event.currentTarget).parents('form').submit();
    }
  );

  $('body').on('click', '.product-qty .input-group-addon[data-type]',
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

  /*common event*/
  $('body').on('click', '[data-link]',
      function(){
        window.location=$(this).attr('data-link');
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
