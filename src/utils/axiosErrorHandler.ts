import axios, { AxiosError } from "axios";

export function handleAxiosError(error: unknown, apiName: string): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error(
        `${apiName}: HTTP error! status: ${axiosError.response.status}`
      );
      console.log("axiosError.response.data", axiosError.response.data);
      throw new Error(
        `${apiName} API request failed: ${axiosError.response.status} ${axiosError.response.statusText}`
      );
    } else if (axiosError.request) {
      console.error("No response received from the server");
      throw new Error(`No response received from ${apiName} API`);
    } else {
      console.error("Error setting up the request:", axiosError.message);
      throw new Error(`Error setting up the ${apiName} API request`);
    }
  } else {
    console.error("Unexpected error:", error);
    throw new Error(
      `An unexpected error occurred while fetching ${apiName} data`
    );
  }
}
