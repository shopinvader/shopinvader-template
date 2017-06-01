
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

  if(typeof(category_id) != 'undefined') {


    instantsearch_params.urlSync = false;
    instantsearch_params.searchParameters = {
      hierarchicalFacetsRefinements: {
        categories_ids: [category_id]
      }
    };

    instantsearch_params.searchFunction = function(search_helper){
      if(jQuery.isEmptyObject(search_helper.state.disjunctiveFacetsRefinements)){
        $('#search-result').addClass("hidden");
        $('#all-result').removeClass("hidden");
        $('#stats').addClass("hidden");
      }
      else {
        $('#search-result').removeClass("hidden");
        $('#all-result').addClass("hidden");
        $('#stats').removeClass("hidden");
      }

      search_helper.search();
    };
  }

  var search = instantsearch(instantsearch_params);
  if(typeof(category_id) == 'undefined') {
    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '#header-search-input'
      })
    );
  }

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#search-result',
      hitsPerPage: 24,

      templates: {
        item: $('#product-hit-template').html(),
        empty: $('#no-results-template').html()
      },
      cssClasses: {
        root: "row row-same-height",
        item: "col-xs-12 col-sm-6 col-md-4  product-thumbnail"
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination'
    })
  );
/*
  search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats',
      templates: {
        body: $('#stats-template').html(),
      }
    })
  );

  if($('#filters-xs').length > 0) {
    $('[data-filter-attr]').each(
    function(i, element){

      var filter = $(element).clone(true);
      filter.attr('id', filter.attr('id')+'-xs');
      filter.data('filter-collapse', 'true');
      filter.appendTo($('#filters-xs .content'));
    });
  }*/
  $('[data-filter-attr]').each(
  function(i, element){


    var search_widget = {
      container: '#'+$(element).attr('id'),
      attributeName: $(element).data('filter-attr'),
      sortBy: ['isRefined', 'name:asc'],
      operator: 'or',
      templates: {
        header: '<h4>'+$(element).data('filter-name')+'</h4>'
      },
      showMore: {
        limit: 100
      },
      collapsible: {
        collapsed: false,
      },
      tooltips: false,
    };
    console.log(element);
    if($(element).data('filter-hit-limit')) {
      search_widget.limit = $(element).data('filter-hit-limit');
    }
    if($(element).data('filter-collapse')) {
      search_widget.collapsible.collapsed = $(element).data('filter-collapse');
    }
    if($(element).data('show-more-label')) {
      search_widget.showMoreLabel = $(element).data('show-more-label');
    }
    if(search_widget.attributeName == 'dest_country_ids') {
      search_widget.searchForFacetValues = {
        placeholder: 'Rechercher',
        templates: {
          noResults: '<div class="sffv_no-results">Aucun résultat</div>'
        }
      };
    }

    search.addWidget(instantsearch.widgets[$(element).data('filter-widget-type')](search_widget));
  });




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
        html += '<i class="fa fa-star" aria-hidden="true"></i>';
      }
      else {
        html += '<i class="fa fa-star-o" aria-hidden="true"></i>';
      }
    }
    return html;
  };
  search.start();
});
function renderImage()
{
  //console.log('test');
}
