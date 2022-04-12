import axios from "axios";

export const loadRetailor = async (id) => {
  const dbms = JSON.parse(localStorage.getItem("dbms"));
  if (dbms && dbms?.type === "farmers") {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URI}/public/retailors/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dbms.token}`,
      },
    };
    try {
      const res = await axios(options);
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
