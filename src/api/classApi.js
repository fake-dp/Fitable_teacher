import customAxios from "./customAxios";

// 수업명 조회
export const getClassNames = async (id) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${id}/lessons/name`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 수업 종목 조회
export const getClassItem = async (id) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${id}/lessons/item`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 수업 장소 조회
export const getClassPlaces = async (id) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${id}/lessons/location`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 수업 등록
export const registerClass = async (data) => {
    try {
        const response = await customAxios.post("/api/trainers/v1/lessons", data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}