import "./login.css";
import { useContext, useState } from "react";
import { useSnackbar } from 'react-simple-snackbar'

import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { loginUser } from "../../action/user";

export default function Login() {
  const {dispatchUser} = useContext(AppContext)
  const [openSnackbar] = useSnackbar()
  const history = useHistory();
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    type: "",
  });
  const handleChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  // const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formInputs, dispatchUser)
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

  // console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">KrishiMitra</h3>
          <span className="loginDesc">
            Connect with the market and the world is around you on KrishiMitra.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              className="form-control"
              required
              name="email"
              onChange={handleChange}
              value={formInputs.email}
            />
            <input
              placeholder="Password"
              type="password"
              className="form-control"
              required
              minLength="6"
              name="password"
              onChange={handleChange}
              value={formInputs.password}
            />
            <select
              id="inputState"
              className="form-control"
              name="type"
              onChange={handleChange}
              value={formInputs.type}
            >
              <option value="">Who Are You?</option>
              <option value="farmers">Farmer</option>
              <option id="retailors" value="retailors">Retailor</option>
            </select>
            <button className="loginButton" type="submit">
              Log in
            </button>
            {/* <span className="loginForgot">Forgot Password?</span> */}
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="loginRegisterButton"
              type="button"
              to="/register"
            >
              Create new account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
