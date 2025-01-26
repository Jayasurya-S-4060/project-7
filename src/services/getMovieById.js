import axios from "axios";

export const getMovieById = async (id) => {
  const apiKey = "927d2b08";
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
    );
    const data = response.data;
    if (data.Response === "True") {
      return data;
    } else {
      console.log("No results found.");
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

export default getMovieById;
