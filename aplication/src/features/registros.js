import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lista: [], 
};

export const registrosSlice = createSlice({
  name: "registros",
  initialState,
  reducers: {
    ListaRegistros: (state, action) => {
      state.lista = action.payload;
    },

  },
});

export const { ListaRegistros} = registrosSlice.actions;
export default registrosSlice.reducer;