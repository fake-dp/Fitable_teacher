import customAxios from "./customAxios";

// get myinfo
export const getMyInfo = async () => {
    try {
        const response = await customAxios.get("/api/trainers/v1/info");
        return response.data;
    } catch (error) {
        throw error;
    }
}

// update myinfo
export const updateMyInfo = async ({name, password}) => {
    try {
        const response = await customAxios.put("/api/trainers/v1/info", {name, password});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}