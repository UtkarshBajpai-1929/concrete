import { configureStore } from "@reduxjs/toolkit";
import concreteReducer from "../features/concreteMix/concreteSlice";

const store = configureStore({
  reducer: {
    concreteMix: concreteReducer,
  },
});

export default store;
