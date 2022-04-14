import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import brandIcon from "../../../assets/brandIcon.svg";
import cart from "../../../assets/cart.svg";
import down from "../../../assets/down.svg";
import up from "../../../assets/up.svg";
import { currensyChanged } from "../../../store/reducers/CurrensySlice";
import Modal from "../modal/Modal";
import MiniCartItem from "../miniCartItem/MiniCartItem";

class NavBar extends Component {
  state = {
    currensyModal: false,
    miniCartModal: false,
  };

  toggleCurensyModal() {
    this.setState((state) => ({
      currensyModal: !state.currensyModal,
    }));
  }

  toggleMiniCartModal() {
    this.setState((state) => ({
      miniCartModal: !state.miniCartModal,
    }));
  }

  displayPrice() {
    return this.props.symbol === "$"
      ? this.props.totalPrice.USD
      : this.props.symbol === "£"
      ? this.props.totalPrice.GBP
      : this.props.symbol === "A$"
      ? this.props.totalPrice.AUD
      : this.props.symbol === "¥"
      ? this.props.totalPrice.JPY
      : this.props.symbol === "₽"
      ? this.props.totalPrice.RUB
      : "";
  }

  render() {
    return (
      <>
        <nav className={style.navBar}>
          <ul className={style.navBar_list}>
            <li>
              {this.props.categories.map((item, i) => (
                <Link key={i} to={item.name === "all" ? "/" : `/${item.name}`}>
                  {item.name.toUpperCase()}
                </Link>
              ))}
            </li>
            <li>
              <img src={brandIcon} alt="brandIcon" />
            </li>
            <li>
              <div
                onClick={this.toggleCurensyModal.bind(this)}
                className={style.navBar_currency}
              >
                <span>{this.props.symbol}</span>

                <img src={this.state.currensyModal ? up : down} alt="" />
                {this.state.currensyModal ? (
                  <div className={style.currency__modal}>
                    <div className={style.content}>
                      {this.props.currencies.map((c, i) => (
                        <span
                          onClick={() => {
                            this.props.dispatch(currensyChanged(c.symbol));
                          }}
                          key={i}
                        >{`${c.symbol} ${c.label}`}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                className={style.navBar_cart}
                onClick={this.toggleMiniCartModal.bind(this)}
              >
                {this.props.totalAmount !== 0 && (
                  <div>{this.props.totalAmount}</div>
                )}
                <img src={cart} alt="" />
              </div>
            </li>
          </ul>
        </nav>
        <Modal
          active={this.state.miniCartModal}
          setActive={this.toggleMiniCartModal.bind(this)}
        >
          <div className={style.modal_title}>
            <span>My Bag</span>, {this.props.totalAmount} items
          </div>
          {this.props.cartItems.length > 0
            ? this.props.cartItems.map((item) => (
                <MiniCartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.gallery[0]}
                  atributes={item.atributes}
                  amount={item.amount}
                  selectedAtributeId={item.selectedAtributeId}
                />
              ))
            : ""}
          <div className={style.modal_footer}>
            <div className={style.modal_totalPrice}>
              <span>Total</span>
              <span>
                {this.props.symbol}
                {this.displayPrice().toFixed(2)}
              </span>
            </div>
            <div className={style.modal_actions}>
              <div>
                <Link to="/cart">
                  <button onClick={this.toggleMiniCartModal.bind(this)}>
                    VIEW BAG
                  </button>
                </Link>
              </div>
              <div>
                <button>CHECK OUT</button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.entities,
    currencies: state.currensy.entities,
    label: state.currensy.label,
    symbol: state.currensy.symbol,
    cartItems: state.cart.entities,
    totalPrice: state.cart.totalPrice,
    totalAmount: state.cart.totalAmount,
  };
};

export default connect(mapStateToProps, null)(NavBar);
