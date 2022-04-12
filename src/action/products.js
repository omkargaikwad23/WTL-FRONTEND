import axios from "axios";

export const loadProducts = async (dispatchProducts) => {
  try {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URI}/products`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios(options);
    dispatchProducts({
      type: "SET_PRODUCTS",
      products: res.data.products,
    });
  } catch (e) {
    console.log(e);
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const addProduct = async (values, dispatchProdcts) => {
  const dbms = JSON.parse(localStorage.getItem("dbms"));
  if (dbms && dbms?.type === "farmers") {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URI}/products`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dbms.token}`,
      },
      data: values
    };
    try {
      const res = await axios(options);
      dispatchProdcts({
        type: "ADD_PRODUCT",
        product: res.data.product
      })
      return res.data;
    } catch (e) {
      console.log(e);
      if (e?.response?.data) {
        return e.response.data;
      }
      return {
        error: "Something Went Wrong",
      };
    }
  }
}
