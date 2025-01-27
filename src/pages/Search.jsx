import { Input, Select, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import * as Yup from "yup";
import { getSearchResults } from "../services/getSearchResults";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Search = () => {
  const formikRef = useRef(null);
  const navigate = useNavigate();
  const [isLoding, setIsLoding] = useState(false);
  const [movies, setMovies] = useState({
    Search: [],
    totalResults: 0,
    currentPage: 1,
  });

  const evaMovies = movies?.Search;
  const totalMovies = movies?.totalResults || 0;

  const goTo = (id) => {
    navigate(`/search/${id}`);
  };

  const getresults = async (query, pageNo, isloadmore) => {
    try {
      await getSearchResults(query, pageNo).then((data) => {
        localStorage.setItem("searchTerm", query);
        if (isloadmore) {
          setMovies((prevState) => ({
            ...data,
            Search: [...prevState.Search, ...data.Search],
            currentPage: pageNo,
          }));
        } else {
          if (data?.Response) {
            setMovies(() => ({
              ...data,
              Search: [...data.Search],
              currentPage: pageNo,
            }));
          } else {
            setMovies(() => ({
              Search: [],
              currentPage: 0,
            }));
          }
        }
      });
      setIsLoding(false);
    } catch (error) {
      console.error("Error fetching results:", error);
      setIsLoding(false);
    }
  };

  const loadMoreMovies = () => {
    setIsLoding(true);
    if (formikRef.current) {
      let isQuery = formikRef.current.values.title
        ? formikRef.current.values
        : "";
      getresults(isQuery, movies.currentPage + 1, "loadmore");
    }
  };

  useEffect(() => {
    let searchTerm = localStorage.getItem("searchTerm");
    getresults(searchTerm, 1);
  }, []);

  return (
    <div className="mt-16 mx-4 md:mx-36">
      <SearchForm formikRef={formikRef} getresults={getresults} />

      {evaMovies.length > 0 ? (
        <div className="mx-16">
          <div className="bg-black min-h-screen py-10">
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
                    className="w-full h-72 object-cover"
                  />
                  <div className="grid mb-4 mt-2">
                    <h2 className="text-md font-semibold mb-1 truncate">
                      {movie.Title}
                    </h2>
                    <p className="text-gray-700 mb-1 capitalize text-sm text-gray-300">{`${movie.Type}.${movie.Year}`}</p>
                  </div>
                </div>
              ))}
            </div>
            {movies.Search.length < totalMovies && (
              <div className="text-center mt-6">
                <Button
                  type="primary"
                  onClick={loadMoreMovies}
                  disabled={isLoding}
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        "No data found"
      )}
    </div>
  );
};

const SearchForm = ({ getresults, formikRef }) => {
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

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        title: "",
        year: "",
        plot: "",
        type: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const filteredValues = removeEmptyFields(values);
        let api = `s=${filteredValues.title}`;

        if (filteredValues.year) {
          api += `&y=${filteredValues.year}`;
        }

        if (filteredValues.type) {
          api += `&type=${filteredValues.type}`;
        }
        getresults(api, 1);
      }}
    >
      {({ setFieldValue, resetForm }) => (
        <Form>
          <div className="grid mb-3 space-y-1">
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
