import { FETCH_ALL_QUESTION, SET_QUESTION_LOADING } from "../actions/question/actionType";

const initialState = {
  data: [],
  id: null,
  defaultAnswer: "",
  question: "",
  isLoading: true
};

const soalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_QUESTION:
      return {
        ...state,
        data: action.payload
      };
    case SET_QUESTION_LOADING:
      return {
        ...state,
        isLoading: action.payload 
      };
    default:
      return state;
  }
};

export default soalReducer;
