import axios from "axios";

export const getSearchResults = async (query, pageNo) => {
  console.log(pageNo, "page");

  const apiKey = "927d2b08";
  let searchQuery = query
    ? `https://www.omdbapi.com/?${query}&page=${pageNo}&apikey=${apiKey}`
    : `https://www.omdbapi.com/?s=naruto&page=${pageNo}&apikey=${apiKey}`;

  try {
    const response = await axios.get(searchQuery);
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
