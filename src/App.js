import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/AppContext";
import AppRouter from "./router/AppRouter";
import { loadUser } from "./action/user";
import { loadProducts } from "./action/products";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { dispatchUser, dispatchProducts } = useContext(AppContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await loadUser(dispatchUser);
        if (userData?.error) {
          console.log(userData.error);
        }
        const productsData = await loadProducts(dispatchProducts);
        if (productsData?.error) {
          console.log(productsData.error);
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [setLoading, dispatchUser, dispatchProducts]);
  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <AppRouter />
    </div>
  );
};

export default App;
