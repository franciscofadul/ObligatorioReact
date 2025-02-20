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
    AgregarActividad: (state, action) => {
      state.lista.push(action.payload);
    },
    EliminarActividad: (state, action) => {
      state.lista = state.lista.filter(
        (actividad) => actividad.id !== action.payload
      );
    },
  },
});

export const { ListaTipoActividades,AgregarActividad,EliminarActividad } = actividadesSlice.actions;
export default actividadesSlice.reducer;
