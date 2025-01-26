import { Input, Select, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup"; // For validation schema
import { getSearchResults } from "../services/getSearchResults";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Search = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState({
    Search: [],
    totalResults: 0,
  });

  const defaultData = useMemo(
    () => [
      {
        Title: "Avatar",
        Year: "2009",
        imdbID: "tt0499549",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg",
      },
      {
        Title: "Avatar: The Way of Water",
        Year: "2022",
        imdbID: "tt1630029",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BNmQxNjZlZTctMWJiMC00NGMxLWJjNTctNTFiNjA1Njk3ZDQ5XkEyXkFqcGc@._V1_SX300.jpg",
      },
      {
        Title: "Avatar: The Last Airbender",
        Year: "2005–2008",
        imdbID: "tt0417299",
        Type: "series",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMDMwMThjYWYtY2Q2OS00OGM2LTlkODQtNDJlZTZmMjAyYmFhXkEyXkFqcGc@._V1_SX300.jpg",
      },
      {
        Title: "Avatar: The Last Airbender",
        Year: "2024–",
        imdbID: "tt9018736",
        Type: "series",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BZjQ1YTZmMjItZmZkMC00MGVmLTk1OTUtNzQzZTJjZGM1NjVlXkEyXkFqcGc@._V1_SX300.jpg",
      },
      {
        Title: "The King's Avatar",
        Year: "2019",
        imdbID: "tt10732794",
        Type: "series",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BZTdmZWM1MDgtNGI3Ni00NjM0LTgwNjItYjgxMzc5YTIxNDE5XkEyXkFqcGc@._V1_SX300.jpg",
      },
      {
        Title: "Dasham Avatar",
        Year: "2023",
        imdbID: "tt27561990",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BYjZjNWE4NDItNTQzZi00YTNjLWEyOTctMjk1MWE5YzgzNmRiXkEyXkFqcGc@._V1_SX300.jpg",
      },
      {
        Title: "The King's Avatar",
        Year: "2017–",
        imdbID: "tt6859260",
        Type: "series",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BZjljOTI1NzItNjhjOS00YWEyLWEwODktNmEyYWFhYzhjZDgwXkEyXkFqcGc@._V1_SX300.jpg",
      },
      {
        Title: "Avatar: The Last Airbender - The Legend of Aang",
        Year: "2006",
        imdbID: "tt0959552",
        Type: "game",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BNjUwNzA5Nzc4N15BMl5BanBnXkFtZTgwNjM1ODY4MDE@._V1_SX300.jpg",
      },
      {
        Title: "Avatar: The Game",
        Year: "2009",
        imdbID: "tt1517155",
        Type: "game",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMTYxODI2OTI4MF5BMl5BanBnXkFtZTcwNjI1NzMwMw@@._V1_SX300.jpg",
      },
      {
        Title: "Avatar: The Last Airbender - The Legend So Far",
        Year: "2005",
        imdbID: "tt1605838",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMTc0M2RmMTQtNGQ2Zi00ODkzLWJlMzUtYmQyYTBkNGQ2MDA3XkEyXkFqcGc@._V1_SX300.jpg",
      },
    ],
    []
  );

  const goTo = (id) => {
    navigate(`search/${id}`);
  };

  const evaMovies = movies?.Search;

  return (
    <div className="mt-24 mx-4 md:mx-10">
      <SearchForm movies={movies} setMovies={setMovies} />

      {evaMovies ? (
        <div className="mx-16  ">
          <div className="bg-black min-h-screen py-10 ">
            <h1 className="text-4xl font-bold text-center mb-8"></h1>
            <div className="container overflow-hidden px-4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
              {evaMovies.map((movie, index) => (
                <div
                  key={index}
                  onClick={() => goTo(movie.imdbID)}
                  className="hover:cursor-pointer rounded-md text-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform"
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-72 object-cover "
                  />
                  <div className="grid mb-4">
                    <h2 className="text-md font-semibold mb-2 truncate">
                      {movie.Title}
                    </h2>
                    <p className="text-gray-700 mb-1 capitalize">{`${movie.Type}.${movie.Year}`}</p>
                    <p className="text-gray-700"></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        "No data found"
      )}
    </div>
  );
};

const SearchForm = ({ movies, setMovies }) => {
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Enter title to search")
      .min(3, "Must be at least 3 characters"),
    year: Yup.string(),
    plot: Yup.string(),
    type: Yup.string(),
  });

  const format = useMemo(
    () => [
      { value: "movie", label: "Movie" },
      { value: "series", label: "Series" },
      { value: "episode", label: "Episode" },
    ],
    []
  );

  const years = useMemo(() => {
    const years = [];
    for (let i = 1940; i <= 2025; i++) {
      years.push({ value: i, label: i });
    }
    return years;
  }, []);

  const removeEmptyFields = (values) => {
    return Object.fromEntries(
      Object.entries(values).filter(([value]) => value !== "")
    );
  };

  const StoreData = async (api) => {
    try {
      await getSearchResults(api, 1).then((data) => {
        setMovies(data);
      });
    } catch {
      console.error("Error fetching results:");
    }
  };

  const getresults = async (query) => {
    let api = `s=${query.title}`;

    if (query.year) {
      api += `&y=${query.year}`;
    }

    if (query.type) {
      api += `&type=${query.type}`;
    }

    try {
      StoreData(api);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  useEffect(() => {
    StoreData("");
  }, []);
  return (
    <Formik
      initialValues={{
        title: "",
        year: "",
        plot: "",
        type: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const filteredValues = removeEmptyFields(values);
        getresults(filteredValues);
      }}
    >
      {({ setFieldValue, resetForm }) => (
        <Form>
          <div className="grid mb-3 space-y-1 ">
            <label htmlFor="title">Search</label>
            <Field
              className="input-field-custom"
              as={Input}
              id="title"
              name="title"
              placeholder="Search the movie"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-sm"
              style={{ font: "2px" }}
            />
          </div>

          <div className="flex w-full justify-between gap-4">
            <div className="flex flex-col w-full space-y-3 mb-2 ">
              <label htmlFor="type">Format</label>
              <Field name="type" style={{ width: "100%" }}>
                {({ field }) => (
                  <Select
                    {...field}
                    placeholder="Any"
                    onChange={(value) => setFieldValue("type", value)}
                    style={{ width: "100%" }}
                  >
                    {format.map((option) => (
                      <Option
                        key={option.value}
                        value={option.value}
                        className="text-white"
                      >
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Field>
            </div>

            <div className="flex flex-col w-full space-y-3">
              <label htmlFor="year">Year</label>
              <Field name="year">
                {({ field }) => (
                  <Select
                    {...field}
                    placeholder="Any"
                    onChange={(value) => setFieldValue("year", value)}
                    style={{ width: "100%" }}
                  >
                    {years.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Field>
            </div>
          </div>

          <div className="w-full flex justify-end gap-2">
            <Button
              type="primary"
              onClick={() => resetForm()}
              className="text-white"
              htmlType="reset"
            >
              Clear
            </Button>
            <Button type="primary" className="text-white" htmlType="submit">
              Search
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Search;
