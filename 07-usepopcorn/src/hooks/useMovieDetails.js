import { useEffect, useState } from "react";
const API_KEY = "b0a76f1d";

export function useMovieDetails(key) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${key}`
        );

        if (!res.ok)
          throw new Error(
            "Something went wrong with fetching movies. Reload the page."
          );

        const data = await res.json();

        if (data.Response === "False") throw new Error("Error");
        setMovie(data);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
  }, [key]);

  return { movie, isLoading, error };
}
