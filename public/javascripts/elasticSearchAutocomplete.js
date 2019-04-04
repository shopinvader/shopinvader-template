$(document).ready(function() {

  const Menu = $(".header-dropdown-menu");

  function setupSuggestionSpan(){
    Menu.html("");
    FillFromTemplate($(".header-dropdown-menu"),"header-search-hit-content");
    FillFromTemplate($(".aa-dataset-product"),"header-search-product-title");
    FillFromTemplate($(".aa-dataset-product"),"header-search-product-empty");
    FillFromTemplate($(".aa-dataset-category"),"header-search-category-title");
    FillFromTemplate($(".aa-dataset-category"),"header-search-category-empty");
  }
  setupSuggestionSpan();

  //for tempaltes
  function FillFromTemplate(target,templateName){
    var res = $('#'+templateName).html();
    target.append(res);
  }
  function hogan_render(text, data) {
    return Hogan
    .compile(text.replace('<%', '{{').replace('%>', '}}'))
    .render(data);
  }
  var hogan_helpers = {
    "emphasis": function() {
      return function(text, render) {
        if(typeof(renders) == 'function') {
          var value = parseInt(render(text));
        }
        else {
          var value = parseInt(hogan_render(text, this));
        }
        return '<em>' + value + '</em>';
      }
    },
    "currency": function() {
      return function(text, render) {
        var n = 0;
        if(typeof(render) != 'undefined') {
          var value = render(text).trim();
          n = new Number(value);
        }
        else if (typeof(hogan_render) != 'undefined') {
          n = new Number(hogan_render(text, this));
        }
        else {
          var text = text.trim();
          if(isNaN(text)) {
            return text;
          }
          else {
            n = new Number(text);
          }
        }
        n*= elasticsearch_params.currency_rate;
        return n.toLocaleString(
          elasticsearch_params.locale_code,
          {
            style: "currency",
            currency: elasticsearch_params.currency_code,
          }
        )
      }
    },
    "imageDefault": function() {
      return function(text, render) {

        if(typeof(render) == 'function') {
          var url = render(text).trim();
        }
        else {
          var url = hogan_render(text, this).trim();
        }

        if(url != '') {
          return url;
        }
        else {
          return default_img_url;
        }
      }
    },
    "ratingsStars": function() {
      return function(text, render) {
        var html = '';
        if(typeof(render) == 'function') {
          var value = parseInt(render(text));
        }
        else {
          var value = parseInt(hogan_render(text, this));
        }
        if(isNaN(value)) {
          return '&nbsp;';
        }
        var n = 1;
        for(n; n <= 5; n++){
          if(n <= value) {
            html += '<i class="fas fa-star" aria-hidden="true"></i>';
          }
          else {
            html += '<i class="far fa-star" aria-hidden="true"></i>';
          }
        }
        return '<div class="rating">'+html+'</div>';
      }
    }
  }

  const elasticServer = 'http://'+elasticsearch_params.server_IP+':'+elasticsearch_params.server_Port+'/';
  // +'demo_elasticsearch_backend_shopinvader_variant_en_us/_search';
  const product_index = elasticsearch_params.products_index;
  const category_index = elasticsearch_params.categories_index;

  function search(index,searchQuery,filter){

    var searchHost = elasticServer+index+'/_search';
    var body = {
      'size': 4
    };
    // Check if the search string or the filter were entered.
    if ((searchQuery.length !== 0) && ((typeof filter !== 'undefined') || (filter.length !== 0))) {
      var query = {
        'bool': {}
      };
      if (searchQuery.length !== 0) {
        query.bool.must = {
          'multi_match': {
            'query': searchQuery,
            'fields': [ 'name' ],
            'fuzziness': 'AUTO'
          }
        };
      }
      if ((typeof filter !== 'undefined') && (filter.length !== 0)) {
        query.bool.filter = {
          'analyzer': {
            filter
          }
        };
      }
      body.query = query;
    }
    // Perform the request.
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', searchHost, false);
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlHttp.send(JSON.stringify(body));
    var response = JSON.parse(xmlHttp.responseText);
    return response;
  }


  $("#header-search-input").autocomplete(
    {
      nbrOfProducts:0,
      searchQuery:"",
      minLength:3,
      source: function(request,response){
        searchQuery=request.term;
        //PRODUCT SEARCH
        //emptys product display on autocomplete for new search
        $(".aa-dataset-product").html("");
        FillFromTemplate($(".aa-dataset-product"),"header-search-product-title");
        res = search(product_index,request.term,'');
        result=[];
        nbrOfProducts=res.hits.hits.length;
        //shows number of results of products if nbResults>0
        if(nbrOfProducts>0)
        $(".nb_hits").html("("+res.hits.total+")");
        else
        $(".nb_hits").html("");

        for (var i = 0; i < nbrOfProducts; i++) {
          result[i] = res.hits.hits[i]._source;
          result[i].type="product";
        };

        //CATEGORY SEARCH
        //emptys categor display on autocomplete for new search
        $(".aa-dataset-category").html("");
        FillFromTemplate($(".aa-dataset-category"),"header-search-category-title");

        resCategory = search(category_index,request.term,'');
        resultCategory=[];

        for (var i = 0; i < resCategory.hits.hits.length; i++) {
          resultCategory[i] = resCategory.hits.hits[i]._source;
          resultCategory[i].type="category";
        };
        //sends a array containing both results
        response(result.concat(resultCategory));
      },
      //removes autosuggestion messages
      messages: {
        noResults: '',
        results: function() {}
      },
      response: function(event, ui){
        var existCategory=false;
        var existProduct=false;
        //checking if categories and products are in the array
        for (var i = 0;!existCategory|!existProduct && i < ui.content.length; i++) {
          if(ui.content[i].type==="product"){
            existProduct=true;
          }else{
            existCategory=true;
          }
        };

        //if one of them isn't in the array display a 'no results found' message
        if (!existProduct) {
          FillFromTemplate($(".aa-dataset-product"),"header-search-product-empty");
        }
        if (!existCategory) {
          FillFromTemplate($(".aa-dataset-category"),"header-search-category-empty");
        }
      },
      create: function( event, ui ) {
        //changes default "rendermenu"
        $(this).data("uiAutocomplete")._renderMenu = function(ul, items) {
          var that = this;
          $.each( items, function( index, item ) {
            that._renderItemData( ul, item );
          });

          //add button "view all result" at the end of autocomplete
          if(nbrOfProducts > 1) {
            template=$('#header-search-product-link');
            var search_path = template.find('.btn-search-product').data('href');
            template.find('.btn-search-product').attr('href', search_path+'?q='+searchQuery)
            template.find('.nb_hits').html(' ('+res.hits.total+')');
            $(".aa-dataset-product").append(template.html());
          }
        }


        //changes default "renderItem" to add them to our custom autocomplete div
        $(this).data("uiAutocomplete")._renderItem = function(ul, item) {
          if(item.type==="product"){
            item.last_categorie = item.categories[item.categories.length-1];
            item.price = item.price[default_role];
            var template = Hogan.compile($('#product-hit-template').html());
            item.helpers = hogan_helpers;
            var res = template.render(item);
            return $("<div class=\"aa- product-search-list\"></div>")
            .append( res )
            .appendTo(".aa-dataset-product");
          }else{
            var template = Hogan.compile($('#category-hit-template').html());
            item.helpers = hogan_helpers;
            var res = template.render(item)
            return $("<div class=\"aa- category-search-list\"></div>")
            .append( res )
            .appendTo(".aa-dataset-category");
          }
        }
      },
      open: function( event, ui ) {
        Menu.css("display","block");
      }
    }
  );

  $('body').click(function(element){
    console.log(element);
    if($(element.target).parents('.input-group').length == 0) {
      Menu.css("display","none");
    }
  });
});
