import { combineReducers } from "redux";
import { userReducer } from "../REDUCERS/user/user.redducer";
import { categoriesReducer } from "../REDUCERS/categories/categories.reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});
