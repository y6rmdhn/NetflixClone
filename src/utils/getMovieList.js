import { apiInstance } from "./apiInstance";

export const getMovieList = async (movieList) => {
    try {
        const response = await apiInstance.get(`/movie/${movieList}`)
        // console.log(response.data);
        return response.data.results
        
    } catch (error) {
        console.log(error);
        
    }
}