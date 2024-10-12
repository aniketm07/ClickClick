import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const useRequireAuth = (stateKeys) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const isStateValid = stateKeys.every(key => location.state?.[key]);
    
    if (!isStateValid) {
      navigate("/")
    }
  }, [navigate, location, stateKeys]);
};
