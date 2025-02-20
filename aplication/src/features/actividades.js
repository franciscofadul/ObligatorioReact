import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lista: [],
};

export const actividadesSlice = createSlice({
  name: "actividades",
  initialState,
  reducers: {
    ListaTipoActividades: (state, action) => {
      state.lista = action.payload;
    },
  },
});

export const { ListaTipoActividades } = actividadesSlice.actions;
export default actividadesSlice.reducer;
