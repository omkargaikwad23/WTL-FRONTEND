import axios from "axios";

export const placeOrder = async (values, dispatchProducts) => {
  const dbms = JSON.parse(localStorage.getItem("dbms"));
  if (dbms && dbms?.type === "retailors") {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URI}/orders`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dbms.token}`,
      },
      data: values,
    };
    try {
      const res = await axios(options);
      dispatchProducts({
        type: "UPDATE_PRODUCT",
        updates: res.data.product,
        id: values.productId,
      });
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
};

export const changeOrderStatus = async (id, status, dispatchProducts) => {
  const dbms = JSON.parse(localStorage.getItem("dbms"));
  if (dbms && dbms?.type === "farmers") {
    const options = {
      method: "PATCH",
      url: `${process.env.REACT_APP_BACKEND_URI}/orders/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dbms.token}`,
      },
      data: {
        status
      },
    };
    try {
      const res = await axios(options);
      dispatchProducts({
        type: "UPDATE_PRODUCT",
        updates: res.data.product,
        id: res.data.product._id,
      });
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
};

export const loadMyOrders = async () => {
  const dbms = JSON.parse(localStorage.getItem("dbms"));
  if (dbms && dbms?.type === "retailors") {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URI}/orders`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dbms.token}`,
      },
    };
    try {
      const res = await axios(options);
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
};

export const loadOrders = async (productId) => {
  const dbms = JSON.parse(localStorage.getItem("dbms"));
  if (dbms && dbms?.type === "farmers") {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URI}/products/${productId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dbms.token}`,
      },
    };
    try {
      const res = await axios(options);
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
};
