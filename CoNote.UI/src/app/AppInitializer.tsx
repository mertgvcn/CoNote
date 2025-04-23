import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { initializeAppData } from "./initializeAppData";

const AppInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeAppData());
  }, []);

  return null;
};

export default AppInitializer;
