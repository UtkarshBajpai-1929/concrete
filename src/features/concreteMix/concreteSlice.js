import { createSlice } from "@reduxjs/toolkit";
import { fetchMaaCurve } from "./concreteThunk";

const initialMaterialState = {
  min: "",
  max: "",
};

const initialState = {
  maa: {
    q: "",
    dmin: "",
    dmax: "",
  },

  materials: {
    cement: { ...initialMaterialState },
    flyAsh: { ...initialMaterialState },
    ggbs: { ...initialMaterialState },
    underMicroSilica: { ...initialMaterialState },
    microSilica: { ...initialMaterialState },
    sand: { ...initialMaterialState },
    steelFibers: { ...initialMaterialState },
  },

  graph: {
    standardCurve: [],
    loading: false,
    error: null,
  },

  optimization: {
    loading: false,
    error: null,
    success: false,
    results: [],
    selectedResult: null,
  },
};

const concreteSlice = createSlice({
  name: "concreteMix",
  initialState,

  reducers: {
    updateMaaField: (state, action) => {
      const { field, value } = action.payload;

      if (Object.hasOwn(state.maa, field)) {
        state.maa[field] = value;
      }
    },

    updateMaterialField: (state, action) => {
      const { material, field, value } = action.payload;

      if (
        Object.hasOwn(state.materials, material) &&
        Object.hasOwn(state.materials[material], field)
      ) {
        state.materials[material][field] = value;
      }
    },

    clearOptimizationResults: (state) => {
      state.optimization.results = [];
      state.optimization.selectedResult = null;
      state.optimization.success = false;
      state.optimization.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Standard MAA Curve
      .addCase(fetchMaaCurve.pending, (state) => {
        state.graph.loading = true;
        state.graph.error = null;
      })

      .addCase(fetchMaaCurve.fulfilled, (state, action) => {
        state.graph.loading = false;
        state.graph.standardCurve = action.payload;
      })

      .addCase(fetchMaaCurve.rejected, (state, action) => {
        state.graph.loading = false;
        state.graph.error = action.payload;
      });
  },
});

export const {
  updateMaaField,
  updateMaterialField,
  clearOptimizationResults,
} = concreteSlice.actions;

export default concreteSlice.reducer;