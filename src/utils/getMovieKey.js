import { apiInstance } from "./apiInstance";

export const getMovieKey = async (movie_id) => {
    try {
        const response = await apiInstance.get(`movie/${movie_id}/videos`)
        // console.log(response.data.results[0].key);
        return response.data.results[0].key;
        
    } catch (error) {
        console.log(error);
    }
}