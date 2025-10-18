import { apiInstance } from "./apiInstance";

export const getDetailMovie = async (idMovie) => {
    try {
        const response = await apiInstance.get(`/movie/${idMovie}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}