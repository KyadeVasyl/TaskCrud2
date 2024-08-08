import { useQuery } from "@tanstack/react-query";
import getData from "./action";
import { useNavigate } from "react-router-dom";
import Component from "./component";
import { PRODUCT_LIST_MODULE_NAME } from "./constant";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: [PRODUCT_LIST_MODULE_NAME],
    queryFn: getData,
  });

  const handleEdit = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <Component
      error={error}
      data={data}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      handleEdit={handleEdit}
    />
  );
};

export default ProductList;
