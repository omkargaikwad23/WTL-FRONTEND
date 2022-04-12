import React, { useEffect, useState } from "react";
import { loadMyOrders } from "../../action/order";
import Navbar from "../../Components/Navbar/Navbar";
// import { AppContext } from "../../context/AppContext";

export default function MyOrders() {
//   const { products } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  useEffect(()=> {
      loadMyOrders().then((data)=>{
          if(!data?.error && data?.orders) {
              setOrders(data.orders)
          }
      })
  }, [setOrders]);
  return (
    <div>
      <Navbar />
      <h1 className="container">My Orders</h1>
      <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
        {orders.map((order) => (
          <div className="cardDetails" key={order._id}>
            <h3>{order.name}</h3>
            <h2>{order.price * order.quantity}₹</h2>
            <h4>{order.quantity}kg</h4>
            <h4>{order.status}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
