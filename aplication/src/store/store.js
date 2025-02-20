import { configureStore } from "@reduxjs/toolkit";
import actividadesReducer from "../features/actividades";

export const store = configureStore({
  reducer: {
    actividades: actividadesReducer,
  },
});
