import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../action/user";
import { AppContext } from "../../context/AppContext";

export default function Navbar() {
  const { user, dispatchUser } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      const data = await logoutUser(dispatchUser);
      if (data?.error) {
        console.log(data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <Link className="navbar-brand" to="/">
            KrishiMitra
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                {user?.type === "farmers" && (
                  <Link className="nav-link" to="/addProduct">
                    Add Product
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {user?.type === "retailors" && (
                  <Link className="nav-link" to="/myorders">
                    My Orders
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {user?.type === "farmers" && (
                  <Link className="nav-link" to="/myproducts">
                    My Products
                  </Link>
                )}
              </li>
              <li>
                {!user._id && (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
              <li>
                {user._id && (
                  <button
                    className="nav-link btn btn-info"
                    to="/login"
                    style={{ border: "none", color: "white" }}
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                )}
              </li>
            </ul>
            {/* <form
              className="form-inline my-2 my-lg-0"
              style={{ display: "flex" }}
            >
              <input
                className="form-control m-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-primary m-2" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </nav>
      </div>
    </div>
  );
}
