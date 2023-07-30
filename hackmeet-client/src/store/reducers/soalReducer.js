import { FETCH_ALL_QUESTION, GENERATE_RANDOM_QUESTION, SET_QUESTION_LOADING } from "../actions/question/actionType";

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
    case GENERATE_RANDOM_QUESTION:
       return {
        ...state,
        defaultAnswer: state.data[action.payload].defaultAnswer,
        question: state.data[action.payload].question
       }
    default:
      return state;
  }
};

export default soalReducer;
