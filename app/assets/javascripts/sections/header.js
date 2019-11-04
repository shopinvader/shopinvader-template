import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import {
  SearchkitManager,
  SearchkitProvider,
  SearchkitComponent,
  SearchBox,
  NoHits,
  Hits,
  Layout,
  NoHitsErrorDisplay,
} from 'searchkit';
import {
  Button
} from 'react-bootstrap';
import ProductHit from '../components/products.js';
var cookies = require('browser-cookies');

const Section = {

  load: (section) => {
    if(section.querySelector('.searchkit_autocomplete') != null) {
      Section.set_elasticsearch_autocomplete(section);
    }
    Section.set_currency();
  },
  set_elasticsearch_autocomplete(section) {
    if(document.querySelector('.section-searchkit-faceting') == null) {
      //Only if it's not a faceting page
      function translate(key){
        return searchkit_translation[key];
      }
      var get = require("lodash/get");
      var container = section.querySelector('.header-block-search .searchkit_autocomplete');
      const locale = container.dataset.locale.replace('_', '-');
      SearchkitManager.prototype.getHitsCount= function () {
        //PATCH FOR COMPATIBILITY WITH ELASTICSEARCH v7
        return get(this.results, ["hits", "total", "value"], 0);
      };
      class HitsAutocomplete extends Hits {
        constructor(props) {
          super(props);
        }

        render() {
          var query = this.getQuery();
          if(query.index.queryString != '') {
            var render = super.render();
            var results = this.getResults();
            var button = null;

            if(results != null && results.hits.total.value > 0) {
              button = (
                <div className="text-center p-2 pb-3" key="autocomplete-allresult">
                  <Button
                    variant="outline-primary"
                    type="button"
                    size="sm"
                    onClick={(item) => {
                      document.location= './search?q='+encodeURI(query.index.queryString);
                    }}
                  >
                    {translate('facets.view_all')}
                  </Button>
                </div>
              );
            }
            return [
              render,
              button
            ];
          }
          return null;
        }
      }
      class HitListItem extends ProductHit {
        constructor(props) {
          super(props, locale);
        }
        get_thumb_layout() {
          return 'list';
        }
      }
      class App extends React.Component {
        constructor() {
          super();
          var url = new URL(
            container.dataset.elasticIndexProducts,
            container.dataset.elasticUrl
          );
          const searchkit = new SearchkitManager(url.href);
          this.state = {
            results: 0,
            search_value: '',
            searchkit: searchkit
          };
          var parent = this;
          searchkit.setQueryProcessor((query_params) => {
            
            if(query_params.hasOwnProperty('query')) {
              parent.state.search_value = query_params.query.query;
            }
            else {
              parent.state.search_value = '';
            }
            return query_params;
          });
        }
        menu_visible() {
          if(this.state.menu_visible) {
            return 'visible';
          }
        }
        render() {
          var autocomplete_css = [
            'autocomplete'
          ];
          if(this.state.search_value != '') {
            autocomplete_css.push('visible');
          }
          
          return (
            <SearchkitProvider searchkit={this.state.searchkit}>
              <Layout>
                <SearchBox
                  autofocus={false}
                  searchOnChange={true}
                  queryOptions={{analyzer:"standard"}}
                  queryFields={["name", "model.name^3", "short_description", "description"]}
                 />
                <div className='autocomplete'>
                  <NoHits 
                    errorComponent={NoHitsErrorDisplay}
                    suggestionsField="name"
                  />
                  <HitsAutocomplete
                    hitsPerPage={5} 
                    highlightFields={["title"]} 
                    mod={"sk-hits-grid "+Math.random()} 
                    itemComponent={HitListItem} 
                  />
                  <a href={'./search?'}>
                  </a>
                </div>
              </Layout>
            </SearchkitProvider>
          );
        }
      }
      ReactDOM.render(
        <App />, container
      );
    }
  },
  set_currency(){
    $('[data-toggle="change-currency"]').on('click', function(){
      var currency_code = $(this).data('value');
      if(currency_code != '') {
        cookies.set('currency', currency_code);
        if($('#searchkit-faceting-container').length > 0) {
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
  }
}

export default Section;
