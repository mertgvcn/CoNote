import { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  selectAuthIsAuthenticated,
  selectAuthLoading,
  validateToken,
} from "../authSlice";

export const useAuthData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectAuthIsAuthenticated);
  const loading = useSelector(selectAuthLoading);

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);

  return { isAuthenticated, loading };
};
