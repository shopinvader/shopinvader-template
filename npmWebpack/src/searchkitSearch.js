import React from 'react'
import ReactDOM from 'react-dom'
import ReactHogan from 'react-hogan';
import Hogan from 'hogan.js'

import { Hits, SearchkitManager,SearchkitProvider,
  SearchBox, RefinementListFilter, Pagination,
  HierarchicalMenuFilter,HierarchicalRefinementFilter,
  HitsStats, NoHits,ResetFilters, RangeFilter,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  GroupedSelectedFilters, Layout, LayoutResults,
  ActionBar, ActionBarRow,PageSizeSelector, Toggle,
  RangeSliderInput, MatchQuery} from 'searchkit'


  var product_index = elasticsearch_params.products_index;
  const host = 'http://'+elasticsearch_params.server_IP+':'+elasticsearch_params.server_Port+'/'+product_index+'/odoo';
  const sk = new SearchkitManager(host, {});


  // when accessing a specific category adds a filter to searchkit
  if($('#search-result').attr('data-category')) {
    var categories_id = $('#search-result').attr('data-category');
    sk.addDefaultQuery((query)=> {
      return query.addQuery(MatchQuery("categories.id", category_id,null))
    })
  }

  //by creating a InvisibleSearchBar the existing searchbar form in default.liquid will work for search queries
  //the benefit of using the default existing form is that it can easily redirect to the /search
  // where in Searchkit it is more complicated to implement
  class InvisibleSearchBar extends SearchBox{
      render() {
        return ('');
      }
  }

  //the point of this is to indicate Searchkit what fields to search
  class FakeSearchBar extends React.Component {
    render() {
      return (
        <SearchkitProvider searchkit={sk}>
          <InvisibleSearchBar
            searchOnChange={false}
            prefixQueryFields={[
              "name^2",
              "hierarchicalCategories.lvl2",
              "hierarchicalCategories.lvl1",
              "hierarchicalCategories.lvl0"
            ]}
          />
        </SearchkitProvider>
      );
    }
  }
  ReactDOM.render(<FakeSearchBar />, document.getElementById("header-search-input"));

  class ResultLayoutToggle extends React.Component {
    render() {
      return (
        <SearchkitProvider searchkit={sk}>
          <ViewSwitcherToggle/>
        </SearchkitProvider>
      );
    }
  }

  class RefinedValues extends React.Component {
    render() {
      return (
        <SearchkitProvider searchkit={sk}>
          <ActionBar>
            <ActionBarRow>
              <GroupedSelectedFilters/>
              <ResetFilters/>
            </ActionBarRow>
          </ActionBar>
        </SearchkitProvider>
      );
    }
  }

  class SearchPagination extends React.Component {
    render() {
      return (
        <SearchkitProvider searchkit={sk}>
          <Pagination showNumbers={true}/>
        </SearchkitProvider>
      );
    }
  }

  class HitsPerPage extends React.Component {
    render() {
      return (
        <SearchkitProvider searchkit={sk}>
          <PageSizeSelector class="d-none d-sm-inline-block" options={[6,12,18,24]} listComponent={Toggle}/>
        </SearchkitProvider>
      );
    }
  }

  class SearchStat extends React.Component {
    render() {
      return (
        <SearchkitProvider searchkit={sk}>
          <HitsStats class="d-inline-block  text-right pl-2 " translations={{
            "hitstats.results_found":"{hitCount} results found"
          }}/>
        </SearchkitProvider>
      );
    }
  }

  //used when generating products from templates
  const hogan_helpers = {
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

  function hogan_render(text, data) {
    return Hogan
            .compile(text.replace('<%', '{{').replace('%>', '}}'))
            .render(data);
  }

  const articleDivClass=$('#search-result .row').first()[0].firstElementChild.className;
  class ArticleHitsGridItem extends React.Component {
    render() {
      const result = this.props.result;
      const item = result._source;
      item.last_categorie = item.categories[item.categories.length-1];
      //check price hasn't been already changed when switching from list to grid view
      if(!item.price.value)
        item.price = item.price[default_role];
      item.helpers=hogan_helpers;
      const template = $('#product-hit-template').html();
      return(
        <ReactHogan className={articleDivClass} template={template} data={item} />
      );
    }
  }

  class ArticleHitsListItem extends React.Component {
    render() {
      const result = this.props.result;
      const item = result._source;
      item.last_categorie = item.categories[item.categories.length-1];
      //check price hasn't been already changed when switching from list to grid view
      if(!item.price.value)
        item.price = item.price[default_role];
      item.helpers=hogan_helpers;

      console.log(item);
      const template = $('#product-hit-template').html();
      return(
        <ReactHogan className={articleDivClass} template={template} data={item} />
      );
    }
  }

  class CategoriesFacet extends React.Component {
    render() {
      return (
        <SearchkitProvider searchkit={sk}>
          <HierarchicalMenuFilter fields={["categories.name"]} title="Categories" id="categories"/>
        </SearchkitProvider>
      );
    }
  }

  class PriceFacet extends React.Component {
    render() {
      return (
        <SearchkitProvider searchkit={sk}>
          <DynamicRangeFilter field="price.default.value" id="price" title="Price" rangeComponent={RangeSliderInput} rangeFormatter={(count)=> count + "€"}/>
            {/*
              other price range possibility:
              <RangeFilter field="price.default.value" id="priceGraph" min={0} max={1000} showHistogram={true} title="priceGraph"/>
            */}
        </SearchkitProvider>
      );
    }
  }

  class SearchResult extends React.Component {
    render() {
      return (
        <SearchkitProvider searchkit={sk}>
          <Layout>
            <ViewSwitcherHits
                hitsPerPage={6} highlightFields={["title"]}
                hitComponents={[
                  {key:"grid", title:"Grid", itemComponent:ArticleHitsGridItem, defaultOption:true},
                  {key:"list", title:"List", itemComponent:ArticleHitsListItem}
                ]}
                scrollTo="body"
            />
            <NoHits translations={{
              "NoHits.NoResultsFound":"No products were found for {query}",
              "NoHits.DidYouMean":"Search for {suggestion}",
              "NoHits.SearchWithoutFilters":"Search for {query} without filters"
            }} suggestionsField="name"/>
          </Layout>
        </SearchkitProvider>
      );
    }
  }

  // désactiver parceque lors du chargement d'une page de catégorie crée une erreur parceque layout-option n'existe pas
  // ReactDOM.render(<ResultLayoutToggle />, document.getElementById("layout-option"));
  ReactDOM.render(<SearchPagination />, document.getElementById("search-pagination-top"));
  ReactDOM.render(<SearchPagination />, document.getElementById("search-pagination-bottom"));
  ReactDOM.render(<HitsPerPage />, document.getElementById("hits-per-page-selector"));
  ReactDOM.render(<SearchStat />, document.getElementById("search-stats"));
  ReactDOM.render(<RefinedValues />, document.getElementById("current-refined-values"));
  ReactDOM.render(<SearchResult />, document.getElementById("search-result").firstElementChild);
  ReactDOM.render(<CategoriesFacet />, document.getElementById("hierarchical-categories"));
  ReactDOM.render(<PriceFacet />, document.getElementById("price-range"));
