import { Component } from "react";
import { connect } from "react-redux";
import apolloClient from "../../query/apolloClient";
import { GET_PRODUCT } from "../../query/product";
import { addToCart } from "../../store/reducers/CartSlice";
import style from "./style.module.scss";

class ProductPage extends Component {
  state = {
    isLoading: false,
    product: null,
    currentImg: "",
    attributes: {},
  };

  handleClick() {
    this.props.dispatch(
      addToCart({
        id:
          this.state.product.id +
          "_" +
          Object.values(this.state.attributes).join("-"),
        atributes: this.state.product.attributes,
        name: this.state.product.name,
        price: this.state.product.prices,
        amount: 1,
        gallery: this.state.product.gallery,
        brand: this.state.product.brand,
        selectedAtributeId: this.state.attributes,
      })
    );
  }

  displayPrice() {
    const price = this.state.product.prices.find(
      (price) => price.currency.symbol === this.props.symbol
    );

    return price.amount;
  }

  setAttribute(name, value) {
    this.setState({
      attributes: {
        ...this.state.attributes,
        [name]: value,
      },
    });
  }

  setImage(src) {
    this.setState(() => ({
      currentImg: src,
    }));
  }

  async componentDidMount() {
    try {
      const response = await apolloClient.query({
        query: GET_PRODUCT,
        variables: {
          productId: this.props.id,
        },
      });

      this.setState(() => ({
        isLoading: response.loading,
        product: response.data.product,
        currentImg: response.data.product.gallery[0],
      }));
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  }

  isValid() {
    return (
      this.state.product &&
      Object.values(this.state.attributes).length ===
        this.state.product.attributes.length
    );
  }

  render() {
    const valid = !this.isValid();
    return (
      <>
        {this.state.product && (
          <div className={style.wrapper}>
            <section className={style.gallery}>
              <div className={style.gallery_list}>
                {this.state.product.gallery.map((img, i) => (
                  <div key={i}>
                    <img src={img} alt="" onClick={() => this.setImage(img)} />
                  </div>
                ))}
              </div>
              <div className={style.current_image}>
                <img src={this.state.currentImg} alt="" />
              </div>
            </section>
            <section className={style.content}>
              <div className={style.title}>
                <span>{this.state.product.brand}</span>
                <span>{this.state.product.name}</span>
              </div>
              <div className={style.atributes}>
                {this.state.product.attributes.map((atribute) => (
                  <div key={atribute.id} className={style.atributes_item}>
                    <p>{atribute.name}:</p>
                    {atribute.items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() =>
                          this.setAttribute(atribute.name, item.id)
                        }
                        className={
                          this.state.attributes[atribute.name] === item.id
                            ? style.selected
                            : ""
                        }
                        style={{
                          background: `${item.value}`,
                        }}
                      >
                        {atribute.id === "Color" ? "" : item.value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className={style.description}>
                <p>PRICE:</p>
                <span className={style.description_price}>
                  {this.props.symbol} {this.displayPrice()}
                </span>
              </div>
              <div className={style.action}>
                <button disabled={valid} onClick={this.handleClick.bind(this)}>
                  ADD TO CART
                </button>
              </div>
              <div
                id="description"
                dangerouslySetInnerHTML={{
                  __html: this.state.product.description,
                }}
              />
            </section>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    symbol: state.currensy.symbol,
  };
};

export default connect(mapStateToProps, null)(ProductPage);
