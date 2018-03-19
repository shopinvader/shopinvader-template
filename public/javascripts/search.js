
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
  console.log(instantsearch_params);

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
  var search = instantsearch({
     appId: instantsearch_params.appId,
     apiKey: instantsearch_params.apiKey,
     indexName: instantsearch_params.indexName,
     urlSync: true,
     templatesConfig: {
        compileOptions: [{delimiters: '<% %>'}]
      }
   });
  //var search = instantsearch(instantsearch_params);
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
  var page_hits_count = [];
  default_item = true;
  for(i=6; i <=48; i=i+6) {
    page_hits_count.push(
      {
        value:i,
        label: i+' '+$('#hits-per-page-selector').data('label'),
        default: default_item,
      }
    );
    default_item = false;
  }
  console.log(page_hits_count);
  search.addWidget(
    instantsearch.widgets.hitsPerPageSelector({
      container: '#hits-per-page-selector',
      autoHideContainer: false,
      items: page_hits_count,
      cssClasses: {
        select: " form-control"
      }
    })
  );



  search.addWidget(
    instantsearch.widgets.hierarchicalMenu({
      container: '#hierarchical-categories',
      attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2'],
      autoHideContainer: false,
      templates: {
        header: "<h4>Category</h4>",
      },
    })
  );

  var filters = [];

  filters.push({name:'hierarchicalCategories.lvl0', label: 'Categories'});
  search.addWidget(
    instantsearch.widgets.rangeSlider({
      container: '#filter-sliderprice',
      attributeName: 'price.default.value',
      autoHideContainer: false,
      templates: {
        header: "<h4>Price</h4>",
      },
      collapsible: {
        collapsed: false,
      },
      tooltips: {
        format(rawValue) {
          var number = new Number(rawValue);
          return number.toLocaleString(
            algolia_locale,
            {
              style: "currency",
              currency: algolia_currency
            }
          );
        }
      }
    })
  );
  filters.push({name:'price.default.value', label: 'Price'});

  search.addWidget(
    instantsearch.widgets.priceRanges({
      container: '#filter-rangeprice',
      attributeName: 'price.default.value',
      labels: {
        currency: '€ ',
        separator: '-',

      },
      autoHideContainer: false,
      cssClasses: {
        button: ' btn btn-sm btn-primary',
        input: ' form-control',
        form: ' input-group',
        label: ' text-dark small',


      }
    })
  );


  $('[data-filter-attr]').each(
  function(i, element){
    var $element = $(element);
    var search_widget = {
      container: '[data-filter-id="' + $element.data('filter-id')+ '"]',
      attributeName: $element.data('filter-attr'),
      sortBy: ['isRefined', 'name:asc'],
      operator: 'or',
      templates: {
        header: '<h4>'+$element.data('filter-name')+'</h4>'
      },
      showMore: {
        limit: 100
      },
      collapsible: {
        collapsed: false,
      },

      autoHideContainer: false,
    };
    search.addWidget(instantsearch.widgets[$element.data('filter-widget-type')](search_widget));
    filters.push({name: $element.data('filter-attr'), label: $element.data('filter-name')});
  });

  search.addWidget(
    instantsearch.widgets.currentRefinedValues({
      container: '#current-refined-values',
      clearAll: 'after',
      clearsQuery: true,
      attributes: filters,
      cssClasses: {

        count: ' d-none',
        clearAll: ' btn btn-primary btn-sm  d-inline-block',
      },
      autoHideContainer: false,
    })
  );

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
    return n.toLocaleString(algolia_locale, {style: "currency", currency: algolia_currency})
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
