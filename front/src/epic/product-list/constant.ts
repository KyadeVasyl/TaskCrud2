export const API = {
  MAIN: {
    TYPE: "GET",
    URL: "http://localhost:4000/product-list",
  },
};

export enum PRODUCT_DATA_ENUM {
  NAME = "name",
  PRICE = "price",
  DESCRIPTION = "description",
  ID = "ID",
}

export interface PRODUCT_DATA {
  [PRODUCT_DATA_ENUM.NAME]: string;
  [PRODUCT_DATA_ENUM.PRICE]: number;
  [PRODUCT_DATA_ENUM.DESCRIPTION]: string;
  [PRODUCT_DATA_ENUM.ID]: number;
}

export interface ComponentInter {
  data: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  handleEdit: (id: number) => void;
}
