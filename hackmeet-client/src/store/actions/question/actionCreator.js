import { Axios } from "../../../config/axios";
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
    try {
      const {data} = await Axios.get("/questions", {
        headers: {
          access_token: localStorage.access_token,
        },
      })
      dispatch(fetchSuccess(data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setQuestionLoading(false))
    }
  };
};
