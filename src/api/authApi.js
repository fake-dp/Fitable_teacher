
import customAxios from "./customAxios";

export const loginApi = async (phone, password) => {
    try {
        const response = await customAxios.post("/api/trainers/v1/login", { phone, password });
        return response.data;
      } catch (error) {
        console.log("Login failed:", error.response.data);
        throw error.response.data;
      }
};