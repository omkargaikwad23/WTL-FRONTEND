import { useSnackbar } from "react-simple-snackbar";
import "./register.css";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import cities from "../../models/cities.json"
import { registerUser } from "../../action/user";

export default function Register() {
  const { dispatchUser } = useContext(AppContext);
  const [openSnackbar] = useSnackbar();
  const history = useHistory();
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    address: "",
    mobile: "",
    type: "",
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
      const data = await registerUser(formInputs, dispatchUser)
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
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">
            KrishiMitra connect to the virtual market from your place
          </h3>
          <span className="loginDesc">
            Connect with the market and the world is around you on KrishiMitra.
          </span>
        </div>
        <div className="loginRight">
          <form
            className="loginBox"
            onSubmit={handleClick}
            style={{ height: "700px" }}
          >
            <input
              placeholder="Name"
              required
              className="form-control"
              name="name"
              value={formInputs.name}
              onChange={handleChange}
            />
            <input
              placeholder="Email"
              type="email"
              required
              className="form-control"
              name="email"
              value={formInputs.email}
              onChange={handleChange}
            />
            <input
              placeholder="Mobile no"
              type="number"
              required
              className="form-control"
              name="mobile"
              value={formInputs.mobile}
              onChange={handleChange}
            />
            <select
              id="inputState"
              className="form-control"
              name="city"
              onChange={handleChange}
              value={formInputs.city}
            >
              <option value="">City</option>
              {cities.data.map((item)=> <option value={item} key={item}>{item}</option>)}
            </select>
            <input
              placeholder="Address"
              // type="number"
              required
              className="form-control"
              name="address"
              value={formInputs.address}
              onChange={handleChange}
            />
            <input
              placeholder="Password"
              type="password"
              required
              min="6"
              className="form-control"
              name="password"
              value={formInputs.password}
              onChange={handleChange}
            />
            <select
              id="inputState"
              className="form-control"
              name="type"
              onChange={handleChange}
              value={formInputs.type}
            >
              <option value="">Who Are You?</option>
              <option value="farmers">Farmers</option>
              <option id="retailors" value="retailors">Retailors</option>
            </select>
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/login"
              >
                Log into Account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
