import React, { Component }  from 'react';
import ReactDOM from 'react-dom';

//import HoganHelpers from './_hogan_helpers';
import 'rc-slider/assets/index.css';

import { Hits, SearchkitManager,SearchkitProvider,
  SearchBox, SearchkitComponent, RefinementListFilter, Pagination,
  HierarchicalRefinementFilter, MultiMatchQuery, CheckboxItemList,
  HitsStats, NoHits,ResetFilters, RangeFilter,
  DynamicRangeFilter, GroupedSelectedFilters, Layout,
  LayoutResults, ActionBar, ActionBarRow,
  PageSizeSelector, Toggle, RangeSliderInput,
  MatchQuery, ViewSwitcherHits, ViewSwitcherToggle, InitialLoader, HitItemProps,
  TopBar, LayoutBody, SideBar, SelectedFilters, RangeQuery, 
  HierarchicalMenuFilter, InitialLoaderComponent, NoHitsErrorDisplay, Select, SortingSelector, 
  } from 'searchkit';
import {
  ButtonToolbar,
  Button,
  Collapse,
  Carousel
} from 'react-bootstrap';
import ProductHit from '../components/products.js';
var cookies = require('browser-cookies');

const Section = {
  load: (section) => {
    SearchkitManager.prototype.getHitsCount= function () {
      //PATCH FOR COMPATIBILITY WITH ELASTICSEARCH v7
      return get(this.results, ["hits", "total", "value"], 0);
    };
    function translate(key){
      return searchkit_translation[key];
    }
    var get = require("lodash/get");
    const container = document.querySelector('#searchkit-faceting-container');
    var url = new URL(
      container.dataset.elasticIndexProducts,
      container.dataset.elasticUrl
    );
    const searchkit = new SearchkitManager(url.href);
    const locale = container.dataset.locale.replace('_', '-');
    if(container.dataset.filterKey) {
      searchkit.addDefaultQuery((query)=> {
        return query.addQuery(
          MatchQuery(
            container.dataset.filterKey, 
            container.dataset.filterValue, 
            null)
          );
      });
    }
    searchkit.addDefaultQuery((query)=> {
      return query.addQuery(
        MatchQuery(
          'main', 
          true, 
          null)
        );
    });
    searchkit.translateFunction = translate;
    var facets = [];
    for(var facet of container.querySelectorAll('[data-facet-code]')) {
      facets.push({
        code: facet.dataset.facetCode,
        name: facet.dataset.facetName
      });
    }

    var role = cookies.get('role');
    if(role == null || role == '') {
      role = 'default';
    }
    
    class HitGridItem extends ProductHit {
      constructor(props) {
        super(props, locale);
      }
      get_thumb_layout() {
        return 'grid';
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
    class PriceRange extends React.Component {
      render() {
        return (
          <DynamicRangeFilter 
            field={'price.'+role+'.value'}

            rangeComponent={RangeSliderInput}
            rangeFormatter={(count)=> Math.ceil(count) + "€"}
          />
        );
      }
    }
    class App extends React.Component {
      constructor() {
        super();
        this.state = {
          collapse_filter: false
        };
      }
      collapse() {
        this.setState({
            collapse_filter: !this.state.collapse_filter
        });
      }
      filters() {
        var filters = [];
        this.props.facets.map((item) => (
          filters.push(
              <RefinementListFilter
                id={item.code.replace('.', '_')}
                title={item.name}
                field={item.code}
                operator="OR"
                size={10}
              />
            )
          )
        );
        return filters;
      }
      render() {
        
        return (
          <SearchkitProvider searchkit={searchkit}>
            <Layout>
              <LayoutBody>
                <Collapse in={this.state.collapse_filter}>
                  <SideBar className="sk-filters" id="sk-filters">
                    <div className="sk-filters-header sk-filters-btn">
                      <div className="sk-filters-title">
                        Filtre
                      </div>
                      <Button 
                        variant="outline-dark"
                        onClick={() => this.collapse()}
                        aria-controls="sk-filters"
                        aria-expanded={this.state.collapse_filter}
                        size="sm"
                      >
                        X
                      </Button>
                    </div>
                    <HierarchicalRefinementFilter
                      field="hierarchicalCategories"
                      title={translate('facets.category')}
                      id="categories"
                      orderKey="hierarchicalCategories.order"
                      orderDirection="asc"
                      startLevel={1}
                    />
                    {this.filters()}
                    <DynamicRangeFilter 
                      id="price"
                      field={'price.'+role+'.value'}
                      rangeComponent={RangeSliderInput}
                      rangeFormatter={(count)=> Math.ceil(count) + "€"}
                      title={translate('facets.price')}
                    />
                    <ButtonToolbar className="sk-filters-footer sk-filters-btn">
                      <Button 
                        variant="primary"
                        onClick={() => this.collapse()}
                        aria-controls="sk-filters"
                        aria-expanded={this.state.collapse_filter}
                        block
                      >
                        Filter
                      </Button>
                    </ButtonToolbar>
                  </SideBar>
                </Collapse>
                <LayoutResults className="sk-content">
                  <ActionBar className="sk-action">
                    <div className="header" dangerouslySetInnerHTML={{__html: this.props.header}} />
                  </ActionBar>
                  <ActionBar className="sk-action">
                    <ActionBarRow>
                      
                      <SearchBox
                      autofocus={true}
                      searchOnChange={true}
                      queryOptions={{analyzer:"standard"}}
                      queryFields={["name", "model.name^3", "short_description", "description","categories"]}/>
                    </ActionBarRow>
                    <ActionBarRow>
                      <HitsStats/>
                    </ActionBarRow>
                    <ActionBarRow>
                      <PageSizeSelector 
                        options={[6,12,24]} 
                        listComponent={Select}
                      />
                      <Pagination
                        showNumbers={false}
                      />
                    </ActionBarRow>
                  </ActionBar>
                  <ActionBar className="sk-action">
                    <ActionBarRow className="sk-filters-btn">
                      <Button 
                        variant="secondary"
                        onClick={() => this.collapse()}
                        aria-controls="sk-filters"
                        aria-expanded={this.state.collapse_filter}
                      >
                        {translate('facets.filters')}
                      </Button>
                    </ActionBarRow>
                    <ActionBarRow className="sk-filters-toggle">
                      <ViewSwitcherToggle/>
                    </ActionBarRow>
                    <ActionBarRow>
                      <SelectedFilters/>
                      <ResetFilters/>
                    </ActionBarRow>
                    <ActionBarRow>
                      <SortingSelector
                      options={[
                        {label: translate('sort.price_default'), field:"_score", order:"desc", defaultOption:true},
                        {label: translate('sort.price_asc'), field:"price.default.value", order:"asc"},
                        {label: translate('sort.price_desc'), field:"price.default.value", order:"desc"}
                      ]}
                      />
                    </ActionBarRow>
                  </ActionBar>

                  <ViewSwitcherHits
                      hitsPerPage={12}
                      sourceFilter={[]}
                      hitComponents = {[
                        {key:"grid", title: translate('product.grid'), itemComponent:HitGridItem, defaultOption:true},
                        {key:"list", title: translate('product.list'), itemComponent:HitListItem}
                      ]}
                      scrollTo="body"
                  />
                  <InitialLoader component={InitialLoaderComponent}/>
                  <NoHits 
                    errorComponent={NoHitsErrorDisplay}
                    suggestionsField="name"
                  />
                  <ActionBar className="sk-action">
                    <div className="footer" dangerouslySetInnerHTML={{__html: this.props.footer}} />
                  </ActionBar>
                </LayoutResults>
              </LayoutBody>
            </Layout>
          </SearchkitProvider>
        );
      }
    }
    ReactDOM.render(
      <App 
        facets={facets} 
        header={container.querySelector('.searchkit-header').innerHTML}
        footer={container.querySelector('.searchkit-footer').innerHTML}
      />, container,
      function() {
        container.className += " loaded";
      })
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

  // blockDeSelect: (section, block) => {
  // }

}

export default Section;
