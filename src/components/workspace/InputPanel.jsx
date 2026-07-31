import { useDispatch, useSelector } from "react-redux";
import {
  updateMaaField,
  updateMaterialField,
} from "../../../features/concreteMix/concreteSlice";
import {
  selectMaaParameters,
  selectMaterialConstraints,
} from "../../../features/concreteMix/concreteSelectors";
import MAAParametersCard from "./MAAParametersCard";
import MaterialConstraintsCard from "./MaterialConstraintsCard";
import OptimizeButton from "./OptimizeButton";

const InputPanel = () => {
  const dispatch = useDispatch();
  const maa = useSelector(selectMaaParameters);
  const materials = useSelector(selectMaterialConstraints);

  const handleMaaChange = (field, value) => {
    dispatch(updateMaaField({ field, value }));
  };

  const handleMaterialChange = (material, field, value) => {
    dispatch(updateMaterialField({ material, field, value }));
  };

  return (
    <div className="flex flex-col gap-5">
      <MAAParametersCard maa={maa} onFieldChange={handleMaaChange} />
      <MaterialConstraintsCard
        materials={materials}
        onMaterialChange={handleMaterialChange}
      />
      <OptimizeButton />
    </div>
  );
};

export default InputPanel;
