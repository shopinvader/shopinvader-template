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
import ProductHit from '../components/products.js';
const Section = {

  load: (section) => {
    console.log(section);
    Section.set_autocomplete(section);
  },
  set_autocomplete(section) {
    if(document.querySelector('.section-searchkit-faceting') == null) {
      //Only if it's not a faceting page
      
      var get = require("lodash/get");
      var container = section.querySelector('.header-block-search .container');
      const locale = container.dataset.locale.replace('_', '-');
      SearchkitManager.prototype.getHitsCount= function () {
        //PATCH FOR COMPATIBILITY WITH ELASTICSEARCH v7
        return get(this.results, ["hits", "total", "value"], 0);
      };

      
     
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
            searchkit: searchkit
          };
          searchkit.addResultsListener((results) => {
            
            console.log('addResultsListener', );
          });
        }
        menu_visible() {
          if(this.state.menu_visible) {
            return 'visible';
          }
        }
        render() {
          var mods = "sk-hits-grid";
          return (
            <SearchkitProvider searchkit={this.state.searchkit}>
              <Layout>
                <SearchBox
                  autofocus={false}
                  searchOnChange={true}
                  queryOptions={{analyzer:"standard"}}
                  queryFields={["name", "model.name^3", "short_description", "description"]}
                />
                <div className="autocomplete">
                  <NoHits 
                    errorComponent={NoHitsErrorDisplay}
                    suggestionsField="name"
                  />
                  <Hits 
                    hitsPerPage={5} 
                    highlightFields={["title"]} 
                    mod={mods} 
                    itemComponent={HitListItem}
                  />
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
  // unload: (section) => {
  // },

  // select: (section) => {
  // },

  // deselect: (section) => {
  // },

  // reorder: (section) => {
  // },

  // blockSelect: (section, block) => {
  // },

  // blockDeselect: (section, block) => {
  // }

}

export default Section;
