import { useDispatch } from "react-redux";
const BASE_URL = " http://localhost:3000";

export const fetchSuccess = (data) => {
  return { type: "soal/fetchAll", payload: data };
};
export const loadingSuccess = (data) => {
  return { type: "soal/isLoading", payload: data };
};

export const fetchSoal = () => {
  return (dispatch, getState) => {
    return fetch(BASE_URL + "/soal")
      .then((response) => {
        if (!response.ok) {
          throw new Error("someting wong");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        dispatch(fetchSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(loadingSuccess(false)));
  };
};
