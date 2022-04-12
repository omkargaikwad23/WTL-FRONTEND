import React, { useContext } from "react";
// import Link from "react-dom"
import "./productCard.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

export default function ProductCard({ product, orders }) {
  const {user} = useContext(AppContext)
  return (
    <div className="cardDetails">
      <h3>{product.name}</h3>
      <h2>{product.price}₹</h2>
      <h4>{product.remainingQuantity}kg</h4>
      <h4>{product.category}</h4>
      {user.type === "retailors" && (
        <div className="startup_details_b mt-2">
          <Link
            to={`/products/${product._id}`}
            style={{ textDecoration: "none" }}
          >
            <ColorButton variant="outlined" style={{ color: "white" }}>
              View more
            </ColorButton>
          </Link>
        </div>
      )}
      {user.type === "farmers" && orders &&  (
        <div className="startup_details_b mt-2">
          <Link
            to={`/orders/${product._id}`}
            style={{ textDecoration: "none" }}
          >
            <ColorButton variant="outlined" style={{ color: "white" }}>
              View Orders
            </ColorButton>
          </Link>
        </div>
      )}
    </div>
  );
}
