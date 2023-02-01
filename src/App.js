import React, { Component } from "react";
import Navi from "./Navi";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Route, Routes } from "react-router-dom";
import FormDemo1 from "./FormDemo1";
import CartList from "./CartList";
import FormDemo2 from "./FormDemo2";
export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };

  componentDidMount() {
    this.getProducts();
  }


  changeCategory = (categorys) => {
    this.setState({ currentCategory: categorys.categoryName });
    this.getProducts(categorys.id);
  };
  

  getProducts = (categoryId) => {
    let url = "https://saimthecan.github.io/shopping-json/products.json";
    if (categoryId) {
      url = "https://saimthecan.github.io/shopping-json/categoryId" + categoryId + ".json";
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };


  addToCart = (product) => {
    let newCart = this.state.cart;
    let addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });
    alertify.success(product.productName + " added to cart! ", 2);
  };


  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.alert(product.productName + " removed from cart! ", 2);
  };

  render() {
    let productInfo = { title: "Product List" };
    let categoryInfo = { title: "Category List" };
 
    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                
                changeCategory={this.changeCategory}
                
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <ProductList
                      products={this.state.products}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  }
                />
                <Route
                  exact
                  path="/cart"
                  element={
                    <CartList
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  }
                />
             
                <Route path="form1" element={<FormDemo1 />} />
                <Route path="form2" element={<FormDemo2 />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
