import customAxios from "./customAxios";

// 센터 목록 조회
export const getCenterList = async () => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/integration`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}