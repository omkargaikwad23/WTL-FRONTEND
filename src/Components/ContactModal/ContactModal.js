import React from "react";
import "./contact.css";

const ContactModal = ({ open, handleClose, retailor }) => {
  return open ? (
    <div id="myModal" class="modal">
      {/* <!-- Modal content --> */}
      <div class="modal-content">
        <div class="modal-header">
          <h2>{retailor.name}</h2>
          <span class="close" onClick={handleClose}>
            &times;
          </span>
        </div>
        <div class="modal-body">
          <p>Mobile: {retailor.mobile}</p>
          <p>Email: {retailor.email}</p>
          <p>Address: {retailor.address}</p>
          <p>{retailor.city}</p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ContactModal;
