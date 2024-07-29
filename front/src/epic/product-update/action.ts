import { API, PRODUCT_DATA_INTER } from "./constant";
import axios from "axios";

import HttpRequest from "../../lib/http";
import { AxiosResponse } from "axios";

export const getProduct = async (id: string): Promise<PRODUCT_DATA_INTER> => {
  try {
    const response = await axios.get(`${API.MAIN.URL}/${id}`);

    const productData: PRODUCT_DATA_INTER = {
      name: response.data.name,
      price: response.data.price,
      description: response.data.description,
      id: response.data.id,
    };

    return productData;
  } catch (error) {
    throw new Error(
      (error as any).response?.data?.message ||
        "Something went wrong with the request"
    );
  }
};

export const updProduct = async (
  product: PRODUCT_DATA_INTER
): Promise<AxiosResponse<any>> => {
  try {
    const response = await HttpRequest({
      method: API.UPDATE.TYPE,
      url: `${API.UPDATE.URL}/${product.id}`,
      data: product,
    });
    return response;
  } catch (error) {
    throw new Error(
      (error as any).response?.data?.message ||
        "Something went wrong with the request"
    );
  }
};

export const deleteProduct = async (
  id: string
): Promise<AxiosResponse<any>> => {
  try {
    const response = await HttpRequest({
      method: API.DELETE.TYPE,
      url: `${API.DELETE.URL}/${id}`,
    });
    return response;
  } catch (error) {
    throw new Error(
      (error as any).response?.data?.message ||
        "Something went wrong with the request"
    );
  }
};
