import axios from "axios";

export const HttpRequest = axios.create({});

const onResponseSuccess = (response: any) => {
  return response.data;
};
const onResponseError = (error: { response: any }) => {
  console.log("ERROR HTTP", error);

  const message = error.response?.data?.message || "ERROR_UNDEFINED";

  if (error.response) {
    switch (error.response.status) {
      case 400:
        error.response.data.message = String(message) || "400";
        break;
      case 404:
        error.response.data.message = String(message) || "404";
        break;
      case 500:
        error.response.data.message = String(message) || "500";
        break;
      default:
        error.response.data.message = message;
        break;
    }
  } else {
    error.response = {
      data: { message: "CLIENT_ERROR" },
      status: 0,
    };
  }

  return Promise.reject(error);
};

HttpRequest.interceptors.response.use(onResponseSuccess, onResponseError);
