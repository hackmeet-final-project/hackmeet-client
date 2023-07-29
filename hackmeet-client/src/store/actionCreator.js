import { useDispatch } from "react-redux";
const BASE_URL = " http://localhost:3000";

export const fetchSuccess = (data) => {
  return { type: "soal/fetchAll", payload: data };
};
export const loadingSuccess = (data) => {
  return { type: "soal/isLoading", payload: data };
};

export const fetchSoal = () => {
  console.log(`tesssssssssssssssssssssssssssssssssss`)
  return (dispatch, getState) => {
    return fetch(BASE_URL + "/questions", {
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("someting wong");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchSuccess(data));
        console.log(`tes`)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(loadingSuccess(false)));
  };
};
