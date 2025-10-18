import { apiInstanceExpress } from "./apiInstance";

export const checkFavoriteMovie = async ({ emailStorage, tokenStorage, idMovie }) => {
    try {
      const isFavorited = await apiInstanceExpress.post("my-movies/check", {
        email: emailStorage,
        token: tokenStorage,
        movieID: idMovie,
      });
      console.log(isFavorited);
      
      if (isFavorited.status === 200) {
        return isFavorited.data.data.isFavorited
      }
    } catch (error) {
      console.log(error);
    }
  };