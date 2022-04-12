import React, { useReducer } from "react";
import SnackbarProvider from "react-simple-snackbar";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppContext } from "./context/AppContext";
import userReducer from "./reducers/userReducer";
import productsReducer from "./reducers/productReducer";
import reportWebVitals from "./reportWebVitals";

const Jsx = () => {
  const [user, dispatchUser] = useReducer(userReducer, {});
  const [products, dispatchProducts] = useReducer(productsReducer, []);
  return (
    <AppContext.Provider
      value={{ user, dispatchUser, products, dispatchProducts }}
    >
      <SnackbarProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </SnackbarProvider>
    </AppContext.Provider>
  );
};

ReactDOM.render(<Jsx />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
