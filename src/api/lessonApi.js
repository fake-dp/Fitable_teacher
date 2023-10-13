import customAxios from "./customAxios";

// 수업 상세 api
export const getLessonDetail = async (id) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/lessons/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}