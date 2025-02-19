import axios from "./api";

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`/products/${id}`);
    return { message: "Product deleted successfully!" };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete product.");
  }
};
