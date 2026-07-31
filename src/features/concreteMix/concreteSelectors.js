export const selectConcreteMix = (state) => state.concreteMix;

export const selectMaaParameters = (state) => state.concreteMix.maa;

export const selectMaterialConstraints = (state) =>
  state.concreteMix.materials;

export const selectOptimization = (state) => state.concreteMix.optimization;
