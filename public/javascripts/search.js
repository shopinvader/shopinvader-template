
$(document).ready(function() {

  var instantsearch_params = {
    // Replace with your own values
    appId: algolia_app_id,
    apiKey:  algolia_api_key, // search only API key, no ADMIN key
    indexName: algolia_products_index,
    numberLocale: 'fr-FR',
    urlSync: true,
    templatesConfig: {
       compileOptions: [{delimiters: '<% %>'}]
     }
  };

  if($('#search-result').attr('data-category') != undefined) {
    instantsearch_params.urlSync = false;
    if($('#search-result').attr('data-category')) {
      instantsearch_params.searchParameters = {
        hierarchicalFacetsRefinements: {
          'categories.id': [$('#search-result').attr('data-category')]
        }
      };
    }
  }

  var search = instantsearch(instantsearch_params);
  if(typeof(category_id) == 'undefined') {
  }
  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#header-search-input'
    })
  );
  search.addWidget(
    instantsearch.widgets.stats({
      container: '#search-stats'
    })
  );

  $('[data-filter-attr]').each(
  function(i, element){
    var element = $(element);
    var search_widget = {
      container: '[data-filter-id="' + element.data('filter-id')+ '"]',
      attributeName: element.data('filter-attr'),
      sortBy: ['isRefined', 'name:asc'],
      operator: 'or',
      templates: {
        header: '<h4>'+element.data('filter-name')+'</h4>'
      },
      showMore: {
        limit: 100
      },
      collapsible: {
        collapsed: false,
      },
      tooltips: false,
    };
    search.addWidget(instantsearch.widgets[element.data('filter-widget-type')](search_widget));
  });

  var product_item_css = $('#search-result .product-col').first().attr('class');
  var product_root_css = $('#search-result .row').first().attr('class');

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#search-result',
      hitsPerPage: 18,

      templates: {
        item: $('#product-hit-template').html()
      },
      cssClasses: {
        root: product_root_css,
        item: product_item_css,
        empty: ' text-center m-4 p-4 lead  d-block'
      },
      transformData: {
        item: function(item) {
          item.last_categorie = item.categories[item.categories.length-1];
          item.price = item.price[default_role];
          if(item.variant_count > 0) {
            item.varianted = true;
          }
          else {
            item.varianted = false;
          }
          return item;
        }
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#search-pagination',
      cssClasses: {
        root: 'pagination-block',
        link: 'btn btn-default '
      }
    })
  );

  search.templatesConfig.helpers.emphasis = function(text, render) {
    return '<em>' + render(text) + '</em>';
  };
  search.templatesConfig.helpers.currency = function(text, render) {
    var n = 0;
    if(typeof(render) != 'undefined') {
      n = new Number(render(text));
    }
    else {
      n = new Number(text);
    }
    return n.toLocaleString("fr-FR", {style: "currency", currency: "EUR"})
  };

  search.templatesConfig.helpers.imageDefault = function(text, render) {
    var url = render(text).trim();
    if(url != '') {
      return render(text);
    }
    else {

      return default_img_url;
    }
  };

  search.templatesConfig.helpers.ratingsStars = function(text, render) {
    var html = '';
    var value = parseInt(render(text));
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
  };

  search.start();
});
