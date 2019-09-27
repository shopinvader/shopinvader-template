import React, { Component }  from 'react';
import {
  Carousel
} from 'react-bootstrap';
class ProductHit extends React.Component {
  constructor(props, locale) {
    super(props);
    this.state = {
      'product': this.props.result._source,
      'locale': locale,
    };
  }
  get_role() {
    var role = Cookies.get('role');
    if(role == null || role == '') {
      role = 'default';
    }
    return role;
  }
  get_first_category() {
    var categories = this.props.result._source.categories;
    if (categories.length > 0) {
      return categories[0].name;
    }
    return null;
  }
  get_price_currency(price) {
    var currency = currencies.items[currencies.selected];
    return new Intl.NumberFormat(
      this.state.locale, { 
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
    }
  }
  price() {
    var price = this.state.product.price[this.get_role()];
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
      if(images.length == 1) {
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
          <Carousel 
            controls={true}
            interval={null}>
            {slides}
          </Carousel>
        );
      }
    }
    else {
      return (
        <img src="" alt={this.state.product.name} title={this.state.product.name}/>
      );
    }
  }
  render() {
    var product = this.state.product;
    var class_name = 'product-thumbnail '+this.get_thumb_layout();
    var page = document.location;
    var id = 'product-hit-'+this.get_thumb_layout()+product.objectID
    return (
      <div className={class_name} key={id} id={id}>
        <div className="image" data-link={'./'+product.url_key}>
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
                <input type="hidden" name="invader_success_url" value={page+'?addtocart_product_id='+product.objectID} />
                <input type="hidden" name="invader_error_url" value={page} />
                <input type="hidden" name="item_qty" value="1" />
                <input type="hidden" name="product_id" value={product.objectID} />
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
export default ProductHit;