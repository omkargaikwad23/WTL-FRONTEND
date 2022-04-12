import axios from "axios";

export const loadUser = async (dispatchUser) => {
  const dbms = JSON.parse(localStorage.getItem("dbms"));
  if (dbms) {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URI}/${dbms.type}/me`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dbms.token}`,
      },
    };
    try {
      const res = await axios(options);
      dispatchUser({
        type: "SET_USER",
        user: {
          ...res.data,
          type: dbms.type,
        },
      });
      return {
        ...res.data,
        type: dbms.type,
      };
    } catch (e) {
      console.log(e);
      if (e?.response?.data) {
        return e.response.data;
      }
      return {
        error: "Something Went Wrong",
      };
    }
  }
};

export const loginUser = async (values, dispatchUser) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URI}/${values.type}/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: values,
  };
  try {
    const res = await axios(options);
    if(values.type === "farmers") {
      dispatchUser({
        type: "SET_USER",
        user: {
          ...res.data.farmer,
          type: values.type,
        },
      });
    } else {
      dispatchUser({
        type: "SET_USER",
        user: {
          ...res.data.retailor,
          type: values.type,
        },
      });
    }
    localStorage.setItem(
      "dbms",
      JSON.stringify({ token: res.data.token, type: values.type })
    );
    return {
      ...res.data,
      type: values.type,
    };
  } catch (e) {
    console.log(e);
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const registerUser = async (values, dispatchUser) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URI}/${values.type}/register`,
    headers: {
      "Content-Type": "application/json",
    },
    data: values,
  };
  try {
    const res = await axios(options);
    if(values.type === "farmers") {
      dispatchUser({
        type: "SET_USER",
        user: {
          ...res.data.farmer,
          type: values.type,
        },
      });
    } else {
      dispatchUser({
        type: "SET_USER",
        user: {
          ...res.data.retailor,
          type: values.type,
        },
      });
    }
    localStorage.setItem(
      "dbms",
      JSON.stringify({ token: res.data.token, type: values.type })
    );
    return {
      ...res.data,
      type: values.type,
    };
  } catch (e) {
    console.log(e);
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const logoutUser = async (dispatchUser) => {
  const dbms = JSON.parse(localStorage.getItem("dbms"));
  if (dbms) {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URI}/${dbms.type}/logout`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dbms.token}`,
      },
    };
    try {
      const res = await axios(options);
      localStorage.removeItem("dbms");
      dispatchUser({
        type: "RESET_USER",
      });
      return res.data;
    } catch (e) {
      console.log(e);
      if (e?.response?.data) {
        return e.response.data;
      }
      return {
        error: "Something Went Wrong",
      };
    }
  }
};
