export interface validationMessages {
  required?: string;
  minText?: string;
  maxText?: string;
  positiveNumber?: string;
}

export interface Field {
  name: string;
  type: "text" | "number" | string;
}

export enum FIELD_DATA_ENUM {
  NAME = "name",
  PRICE = "price",
  DESCRIPTION = "description",
}
