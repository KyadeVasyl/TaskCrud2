import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Component from "./component";
import { AlertState } from "./constant";
import { PRODUCT_CREATE_PAGE_PATH } from "../../page/product-create";

const Alert: React.FC = () => {
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
      navigate(PRODUCT_CREATE_PAGE_PATH);
    }
  }, [state, navigate]);

  if (!state || !state.status || !state.message) {
    return null;
  }

  return <Component handleBack={handleBack} state={state} message={message} />;
};

export default Alert;
