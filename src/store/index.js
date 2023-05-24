import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "../reducers/todo";

export default configureStore({
  reducer: {
    toDo: toDoReducer
  }
});
