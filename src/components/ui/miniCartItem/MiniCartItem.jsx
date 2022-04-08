import { Component } from "react";
import { connect } from "react-redux";
import style from "./style.module.scss";
import {
  addToCart,
  decreaseStuffQuantity,
  removeItem,
} from "../../../store/reducers/CartSlice";

class MiniCartItem extends Component {
  displayPrice() {
    const price = this.props.price.find(
      (price) => price.currency.symbol === this.props.symbol
    );

    return price.amount;
  }
  handleDecrease(id) {
    if (this.props.amount > 1) {
      this.props.dispatch(decreaseStuffQuantity({ id }));
    } else {
      this.props.dispatch(removeItem({ id }));
    }
  }

  handleIncrease(id) {
    this.props.dispatch(addToCart({ id }));
  }

  checkSelectedAttribute(name, value) {
    return this.props.selectedAtributeId[name] === value ? style.selected : "";
  }

  render() {
    return (
      <div className={style.card}>
        <div className={style.description}>
          <span>{this.props.name}</span>
          <span>
            {this.props.symbol} {this.displayPrice()}
          </span>
          <div className={style.atributes}>
            {this.props.atributes &&
              this.props.atributes.map((atribute) => (
                <div key={atribute.id} className={style.atributes_item}>
                  {atribute.items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: `${item.value}`,
                        background: this.checkSelectedAttribute(
                          atribute.name,
                          item.id
                        ),
                      }}
                      className={this.checkSelectedAttribute(
                        atribute.name,
                        item.id
                      )}
                    >
                      {atribute.id === "Color" ? "" : item.value}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
        <div className={style.content}>
          <div className={style.content_actions}>
            <button onClick={() => this.handleIncrease(this.props.id)}>
              +
            </button>
            <span>{this.props.amount}</span>
            <button onClick={() => this.handleDecrease(this.props.id)}>
              -
            </button>
          </div>
          <div className={style.card_img}>
            <img src={this.props.image} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    symbol: state.currensy.symbol,
  };
};

export default connect(mapStateToProps, null)(MiniCartItem);
