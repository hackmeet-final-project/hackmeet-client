import { combineReducers } from "redux";
import soalReducer from "./soalReducer";

const rootReducer = combineReducers({
  soal: soalReducer,
});

export default rootReducer;
