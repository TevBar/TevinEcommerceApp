import axios from "axios";
import md5 from "md5";

const CLIENT_ID = process.env.REACT_APP_SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SHOPIFY_CLIENT_SECRET;

export const getProducts = async () => {
  const ts = new Date().getTime();
  const hash = md5(ts + CLIENT_SECRET + CLIENT_ID); // Hash generation

  try {
    const response = await axios.get(
      `https://your-store-name.myshopify.com/admin/api/2023-04/products.json?ts=${ts}&client_id=${CLIENT_ID}&hash=${hash}`
    );
    return response.data.products;
  } catch (error) {
    console.error("Shopify API Error:", error);
    throw error;
  }
};
