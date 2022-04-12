import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddProduct from "../Pages/AddProduct/AddProduct";
import Home from "../Pages/Home/Home";
import MyOrders from "../Pages/MyOrders/MyOrders";
import Login from "../Pages/Login/Login";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Register from "../Pages/Register/Register";
import PrivateFarmerRoute from "./PrivateFarmerRoute";
import PrivateRetailorRoute from "./PrivateRetailorRoute";
import PublicRoute from "./PublicRoute";
import MyProducts from "../Pages/MyProducts/MyProducts";
import ViewOrders from "../Pages/ViewOrders/ViewOrders";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <PublicRoute path="/login" exact={true} component={Login} />
          <PublicRoute path="/register" exact={true} component={Register} />
          <PrivateFarmerRoute
            path="/addProduct"
            exact={true}
            component={AddProduct}
          />
          <PrivateFarmerRoute
            path="/orders/:id"
            exact={true}
            component={ViewOrders}
          />
          <PrivateFarmerRoute
            path="/myproducts"
            exact={true}
            component={MyProducts}
          />
          <PrivateRetailorRoute
            path="/products/:id"
            exact={true}
            component={ProductDetails}
          />
          <PrivateRetailorRoute
            path="/myorders"
            exact={true}
            component={MyOrders}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
