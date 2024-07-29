import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useValidationSchema } from "../../lib/validation";
import {
  PRODUCT_DATA_ENUM,
  PRODUCT_DATA_INTER,
  PRODUCT_VALUE_TYPE,
  INITIAL_VALUES,
} from "./constant";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getProduct, deleteProduct, updProduct } from "./action";
import Component from "./component";
import { AxiosResponse } from "axios";

const UseProductItem: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams<{ id: string | undefined }>();
  const validationSchema = useValidationSchema();

  const [initialValues, setInitialValues] =
    useState<PRODUCT_DATA_INTER>(INITIAL_VALUES);

  const [product, setProduct] = useState<PRODUCT_DATA_INTER | null>(null);

  const onSuccess = (data: PRODUCT_DATA_INTER) => {
    if (data) {
      setInitialValues({
        name: data[PRODUCT_DATA_ENUM.NAME],
        price: data[PRODUCT_DATA_ENUM.PRICE],
        description: data[PRODUCT_DATA_ENUM.DESCRIPTION],
        id: data[PRODUCT_DATA_ENUM.ID],
      });
      setProduct(data);
      console.log(product);
    }
  };

  const onError = (error: any) => {
    navigate("/alert", {
      state: {
        status: "error",
        message: error.message,
      },
    });
  };

  const queryOptions = {
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    onSuccess: onSuccess,
    onError: onError,
  };

  const { data, isLoading, isSuccess, isError, error } = useQuery<
    PRODUCT_DATA_INTER,
    Error
  >(queryOptions);

  useEffect(() => {
    if (data) {
      console.log("Data from server:", data);
      setInitialValues((prevState) => ({
        ...prevState,
        name: data[PRODUCT_DATA_ENUM.NAME],
        price: data[PRODUCT_DATA_ENUM.PRICE],
        description: data[PRODUCT_DATA_ENUM.DESCRIPTION],
        id: data[PRODUCT_DATA_ENUM.ID],
      }));
      setProduct(data);
      console.log("Updated initialValues:", initialValues);
      console.log("Updated product:", product);
    }
  }, [data]);

  const updateAction: UseMutationOptions<
    AxiosResponse<any>,
    Error,
    PRODUCT_DATA_INTER
  > = {
    mutationFn: updProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      navigate("/product-list");
    },
    onError,
  };

  const {
    mutate: updateProduct,
  }: UseMutationResult<
    AxiosResponse<any>,
    Error,
    PRODUCT_DATA_INTER
  > = useMutation(updateAction);

  const deleteAction: UseMutationOptions<AxiosResponse<any>, Error, void> = {
    mutationFn: () => deleteProduct(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/product-list");
    },
    onError: onError,
  };

  const {
    mutate: deleteProductMutation,
  }: UseMutationResult<AxiosResponse<any>, Error, void> = useMutation(
    deleteAction
  );

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values: PRODUCT_DATA_INTER) => {
      updateProduct(values);
    },
  });

  const isFieldError = (name: PRODUCT_VALUE_TYPE): boolean => {
    return formik.errors[name] && formik.touched[name] ? true : false;
  };

  const getFieldError = (name: PRODUCT_VALUE_TYPE): string | undefined => {
    return isFieldError(name) ? formik.errors[name] : undefined;
  };

  const isSubmitDisabled = () => {
    if (!formik.isValid || !formik.dirty) {
      return true;
    }

    return false;
  };

  const getFieldValue = (name: PRODUCT_VALUE_TYPE): string | number =>
    formik.values[name];

  return (
    <Component
      formik={formik}
      data={data}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
      updateProduct={updateProduct}
      deleteProduct={deleteProductMutation}
      getFieldError={getFieldError}
      isSubmitDisabled={isSubmitDisabled}
      isFieldError={isFieldError}
      getFieldValue={getFieldValue}
    />
  );
};

export default UseProductItem;
