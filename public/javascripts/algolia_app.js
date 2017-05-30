$(document).ready(function() {

  var client = algoliasearch(algolia_app_id, algolia_api_key);
  var product_index = client.initIndex(algolia_products_index);
  var category_index = client.initIndex(algolia_categories_index);
  autocomplete('#header-search-input',
    {
      debug: true,
      dropdownMenuContainer: '#header-search-hit-dropdown',
      templates: {
        dropdownMenu: $('#header-search-hit-content').html()
      },
      cssClasses: {
        "dropdownMenu": "dropdown-menu header-dropdown-menu container"
      }
    },
    [
      {
        source: autocomplete.sources.hits(product_index, { hitsPerPage: 4 }),
        displayKey: 'name',
        name: 'product',
        cssClasses: {
          suggestions:"product-list",
          suggestion: " col-xs-12 product-compact",
        },
        templates: {
          header: function(query, result) {
            return search_template_title($('#header-search-product-title'), result)
                  +"<div class='row row-same-height'>";
          },
          footer:  function(query, result) {
            return "</div>"
                  + search_template_link($('#header-search-product-link'), query, result);
          },
          empty: $('#header-search-product-empty').html(),
          suggestions: function(suggestions) {
            return "<div></div>";

          },
          suggestion: function(suggestion) {
            var template = Hogan.compile($('#product-hit-template').html());
            suggestion.helpers = hogan_helpers;
            return template.render(suggestion)
          }
        }
      },
      {
        source: autocomplete.sources.hits(category_index, {hitsPerPage: 4}),
        displayKey: 'name',
        name: 'category',
        cssClasses: {
          suggestions:" row-fluid",
          suggestion: " col-xs-12",
        },
        templates: {
          header: function(query, result){
            return search_template_title($('#header-search-category-title'), result);
          },
          empty: $('#header-search-category-empty').html(),
          suggestion: function(suggestion) {
            var template = Hogan.compile($('#category-hit-template').html());
            suggestion.helpers = hogan_helpers;
            return template.render(suggestion)
          }
        }
      }
    ]
  );
});

var hogan_helpers = {
  "currency": function() {
    return function(text, render) {
      //var n = new Number(renders(text));
      if(typeof(renders) == 'function') {
        var value = render(text);
      }
      else {
        var value = hogan_render(text, this);
      }
      var n = new Number(value  );
      return n.toLocaleString("fr-FR", {style: "currency", currency: "EUR"})
    }
  },
  "ratingsStars": function() {
    return function(text, render) {

      if(typeof(renders) == 'function') {
        var value = parseInt(render(text));
      }
      else {
        var value = parseInt(hogan_render(text, this));
      }
      if(isNaN(value)) {
        return '&nbsp;';
      }
      var html = '';
      var n = 1;
      for(n; n <= 5; n++){
        if(n <= value) {
          html += '<i class="fa fa-star" aria-hidden="true"></i>';
        }
        else {
          html += '<i class="fa fa-star-o" aria-hidden="true"></i>';
        }
      }
      return html;
    }
  },
  "imageDefault": function() {
    return function(text, render) {

      console.log(default_img_url);
      if(typeof(renders) == 'function') {
        var value = render(text);
      }
      else {
        var value = hogan_render(text, this);
      }

      var url = value.trim();
      if(url != '') {
        return value;
      }
      else {

        return
        default_img_url;
      }
    }
  }
}


function search_template_link(template, query, result) {
  if(result.nbHits > 1) {
    var search_path = template.find('.btn-search-product').data('href');
    console.log( template.find('.btn-search-product'));
    template.find('.btn-search-product').attr('href', search_path+'?q='+query.query)
    template.find('.nb_hits').html(' ('+result.nbHits+')');
    return template.html();
  }
  else {
    return "";
  }
}

function search_template_title(template, result) {
  if(result.nbHits > 0) {
    template.find('.nb_hits').html(' ('+result.nbHits+')');
  }
  else {
    template.find('.nb_hits').html('');
  }

  return template.html();
}

function hogan_render(text, data) {
  return Hogan
          .compile(text.replace('<%', '{{').replace('%>', '}}'))
          .render(data);
}
