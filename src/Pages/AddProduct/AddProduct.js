import React, { useContext, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useSnackbar } from "react-simple-snackbar";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { addProduct } from "../../action/products";

export default function AddProduct() {
  const { dispatchProducts } = useContext(AppContext);
  const [openSnackbar] = useSnackbar();
  const history = useHistory();
  const [formInputs, setFormInputs] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });
  const handleChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const data = await addProduct(formInputs, dispatchProducts)
      if(data?.error) {
        openSnackbar(data.error)
        return
      }
      history.push("/")
    }catch(e) {
      console.log(e)
      openSnackbar("Something Went Wrong!")
    }
  };
  return (
    <>
      <Navbar />

      <div className="container addProductForm">
        <br />
        <div>
          <h1>Add new product</h1>
        </div>
        <form onSubmit={handleClick}>
          <div
            className="form-row"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <div className="form-group p-3 col-md-6 col-12">
              <label for="inputEmail4">Name</label>
              <input
                className="form-control"
                id="productName"
                placeholder="Product name"
                name="name"
                value={formInputs.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group p-3 col-md-6 col-12">
              <label for="inputPassword4">Price</label>
              <input
                className="form-control"
                id="productPrice"
                placeholder="Product price per kg"
                name="price"
                value={formInputs.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div
            className="form-row"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <div className="form-group p-3 col-md-6 col-12">
              <label for="inputPassword4">Quantity</label>
              <input
                className="form-control"
                id="productQuantity"
                placeholder="Product quantity (in kg)"
                name="quantity"
                value={formInputs.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group p-3 col-md-6 col-12">
              <label for="inputState">Category</label>
              <select
                id="inputState"
                className="form-control"
                name="category"
                value={formInputs.category}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                <option id="pid1" value="Vegetables">Vegetables</option>
                <option id="pid2" value="Fruits">Fruits</option>
                <option id="pid3" value="Grains">Grains</option>
              </select>
            </div>
          </div>
          <div className="m-3 float-end">
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
