import { API, FORM_VALUE_INTER } from "./constant";

import HttpRequest from "../../lib/http";
import { AxiosResponse } from "axios";

const createProduct = async (
  newProduct: FORM_VALUE_INTER
): Promise<AxiosResponse<any>> => {
  try {
    const response = await HttpRequest({
      method: API.MAIN.TYPE,
      url: API.MAIN.URL,
      data: newProduct,
    });
    return response;
  } catch (error) {
    throw new Error(
      (error as any).response?.data?.message ||
        "Something went wrong with the request"
    );
  }
};

export default createProduct;
