import { Component } from "react";
import HomePage from "../pages/homePage/HomePage";
import ProductPage from "../pages/productPage/ProductPage";

export default class Layout extends Component {
  render() {
    return (
      <div className="container">
        {this.props.params.productId ? (
          <ProductPage id={this.props.params.productId} />
        ) : this.props.params.category ? (
          <HomePage category={this.props.params.category} />
        ) : (
          <HomePage />
        )}
      </div>
    );
  }
}
