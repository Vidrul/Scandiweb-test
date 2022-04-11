import { Component } from "react";
import { connect } from "react-redux";
import Slider from "../../components/ui/slider/Slider";
import {
  addToCart,
  decreaseStuffQuantity,
  removeItem,
} from "../../store/reducers/CartSlice";
import style from "./style.module.scss";

class CartPage extends Component {
  displayPrice(item) {
    const price = item.price.find(
      (price) => price.currency.symbol === this.props.currensySymbol
    );

    return price.amount;
  }

  handleDecrease(amount, id) {
    if (amount > 1) {
      this.props.dispatch(decreaseStuffQuantity({ id }));
    } else {
      this.props.dispatch(removeItem({ id }));
    }
  }

  handleIncrease(id) {
    this.props.dispatch(addToCart({ id }));
  }

  render() {
    return (
      <main className="container">
        <p className={style.cart_title}>CART</p>

        <section className={style.content}>
          {this.props.cartItems.map((item, i) => (
            <div className={style.cart_item} key={item.id}>
              <div className={style.cart_description}>
                <span className={style.cart_description_brand}>
                  {item.brand}
                </span>
                <span className={style.cart_description_name}>{item.name}</span>
                <span className={style.cart_description_price}>
                  {this.props.currensySymbol}
                  {this.displayPrice(item)}
                </span>
                <div className={style.cart_description_attributes}>
                  {item.atributes.map((atribute) => (
                    <div key={atribute.id} className={style.atribute}>
                      <p>{atribute.name}:</p>
                      {atribute.id !== "Color"
                        ? atribute.items.map((atributeItem) => (
                            <div
                              key={atributeItem.id}
                              className={`${style.atribute_item} ${
                                item.selectedAtributeId[atribute.name] ===
                                atributeItem.id
                                  ? `${style.selected}`
                                  : ""
                              }`}
                            >
                              {atributeItem.value}
                            </div>
                          ))
                        : atribute.items.map((atributeItem) => {
                            return atributeItem.id ===
                              item.selectedAtributeId.Color ? (
                              <div
                                key={atributeItem.id}
                                style={{
                                  background: `${atributeItem.value}`,
                                }}
                                className={style.atribute_item}
                              ></div>
                            ) : null;
                          })}
                    </div>
                  ))}
                </div>
              </div>
              <div className={style.cart_actions}>
                <div className={""}>
                  <button onClick={() => this.handleIncrease(item.id)}>
                    +
                  </button>
                  <span>{this.props.totalAmount}</span>
                  <button
                    onClick={() => this.handleDecrease(item.amount, item.id)}
                  >
                    -
                  </button>
                </div>
                <Slider dataSlider={item.gallery} />
              </div>
            </div>
          ))}
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.entities,
    currensySymbol: state.currensy.symbol,
    totalAmount: state.cart.totalAmount,
  };
};

export default connect(mapStateToProps, null)(CartPage);
