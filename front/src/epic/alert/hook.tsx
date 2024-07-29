import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Component from "./component";
import { AlertState } from "./constant";

const UseAlert: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");

  const handleBack = () => {
    navigate(-1);
  };

  const { state } = location as { state: AlertState };

  useEffect(() => {
    if (!state || !state.status || !state.message) {
      navigate("/product-create");
    }
  }, [state, navigate]);

  if (!state || !state.status || !state.message) {
    return null;
  }

  return <Component handleBack={handleBack} state={state} message={message} />;
};

export default UseAlert;
