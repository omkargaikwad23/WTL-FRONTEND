import React, { useContext, useState } from "react";
import { useSnackbar } from 'react-simple-snackbar'

import { placeOrder } from "../../action/order";
import Navbar from "../../Components/Navbar/Navbar";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { AppContext } from "../../context/AppContext";

export default function ProductDetails(props) {
  const { products, user, dispatchProducts } = useContext(AppContext);
  const [openSnackbar] = useSnackbar()
  const productId = props.match.params.id;
  const product = products.find((item) => (item._id = productId));
  const [quantity, setQuantity] = useState("");
  const handleChange = (e) => {
    if (
      parseInt(e.target.value) <= product.remainingQuantity ||
      !e.target.value
    ) {
      setQuantity(parseInt(e.target.value));
    }
  };
  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      const data = await placeOrder(
        { productId: product._id, quantity },
        dispatchProducts
      );
      if (data?.error) {
        openSnackbar(data.error);
        return;
      }
      openSnackbar("Order Placed")
    } catch (e) {
      console.log(e);
      openSnackbar("Something Went Wrong!");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <br />
        <h1>Product details</h1>

        <div className="row">
          <div className="col-md-3" style={{}}>
            <ProductCard product={product} />
          </div>
          {user?.type === "retailors" && (
            <div className="col-md-6 mt-3">
              <h4>Purchase the product</h4>
              <form onSubmit={handlePurchase}>
                <div
                  className="form-row"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  <div className="form-group mb-3 col-md-6 col-12">
                    <label for="inputEmail4">Quantity</label>
                    <input
                      className="form-control"
                      id="purchaseQuantity"
                      placeholder="Quantity in kg"
                      type="number"
                      value={quantity}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  total amount:{" "}
                  <b>{quantity ? parseInt(quantity) * product.price : 0}₹</b>
                </div>

                <div className="">
                  <button type="submit" className="btn btn-primary">
                    Purchase
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
