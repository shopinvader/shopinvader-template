import algoliasearch from 'algoliasearch/lite';
import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';



const Section = {

  load: (section) => {
    const container = document.querySelector('#instantsearch-faceting-container');

    const searchClient = algoliasearch(
      'B1G2GM9NG0',
      'aadef574be1f9252bb48d4ea09b5cfe5'
    );

    class App extends Component {
      render() {
        return (
          <div className="ais-InstantSearch">
            <h1>React InstantSearch e-commerce demo</h1>
            <InstantSearch indexName="demo_ecommerce" searchClient={searchClient}>
              <div className="left-panel">
                <ClearRefinements />
                <h2>Brands</h2>
                <RefinementList attribute="brand" />
                <Configure hitsPerPage={8} />
              </div>
              <div className="right-panel">
                <SearchBox />
                <Hits hitComponent={Hit} />
                <Pagination />
              </div>
            </InstantSearch>
          </div>
        );
      }
    }

    function Hit(props) {
      return (
        <div>
          <img src={props.hit.image} align="left" alt={props.hit.name} />
          <div className="hit-name">
            <Highlight attribute="name" hit={props.hit} />
          </div>
          <div className="hit-description">
            <Highlight attribute="description" hit={props.hit} />
          </div>
          <div className="hit-price">${props.hit.price}</div>
        </div>
      );
    }
    ReactDOM.render(<App/>, container);
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
