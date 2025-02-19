import axios from "axios";

const API_KEY = process.env.REACT_APP_SHIPENGINE_API_KEY;

export const validateAddress = async (address) => {
  try {
    const response = await axios.post(
      "https://api.shipengine.com/v1/addresses/validate",
      { address },
      { headers: { "API-Key": API_KEY, "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("ShipEngine Address Validation Error:", error);
    throw error;
  }
};
