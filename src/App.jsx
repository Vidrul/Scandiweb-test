import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar/NavBar";
import CartPage from "./pages/cartPage/CartPage";
import Layout from "./layouts/Layout";

export default class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Switch>
          <Route path="/cart" exact component={CartPage} />
          <Route
            path="/:category?/:productId?"
            exact
            render={({ match }) => (
              <Layout
                params={{
                  category: match.params.category,
                  productId: match.params.productId,
                }}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}
