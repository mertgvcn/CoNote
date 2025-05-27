import { useEffect } from "react";
//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { getComponentsByWorksheetId } from "../slices/componentSlice";

export const useComponentData = (worksheetId: number) => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    await dispatch(getComponentsByWorksheetId(worksheetId));
  };

  useEffect(() => {
    if (!worksheetId) return;
    fetchData();
  }, [worksheetId]);
};
