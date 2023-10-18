import customAxios from "./customAxios";


// 월별 수업 가능 일자 조회 (달력)
export const getLessonCalendar = async ({id, year, month}) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${id}/lessons/dates/year/${year}/month/${month}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 일별 수업 목록 조회
export const getLessonList = async (id, date) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${id}/lessons/date/${date}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}


// 수업 상세 api
export const getLessonDetail = async (id) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/lessons/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}