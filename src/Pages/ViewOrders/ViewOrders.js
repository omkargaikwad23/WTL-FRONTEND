import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useSnackbar } from "react-simple-snackbar";

import ProductCard from "../../Components/ProductCard/ProductCard";
import Navbar from "../../Components/Navbar/Navbar";
import { changeOrderStatus, loadOrders } from "../../action/order";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import ContactModal from "../../Components/ContactModal/ContactModal";
import { loadRetailor } from "../../action/public";
import Modal from "../../Components/Modal/Modal";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const ViewOrders = (props) => {
  const { products, dispatchProducts } = useContext(AppContext);
  const [openSnackbar] = useSnackbar();
  const productId = props.match.params.id;
  const product = products.find((item) => item._id === productId);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [aopen, setAopen] = useState(false);
  const [aiopen, setAiopen] = useState(false);
  const [retailor, setRetailor] = useState({});
  const [acceptedText, setAcceptText] = useState("");
  const [orderId, setOrderId] = useState("");
  useEffect(() => {
    loadOrders(productId).then((data) => {
      console.log(data);
      if (!data?.error && data?.orders) {
        setOrders(data.orders);
      }
    });
  }, [setOrders, productId]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = async (id) => {
    try {
      const data = await loadRetailor(id);
      if (data?.error) {
        openSnackbar(data.error);
        return;
      }
      setRetailor(data.retailor);
      setOpen(true);
    } catch (e) {
      console.log(e);
      openSnackbar("Something Went Wrong!");
    }
  };
  const handleOpenAccept = (id) => {
    setAcceptText(
      "Order Once Processed! Cannot be processed again! Do you Want to continue?"
    );
    setAopen(true);
    setOrderId(id);
  };
  const handleCloseAccept = (id) => {
    setAcceptText("");
    setAopen(false);
    setOrderId("");
  };
  const handleOpenReject = (id) => {
    setAcceptText(
      "Order Once Processed! Cannot be processed again! Do you Want to continue?"
    );
    setAiopen(true);
    setOrderId(id);
  };
  const handleCloseReject = (id) => {
    setAcceptText("");
    setAiopen(false);
    setOrderId("");
  };

  const handleStatus = async (status) => {
    try {
      const data = await changeOrderStatus(orderId, status, dispatchProducts);
      if (data?.error) {
        console.log(data.error);
        return;
      }
      setAopen(false);
      setAiopen(false);
      setAcceptText("");
      setOrderId("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="container">Product:</h1>
      <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
        <ProductCard key={product._id} product={product} />
      </div>
      <h1 className="container">Orders:</h1>
      <div
        className="container"
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        {orders.map((order) => (
          <div className="orderDetails">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>{order.retailorName}</p>
              <div>
                <p>{order.quantity}kg</p>
                <p>{order.price * order.quantity}₹</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <ColorButton
                variant="outlined"
                style={{ color: "white" }}
                onClick={() => handleOpen(order.retailorId)}
              >
                View Contact Details
              </ColorButton>
              {order.status !== "Accepted" && order.status !== "Rejected" ? (
                <div>
                  <ColorButton
                    variant="outlined"
                    style={{ color: "white", marginRight: "10px" }}
                    onClick={() => handleOpenAccept(order._id)}
                  >
                    Accept
                  </ColorButton>
                  <ColorButton
                    variant="outlined"
                    style={{ color: "white" }}
                    onClick={() => handleOpenReject(order._id)}
                  >
                    Reject
                  </ColorButton>
                </div>
              ) : (
                <div>{order.status}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ContactModal open={open} handleClose={handleClose} retailor={retailor} />
      <Modal
        open={aopen}
        text={acceptedText}
        handleClose={handleCloseAccept}
        handleOk={() => handleStatus("Accepted")}
      />
      <Modal
        open={aiopen}
        text={acceptedText}
        handleClose={handleCloseReject}
        handleOk={() => handleStatus("Rejected")}
      />
    </div>
  );
};

export default ViewOrders;
