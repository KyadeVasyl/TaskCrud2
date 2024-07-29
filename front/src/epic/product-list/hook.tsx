import { useQuery } from "@tanstack/react-query";
import getData from "./action";
import { useNavigate } from "react-router-dom";
import Component from "./component";

const UseProductList: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });

  const handleEdit = (id: number) => {
    navigate(`/product-update/${id}`);
  };

  return (
    <Component
      data={data}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      handleEdit={handleEdit}
    />
  );
};

export default UseProductList;
