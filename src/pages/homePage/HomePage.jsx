import { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "../../components/common/productCard/ProductCard";
import apolloClient from "../../query/apolloClient";
import { GET_PRODUCTS } from "../../query/product";
import style from "./style.module.scss";

class HomePage extends Component {
  state = {
    products: [],
    isLoading: true,
    error: null,
  };

  transformData(data) {
    const newArr = [];
    for (const iterator of data) {
      newArr.push(...iterator.products);
    }
    return newArr;
  }

  async componentDidMount() {
    try {
      const response = await apolloClient.query({
        query: GET_PRODUCTS,
      });

      this.setState({
        products: this.transformData([...response.data.categories]),
        isLoading: response.loading,
      });
      return;
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  }

  filterProducts(products = []) {
    return !this.props.category
      ? products
      : products.filter((p) => p.category === this.props.category);
  }

  render() {
    const filtredProducts = this.filterProducts(this.state.products);

    return (
      <>
        <section>
          <p className={style.category}>
            {this.props.category
              ? this.props.category.charAt(0).toUpperCase() +
                this.props.category.slice(1)
              : "All"}
          </p>
          <div className={style.content}>
            {!this.isLoading
              ? filtredProducts.map((p, i) => (
                  <ProductCard
                    key={i}
                    id={p.id}
                    description={p.description}
                    atributes={p.attributes}
                    category={p.category}
                    inStock={p.inStock}
                    gallery={p.gallery}
                    price={p.prices}
                    brand={p.brand}
                    name={p.name}
                  />
                ))
              : "loading ..."}
          </div>
        </section>
      </>
    );
  }
}

export default connect()(HomePage);
