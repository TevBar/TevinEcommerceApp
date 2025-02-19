import axios from "axios";
// eslint-disable-next-line no-unused-vars
const APP_ID = process.env.REACT_APP_SQUARE_APP_ID;
const ACCESS_TOKEN = process.env.REACT_APP_SQUARE_ACCESS_TOKEN;

export const createPayment = async (amount, sourceId) => {
  try {
    const response = await axios.post(
      "https://connect.squareupsandbox.com/v2/payments",
      {
        amount_money: { amount, currency: "USD" },
        source_id: sourceId,
      },
      {
        headers: {
          "Square-Version": "2023-04-01",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Square Payment API Error:", error);
    throw error;
  }
};
