import { createSlice } from "@reduxjs/toolkit";
import { saveState } from "../../config/storage";
import { loadState } from "./../../config/storage";

const initialState =  {
  users: [],
};

const UserReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    add: (state, action) => {
      const us = state.users.find((item) => item.id === action.payload.id);

      if (!us) {
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      }

      return state;
    },
  },
});

export const { add } = UserReducer.actions;

export default UserReducer;
