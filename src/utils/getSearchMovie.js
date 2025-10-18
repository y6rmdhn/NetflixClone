import { apiInstance } from "./apiInstance";

export const getSearchMovie = async (query) => {
    try {
        const response = await apiInstance.get(`search/movie?query=${query}`)
        // console.log(response.data.results);
        return response.data.results;
        
    } catch (error) {
        console.log(error);
    }
}