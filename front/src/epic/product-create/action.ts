import { API, FORM_VALUE_INTER } from "./constant";

import HttpRequest from "../../lib/http";
import { AxiosResponse } from "axios";
import i18next from "i18next";

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
        i18next.t("REQUEST_ERROR", { ns: "server" })
    );
  }
};

export default createProduct;
