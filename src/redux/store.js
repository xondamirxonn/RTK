import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiReduser } from "./service";
import service from "./service";
import UserReducer from "./service/user-reducer";
import { saveState } from "../config/storage";

export const store = configureStore({
  reducer: {
    ...apiReduser,
    user: UserReducer,
  },

  middleware: (defaultMiddleware) => {
    return defaultMiddleware().prepend(service.map((api) => api.middleware));
  },
});

// store.subscribe(() => {
//   saveState("user", store.getState().data?.data);
// });
