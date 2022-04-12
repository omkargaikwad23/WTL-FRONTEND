import React from "react";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const Modal = ({ open, text, handleOk, handleClose }) => {
  return open ? (
    <div id="myModal" class="modal">
      {/* <!-- Modal content --> */}
      <div class="modal-content-ao" style={{background: "White"}}>
        <div class="modal-header">
          <h2>Warning</h2>
          <span class="close" onClick={handleClose}>
            &times;
          </span>
        </div>
        <div class="modal-body">
          <p>{text}</p>
        </div>
        <div
          className="modal-footer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: "10px",
          }}
        >
          <ColorButton variant="outlined" style={{ color: "white" }} onClick={handleOk}>
            Yes
          </ColorButton>
          <ColorButton
            variant="outlined"
            style={{ color: "white" }}
            onClick={handleClose}
          >
            No
          </ColorButton>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
