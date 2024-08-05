export const PRODUCT_CREATE_MODULE_NAME = "PRODUCT_CREATE_MODULE_NAME";

export enum FORM_VALUE_ENUM {
  NAME = "name",
  PRICE = "price",
  DESCRIPTION = "description",
}

export interface FORM_VALUE_INTER {
  [FORM_VALUE_ENUM.NAME]: string;
  [FORM_VALUE_ENUM.PRICE]: number | undefined;
  [FORM_VALUE_ENUM.DESCRIPTION]: string;
}

export type FORM_VALUE_TYPE =
  | FORM_VALUE_ENUM.NAME
  | FORM_VALUE_ENUM.PRICE
  | FORM_VALUE_ENUM.DESCRIPTION;

export const INITIAL_VALUES = {
  [FORM_VALUE_ENUM.NAME]: "",
  [FORM_VALUE_ENUM.PRICE]: undefined,
  [FORM_VALUE_ENUM.DESCRIPTION]: "",
};
export const API = {
  MAIN: {
    TYPE: "POST",
    URL: "http://localhost:4000/api/product/create",
  },
};
