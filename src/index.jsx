import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import AppLoader from "./components/hoc/AppLoader";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

const store = setupStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}> 
        <AppLoader>
          <App />
        </AppLoader>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
