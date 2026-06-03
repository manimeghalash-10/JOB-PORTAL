const BASE_URL = "http://localhost:8080/api";

export const getMessage = async () => {

  try {

    const response = await fetch(`${BASE_URL}/message`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.text();

  } catch (error) {

    console.error("API Error:", error);

    return "Connection Failed";
  }
};