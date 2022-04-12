import React, { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { AppContext } from "../../context/AppContext";
import ProductCard from "../../Components/ProductCard/ProductCard";

export default function MyProducts() {
  const { products, user } = useContext(AppContext);
  const myProducts = products.filter((item) => item.farmerId === user._id);
  return (
    <div>
      <Navbar />
      <h1 className="container">My Products</h1>
      <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
        {myProducts.map((product) => (
          <ProductCard key={product._id} product={product} orders/>
        ))}
      </div>
    </div>
  );
}
