import { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "../../components/ui/productCard/ProductCard";
import apolloClient from "../../query/apolloClient";
import { GET_PRODUCTS } from "../../query/product";
import style from "./style.module.scss";

class HomePage extends Component {
  state = {
    products: [],
    isLoading: true,
    error: null,
  };

  async getGoods() {
    try {
      const response = await apolloClient.query({
        query: GET_PRODUCTS,
        variables: {
          input: !this.props.category ? "all" : this.props.category,
        },
      });

      console.log(response.data.category);

      this.setState({
        products: response.data.category.products,
        isLoading: response.loading,
      });
      return;
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  }

  componentDidMount() {
    this.getGoods();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.getGoods();
    }
  }

  render() {
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
              ? this.state.products.map((p, i) => (
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
