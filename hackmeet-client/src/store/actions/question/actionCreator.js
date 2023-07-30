import { FETCH_ALL_QUESTION, GENERATE_RANDOM_QUESTION, SET_QUESTION_LOADING } from "./actionType";

const BASE_URL = " http://localhost:3000";

export const fetchSuccess = (data) => {
  return { 
    type: FETCH_ALL_QUESTION,
    payload: data
  };
};
export const setQuestionLoading = (data) => {
  return { 
    type: SET_QUESTION_LOADING,
    payload: data
  };
};
export const generateQuestion = (number) => {
  return {
    type: GENERATE_RANDOM_QUESTION,
    payload: number
  }
}

export const fetchSoal = () => {
  return async(dispatch, getState) => {
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
        dispatch(setQuestionLoading(false))
        return data
      })
      .catch((err) => {
        console.log(err);
      })
  };
};
