import { useEffect } from "react";
//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { getSettingsByWorksheetId } from "../slices/worksheetSlice";

export const useWorksheetData = (worksheetId: number) => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    await dispatch(getSettingsByWorksheetId(worksheetId));
  };

  useEffect(() => {
    if (!worksheetId) return;
    fetchData();
  }, [worksheetId]);
};
