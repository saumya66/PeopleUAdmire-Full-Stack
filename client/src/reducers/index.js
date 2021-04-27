import { combineReducers } from "redux";
import users from "./auth.js";
import people from "./people.js";
const reducers = combineReducers({ people, users });
export default reducers;
