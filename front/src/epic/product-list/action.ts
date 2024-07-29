import { API } from "./constant";

import HttpRequest from "../../lib/http";
import { AxiosResponse } from "axios";

const getData = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await HttpRequest({
      method: API.MAIN.TYPE,
      url: API.MAIN.URL,
    });
    return response;
  } catch (error) {
    throw new Error(
      (error as any).response?.data?.message ||
        "Something went wrong with the request"
    );
  }
};

export default getData;
