import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMaaCurve } from "./concreteApi";

export const fetchMaaCurve = createAsyncThunk(
  "concreteMix/fetchMaaCurve",
  async ( /* q, dmin, dmax */_, { rejectWithValue }) => {
    try {
      const response = await getMaaCurve();
      console.log("Fetched MAA Curve:", response); // Log the fetched data for debugging
      return response.std_points;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch MAA curve."
      );
    }
  }
);