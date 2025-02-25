import { configureStore } from "@reduxjs/toolkit";
import actividadesReducer from "../features/actividades";
import registrosReducer from "../features/registros";

export const store = configureStore({
  reducer: {
    actividades: actividadesReducer,
    registros: registrosReducer
  },
});
