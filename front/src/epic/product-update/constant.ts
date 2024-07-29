import { FormikValues } from "formik";

export enum PRODUCT_DATA_ENUM {
  NAME = "name",
  PRICE = "price",
  DESCRIPTION = "description",
  ID = "id",
}

export interface ComponentInter {
  data: PRODUCT_DATA_INTER | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
  deleteProduct: Function;
  updateProduct: (values: PRODUCT_DATA_INTER) => void;
  formik: FormikValues;
  isFieldError: Function;
  getFieldError: Function;
  isSubmitDisabled: () => boolean;
  getFieldValue: Function;
}

export interface PRODUCT_DATA_INTER {
  [PRODUCT_DATA_ENUM.NAME]: string;
  [PRODUCT_DATA_ENUM.PRICE]: number;
  [PRODUCT_DATA_ENUM.DESCRIPTION]: string;
  [PRODUCT_DATA_ENUM.ID]: number;
}

export type PRODUCT_VALUE_TYPE =
  | PRODUCT_DATA_ENUM.NAME
  | PRODUCT_DATA_ENUM.PRICE
  | PRODUCT_DATA_ENUM.DESCRIPTION;

export const INITIAL_VALUES = {
  [PRODUCT_DATA_ENUM.NAME]: "",
  [PRODUCT_DATA_ENUM.PRICE]: 0,
  [PRODUCT_DATA_ENUM.DESCRIPTION]: "",
  [PRODUCT_DATA_ENUM.ID]: 0,
};

export const API = {
  MAIN: {
    TYPE: "GET",
    URL: `http://localhost:4000/product-update`,
  },

  UPDATE: {
    TYPE: "PUT",
    URL: `http://localhost:4000/product-update`,
  },

  DELETE: {
    TYPE: "DELETE",
    URL: `http://localhost:4000/product-update`,
  },
};
