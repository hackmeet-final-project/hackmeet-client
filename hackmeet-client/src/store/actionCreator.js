import { useDispatch } from "react-redux";
const BASE_URL = " http://localhost:3000";
const TOKENS =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkwNjQwNTk4fQ.JMKHLmHGgp9xYy6WUn73ofzhF4a0mDI3dwseTjt4IuE";

export const fetchSuccess = (data) => {
  return { type: "soal/fetchAll", payload: data };
};
export const loadingSuccess = (data) => {
  return { type: "soal/isLoading", payload: data };
};

export const fetchSoal = () => {
  return (dispatch, getState) => {
    return fetch(BASE_URL + "/questions", {
      headers: {
        access_token: TOKENS,
      },
    })
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
