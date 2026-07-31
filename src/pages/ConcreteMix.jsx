import { useDispatch, useSelector } from "react-redux";
import ConcreteHero from "../components/concrete-mix/workspace/ConcreteHero";
import Workspace from "../components/concrete-mix/workspace/Workspace";
import Navigation from "../components/layout/Navigation";
import { fetchMaaCurve } from "../features/concreteMix/concreteThunk";
import { useEffect } from "react";

const ConcreteMix = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    console.log("Dispatching fetchMaaCurve action...");
    dispatch(fetchMaaCurve());
  }, [dispatch]);
  return (
    <>
    <ConcreteHero/>
    <Navigation/>
    <Workspace/>
    </>
  );
};

export default ConcreteMix;