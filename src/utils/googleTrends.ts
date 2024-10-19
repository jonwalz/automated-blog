import axios from "axios";
import { handleAxiosError } from "./axiosErrorHandler";
import { GoogleTrendsResponse } from "../types/google-trends";

export async function fetchGoogleTrendsData() {
  const apiKey = process.env.SERPAPI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "SERPAPI_API_KEY is not defined in the environment variables"
    );
  }

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const formattedDate =
    oneDayAgo.getFullYear() +
    String(oneDayAgo.getMonth() + 1).padStart(2, "0") +
    String(oneDayAgo.getDate()).padStart(2, "0");

  try {
    const response = await axios.get<GoogleTrendsResponse["data"]>(
      "https://serpapi.com/search.json",
      {
        params: {
          engine: "google_trends_trending_now",
          frequency: "daily",
          date: formattedDate,
          api_key: apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Google Trends");
  }
}
