import { Component } from "react";
import { connect } from "react-redux";
import { addCategoriesToStore } from "../../store/actions/categoryActions";
import { addCurrenciesToStore } from "../../store/actions/currensyAction";
import { getTotal } from "../../store/reducers/CartSlice";

class AppLoader extends Component {
  componentDidMount() {
    this.props.addCategoriesToStore();
    this.props.addCurrenciesToStore();
  }

  componentDidUpdate() {
    this.props.getTotal();
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.entities,
  };
};

export default connect(mapStateToProps, {
  addCategoriesToStore,
  addCurrenciesToStore,
  getTotal,
})(AppLoader);
