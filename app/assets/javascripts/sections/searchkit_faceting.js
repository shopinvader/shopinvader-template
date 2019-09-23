import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import ReactHogan from 'react-hogan';

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
const Section = {

  load: (section) => {
    SearchkitManager.prototype.getHitsCount= function () {
      //PATCH FOR COMPATIBILITY WITH ELASTICSEARCH v7
      return get(this.results, ["hits", "total", "value"], 0);
    };

    var get = require("lodash/get");
    const container = document.querySelector('#searchkit-faceting-container');
    const noimage = container.dataset.productNoimage;
    const searchkit = new SearchkitManager(container.dataset.elasticUrl+container.dataset.elasticIndexProducts);
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
    var facets = [];
    for(var facet of container.querySelectorAll('[data-facet-code]')) {
      facets.push({
        code: facet.dataset.facetCode,
        name: facet.dataset.facetName
      });
    }
    var role = Cookies.get('role');
    if(role == null || role == '') {
      role = 'default';
    }
    class HitItem extends React.Component {
      constructor(props){
        super(props);
        this.state = {
          'product': this.props.result._source,
        };
      }
      get_first_category() {
        var categories = this.props.result._source.categories;
        if (categories.length > 0) {
          return categories[0].name
        }
        return null;
      }
      get_price_currency(price) {
        var currency = currencies.items[currencies.selected];
        return new Intl.NumberFormat(
          locale, { 
            style: 'currency', 
            currency: currencies.selected 
          }
        ).format(price*currency.rate);
      }
      get_thumb_layout() {
        return 'grid';
      }
      variants() {
        var product = this.state.product;
        const items = []
        if(product.variant_selector.length > 1){
          
          product.variant_selector.map((group) => {
            var item_variant = [];

            group.values.map((variant) => {
              var name = variant.name.replace(group.name.trim(), '').trim();
              item_variant.push(
                <div className="variant-item"
                dangerouslySetInnerHTML={{__html: name}}
                />
              );
            });
            items.push(
              <div key={product.id+'_'+group.name.toLowerCase()} className="variant-group">
                <span
                  className="variant-group-title"
                  dangerouslySetInnerHTML={{__html: group.name}}
                />
                <div className="variant-group-items">
                  {item_variant}
                </div>
              </div>
            );
          });
          return (
            <div>
              {items}
            </div>
          );
          /*
          return (<div>
          {
            product.variant_selector.map((group) => {
              return (
                <div>
                {
                  return group.map((item)=>{
                    var name = item.name.replace(group.name, '').trim();
                    return (
                      <div 
                        className="btn btn-outline-secondary"
                        dangerouslySetInnerHTML={{__html: name}}
                      />
                    );
                  });
                }
                </div>
              );
              
            })
          }
          </div>);*/
        }
      }
      price() {
        var price = this.state.product.price[role];
        var components = [];
        var discount_css = '';
        if(price.discount > 0) {
          var discount_css="discounted"
          components.push(
            <div 
              className="price_orignal"
              dangerouslySetInnerHTML={{__html: this.get_price_currency(price.original_value)}}
            />
          );
        }
        components.push(
          <div 
            className={"price_value "+discount_css}
            dangerouslySetInnerHTML={{__html: this.get_price_currency(price.value)}}
          />
        );
        return (
          <div key={'price-'+this.state.product.objectID}>
            {components}
          </div>
        );
      }
      images() {
        var images = this.state.product.images;
        if(images.length > 0) {
          if(images.length > 1) {
            var image = images[0].medium;
            return (
              <img src={image.src} alt={image.alt} title={image.alt}/>
            );
          }
          else {
            var slides = [];
            images.map((item) => {
              slides.push(
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={item.medium.src}
                    alt={item.medium.alt}
                  />
                </Carousel.Item>
              )
            });
            return (
              <Carousel>
                {slides}
              </Carousel>
            );
          }
        }
        else {
          return (
            <img src={noimage} alt={this.state.product.name} title={this.state.product.name}/>
          );
        }
      }
      render() {
        var product = this.state.product;
        var class_name = 'product-thumbnail '+this.get_thumb_layout();
        var page = document.location;
        
        return (
          <div className={class_name} key={'product-'+product.objectID}>
            <div className="image">
              {this.images()}
            </div>
            <div className="content">
              <div className="description">
                <a href={'./'+product.url_key}  className="title" dangerouslySetInnerHTML={{__html: product.model.name}} />
                <div className="short_description" dangerouslySetInnerHTML={{__html: product.short_description}} />
                <a className="category" dangerouslySetInnerHTML={{__html: this.get_first_category()}} />
              </div>
              <div className="price">
                {this.price()}
                <div className="add-to-cart">
                  <form method="POST" action="/invader/cart/add_item" data-shopinvader-form>
                    <input type="hidden" name="invader_success_url" value="{page}?addtocart_product_id={product.objectID}" />
                    <input type="hidden" name="invader_error_url" value="{page}" />
                    <input type="hidden" name="product_id" value="{product.objectID}" />
                    <a href={'./'+product.url_key} className="btn-product-page" dangerouslySetInnerHTML={{__html: "Details"}} />
                    <button type="submit" className="btn-add-to-cart" dangerouslySetInnerHTML={{__html: "Ajouter au panier"}} />
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    class HitGridItem extends HitItem {
      constructor(props) {
        super(props);
      }
      get_thumb_layout() {
        return 'grid';
      }
    }
    class HitListItem extends HitItem {
      constructor(props) {
        super(props);
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
                      title= ""
                      id="categories"
                      orderKey="hierarchicalCategories.order"
                      orderDirection="asc"
                      startLevel={1}
                    />
                    {
                      this.props.facets.map((item) => (
                        <RefinementListFilter
                          id={item.code.replace('.', '_')}
                          title={item.name}
                          field={item.code}
                          operator="OR"
                          size={10}
                        />
                      ))
                    }
                    <DynamicRangeFilter 
                      id="price"
                      field={'price.'+role+'.value'}
                      rangeComponent={RangeSliderInput}
                      rangeFormatter={(count)=> Math.ceil(count) + "€"}
                      title='price-range'
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
                      searchOnChange={true}/>
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
                        showNumbers={true}
                        pageScope={3}
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
                        filter
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
                        {label:"Relevance", field:"_score", order:"desc", defaultOption:true},
                        {label:"Price asc", field:"price.default.value", order:"asc"},
                        {label:"Price", field:"price.default.value", order:"desc"}
                      ]}
                      />
                    </ActionBarRow>
                  </ActionBar>

                  <ViewSwitcherHits
                      hitsPerPage={12}
                      sourceFilter={[]}
                      hitComponents = {[
                        {key:"grid", title:"Grid", itemComponent:HitGridItem, defaultOption:true},
                        {key:"list", title:"List", itemComponent:HitListItem}
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
      />, container)
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
