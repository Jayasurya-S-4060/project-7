import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMovieById from "../services/getMovieById";
import { BounceLoader } from "react-spinners";

const About = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const getMovie = async () => {
    try {
      const data = await getMovieById(movieId);
      setMovie(data);
    } catch (err) {
      setError("Failed to fetch movie details.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (movieId) {
      getMovie();
    }
  }, [movieId]);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (!movie) {
    return (
      <div className="text-white text-center h-screen flex justify-center items-center">
        <BounceLoader size={70} loading color="hsl(12, 6.5%, 22%)" />
      </div>
    );
  }

  let genreList = movie.Genre.split(",");

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="w-full h-64 overflow-hidden relative">
        <img
          src={movie.Poster || "default-poster.jpg"}
          alt={movie.Title || "Movie Poster"}
          className="w-full h-full object-cover blur-md"
          aria-hidden={!movie.Title ? "true" : "false"}
        />
        <div className="bg-gradient-to-b from-transparent to-black absolute bottom-0 h-40 w-full z-10"></div>
      </div>

      <div className="relative px-6 md:px-12 lg:px-20 -mt-20 z-20">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-40 h-60 md:w-52 md:h-72 overflow-hidden rounded-lg shadow-lg">
            <img
              src={movie.Poster}
              alt={movie.Title || "Movie Poster"}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold">{movie.Title}</h1>
            <div className="text-gray-400">Year: {movie.Year}</div>
            <div className="flex flex-wrap gap-2">
              {genreList.map((genre, key) => (
                <span
                  key={key}
                  className="bg-gray-800 text-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>
            <p>{movie.Plot}</p>
            <div className="grid grid-cols-2">
              <div>
                <p>
                  <strong>Director:</strong> {movie.Director}
                </p>
                <p>
                  <strong>Actors:</strong> {movie.Actors}
                </p>
                <p>
                  <strong>Language:</strong> {movie.Language}
                </p>
              </div>
              <div>
                <p>
                  <strong>Awards:</strong> {movie.Awards}
                </p>
                <p>
                  <strong>Runtime:</strong> {movie.Runtime}
                </p>
                <p>
                  <strong>Box Office:</strong> {movie.BoxOffice}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold">Ratings:</h2>
          <div className="flex flex-col gap-2 mt-2">
            {movie.Ratings.map((rating, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-800/60 opacity-100 px-4 py-2 rounded-md"
              >
                <span className="text-white">{rating.Source}</span>
                <span className="text-white">{rating.Value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
