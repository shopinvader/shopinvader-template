
class FacetingSearch {

  constructor(params) {
    if(params != null) {

      this.widgets = [];
      this.filters = [];
      this.hit_widget = null;
      this.price_slider = null;

      if(typeof(default_role) == 'undefined') {
        var default_role = 'default';
      }
      this.price_attribute = 'price.'+default_role+'.value';
      this.product_item_css = $('[data-filter-widget=results] .product-col').first().attr('class');
      this.product_root_css = $('[data-filter-widget=results] .row').first().attr('class');

      this.instance = this.init_instant_search(
        params.products_index
      );

      this.init_search_container();
      this.init_hits_container();
      this.init_faceting_filters();
      this.init_price_filters();
      this.init_current_filters();
    }
  }
  init_instant_search(products_index) {
    var instantsearch_params = {
      indexName: products_index,
      routing: true,
      templatesConfig: {
        compileOptions: [{delimiters: '<% %>'}]
      },
      searchClient: customSearchClient
    };
    if($('[data-filter-widget=results]').attr('data-category') != undefined) {
      if($('[data-filter-widget=results]').attr('data-category')) {
        instantsearch_params.searchParameters= {
          facetsRefinements: {
            'categories.id': [$('[data-filter-widget=results]').attr('data-category')]
          },
          facets: ['categories.id']
        };
      }
    }
    else if($('[data-filter-widget=results]').attr('data-discount') != undefined) {
      instantsearch_params.searchParameters = {
        filters: "price.default.discount > 0"
      };
    }
    else if($('[data-filter-widget=results]').attr('data-new-product') != undefined) {
      instantsearch_params.searchParameters = {
        filters: "new_product : true"
      };
    }
    var instance = instantsearch(instantsearch_params);

    return instance;
  }
  init_search_container() {
    if($('#header-search-input').length > 0) {
      this.set_widget(
        instantsearch.widgets.searchBox({
          container: '#header-search-input'
        })
      );
    }
    this.init_widgets('stats', 'stats', {
      templates: {
        body: $('#stats-template').html()
      }
    });
    this.init_widgets('pagination', 'paginate', {
      cssClasses: {
        root: 'pagination-block',
        link: 'btn btn-outline-dark '
      }
    });
    
    var page_hits_count = [];

    for(var i=12; i <=48; i=i+6) {
      page_hits_count.push(
        {
          value:i,
          label: i + ' ' + algolia_params.translations.per_page,
          default: false
        }
      );
    }
    page_hits_count[0].default = true;
    this.init_widgets('hitsPerPageSelector', 'hits-per-page', {
      autoHideContainer: false,
      items: page_hits_count,
      cssClasses: {
        select: " form-control"
      }
    });
    /*
    if($('#hits-per-page-selector').length) {
      this.set_widget(
        instantsearch.widgets.hitsPerPageSelector({
          container: '#hits-per-page-selector',
          autoHideContainer: false,
          items: page_hits_count,
          cssClasses: {
            select: " form-control"
          }
        })
      );
    }*/
  }
  init_faceting_filters() {
    var filters_tag = $('[data-filter-attr]');
    for(var i=0; i < filters_tag.length; i++ ){

      var  $element = $(filters_tag[i]);
      var widget_type = $element.data('filter-widget-type');

      var search_widget = {
        container: '[data-filter-id="' + $element.data('filter-id')+ '"]',
        attributeName: $element.data('filter-attr'),
        sortBy: ['isRefined', 'name:asc'],
        operator: 'or',
        templates: {
          header: '<h4 class="text-uppercase">'+$element.data('filter-name')+'</h4>'
        },
        showMore: {
          limit: 100
        },
        collapsible: {
          collapsed: false,
        },
        transformData: {
          item: function(element) {
            if(element.value == 'false') {
              element.highlighted = algolia_params.translations.filter_other_item;
            }
            return element;
          }
        },
        transformItems: {
          item: function(element) {
            return element;
          }
        },
        autoHideContainer: false,
      };
      this.set_widget(
        instantsearch.widgets[widget_type](search_widget)
      );
      this.set_filters(
        $element.data('filter-attr'),
        $element.data('filter-name')
      );
    }
  }
  init_price_filters() {
    if($('#filter-sliderprice').length) {
      this.price_slider = instantsearch.widgets.rangeSlider({
        container: '#filter-sliderprice',
        attributeName: this.price_attribute,
        autoHideContainer: false,
        searchForFacetValues: true,
        templates: {
          header: "<h4>"+algolia_params.translations.price+"</h4>",
        },
        collapsible: {
          collapsed: false,
        },
        tooltips: {
          format(rawValue) {
            var number = new Number(rawValue);
            var currency = currencies.items[currencies.selected];
            return number.toLocaleString(
              currency.locale_code,
              {
                style: "currency",
                currency: currencies.selected,
              }
            );

          }
        }
      });
    }
    this.set_widget(
      this.price_slider
    );
    this.set_filters(
      'price.default.value',
      algolia_params.translations.price
    );
  }
  init_hits_container() {
    if($('[data-filter-widget=results]')) {
      var $this = this;
      $('[data-filter-widget=results]').html('');
      $('[data-filter-widget=results]').each(function(i, element) {
        $this.set_hit_widget(
          instantsearch.widgets.hits({
            container: element,
            hitsPerPage: 18,
            templates: {
              item: $('#product-hit-template').html(),
              empty: algolia_params.translations.result_empty
            },
            cssClasses: {
              root: $this.product_root_css,
              item: $this.product_item_css,
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
      });
    }
  }
  set_hit_widget(widget) {
    this.hit_widget = widget;
    this.set_widget(this.hit_widget);
  }
  init_current_filters() {
    var current = this;
    if($('[data-filter-widget=current-filter]').length) {
      $('[data-filter-widget=current-filter]').each(
        function(i, element){
          current.set_widget(
            instantsearch.widgets.currentRefinedValues({
              container: element,
              clearAll: 'after',
              clearsQuery: true,
              attributes: current.filters,
              cssClasses: {
                count: ' d-none',
                clearAll: ' btn btn-outline-dark btn-sm  btn-sm  d-inline-block',
              },
              transformData : {
                item: function(element) {
                  var label = '';
                  if(element.attributeName == current.price_attribute) {
                    var price = new Number(element.name);
                    label = price.toLocaleString(currencies.selected,
                      {
                        style: "currency",
                        currency: currencies.selected
                      }
                    );
                  }
                  else {
                    label = element.name;
                  }
                  element.name = "<b>"+label+"</b> <i class='fa fa-times pl-1'></i>";
                  return element;
                }
              },
              templates: {
                clearAll: algolia_params.translations.clear_all
              },
              autoHideContainer: false,
              onlyListedAttributes: true
            })
          );
        }
      );
    }
  }
  init_widgets(widget_name, selector, parameters ) {
    if($('[data-filter-widget='+selector+']').length > 0) {
      var $this = this;
      $('[data-filter-widget='+selector+']').each(function(i, element){
        parameters.container = element;
        $this.set_widget(
          instantsearch.widgets[widget_name](parameters)
        );
      });
    }
  }
  set_widget(widget, index) {
    if(widget != null ) {
      if(index != null) {
        this.widgets[index] = widget;
      }
      else {
        this.widgets.push(widget);
      }
    }
  }
  set_filters(name, label) {
    this.filters.push({
      'name': name,
      'label': label
    });
  }
  init_widget(widget) {
    if(this.instance != null ){
      var widget_added = this.instance.addWidget(widget);
      var n = this.instance.widgets.length -1;
    }
  }
  init_all_widgets() {
    if(this.instance != null && this.widgets.length > 0){
      for(var i in this.widgets) {
        this.init_widget(this.widgets[i]);
      }
    }
  }
  init_templating() {
    this.instance.templatesConfig.helpers.emphasis = function(text, render) {
      return '<em>' + render(text) + '</em>';
    };
    this.instance.templatesConfig.helpers.currency = function(text, render) {
      var value = 0;
      if(typeof(render) != 'undefined') {
        value = parseFloat(render(text));
      }
      else {
        value = parseFloat(text);
      }
      return FacetingSearch.format_price_with_currency(value);

    };
    this.instance.templatesConfig.helpers.imageDefault = function(text, render) {
      var url = render(text).trim();
      if(url != '') {
        return render(text);
      }
      else {
        return default_img_url;
      }
    };
    this.instance.templatesConfig.helpers.ratingsStars = function(text, render) {
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
  }
  static format_price_with_currency(value) {
    var price = new Number(value);
    var currency = currencies.items[currencies.selected];
    price *= currency.rate;
    var html = price.toLocaleString(currencies.selected,
      {
        style: "currency",
        currency: currencies.selected
      }
    );
    return html;
  }
  start(callback) {

    this.init_templating();
    this.init_all_widgets();
    this.instance.addWidget({
      render: function(renderOptions) {
        product_display.set_display();

      },
    });

    this.instance.start();


  }
  resets_hits_widget() {
    if(this.hit_widget != null) {
      this.instance.refresh();
      var hit_widget = this.hit_widget;
      this.init_hits_container();
      this.instance.removeWidget(hit_widget);

      var current = this;
      setTimeout( function(){

        current.init_widget(current.hit_widget);
      }, 500);
    }
  }
  dispose() {
    if(this.instance != null ){
      this.instance.dispose();
    }
  }
}

var faceting_search = null;

function faceting_start() {

  faceting_search = new FacetingSearch(algolia_params);
  faceting_search.start();
  $('[data-locomotive-section-type="search"]').delay(300).animate({opacity: 1}, 1000);
}

$(document).ready(function() {
  try {
    faceting_start();
  }
  catch(exception) {
    $('#generic-error-message').modal('show');
    console.warn(exception);
  }
});
