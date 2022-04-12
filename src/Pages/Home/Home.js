import React, { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { AppContext } from "../../context/AppContext";

export default function Home() {
  const { products } = useContext(AppContext);
  return (
    <div>
      <Navbar />
      <br/>
      <h2 className="container">Welcome!</h2>
      <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
