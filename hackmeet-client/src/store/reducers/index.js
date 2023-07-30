import { combineReducers } from "redux";
import soalReducer from "./soalReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  soal: soalReducer,
  user: userReducer
});

export default rootReducer;
