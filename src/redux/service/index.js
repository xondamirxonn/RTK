import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./todo-api";
import { userApi } from "./user-api";
import UserReducer from "./user-reducer";

export const apiReduser = {
  [todoApi.reducerPath]: todoApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [UserReducer.reducerPath]: UserReducer.reducer,
};

export default [todoApi, userApi];
