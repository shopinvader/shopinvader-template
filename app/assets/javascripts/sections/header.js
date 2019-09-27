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
const Section = {

  load: (section) => {
    Section.set_autocomplete(section);
  },
  set_autocomplete(section) {
    if(document.querySelector('.section-searchkit-faceting') == null) {
      //Only if it's not a faceting page
      function translate(key){
        return searchkit_translation[key];
      }
      var get = require("lodash/get");
      var container = section.querySelector('.header-block-search .container');
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
          const searchkit = new SearchkitManager(
            container.dataset.elasticUrl+container.dataset.elasticIndexProducts
          );

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
        test() {
          if(this.state.search_value != '') {
            return 'visible';
          }
          return '';
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
                <div className={'autocomplete '+this.test()}>
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
  }

}

export default Section;
