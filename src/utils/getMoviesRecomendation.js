import { apiInstance } from "./apiInstance";

export const getMoviesRecomendation = async (movieId) => {
    try {
        const response = await apiInstance.get(`movie/${movieId}/recommendations`)
        // console.log(response.data);
        return response.data.results
    } catch (error) {
        console.log(error);
    }
}