import { useEffect, useState } from "react";

//Components
import Loader from "./components/loader";
import ErrorMessage from "./components/error-message";

//Navigation components
import Navigation from "./components/navigation";
import Search from "./components/search";
import Logo from "./components/logo";
import FoundResults from "./components/found-results";

//Main components
import Main from "./components/main";
import Box from "./components/box";
import MovieList from "./components/movie-list";
import WatchedSummary from "./components/watched-summary";
import WatchedMovieList from "./components/watched-movie-list";
import MovieDetails from "./components/movie-details";

const API_KEY = "b0a76f1d";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectedMovie(id) {
    setSelectedId((prevId) => (prevId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddToWatched(newWatched) {
    const isAlredyWatched = watched.find(
      (movie) => movie.imdbID === newWatched.imdbID
    );

    setWatched((prevWatched) =>
      isAlredyWatched ? [...prevWatched] : [...prevWatched, newWatched]
    );

    setSelectedId(null);
  }

  function handleUpdateUserRating(newRating, imdbID) {
    setWatched(
      watched.map((movie) =>
        movie.imdbID === imdbID ? { ...movie, userRating: newRating } : movie
      )
    );
  }

  function handleRemoveFromWatched(imdbID) {
    setWatched(watched.filter((movie) => movie.imdbID !== imdbID));
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        setSelectedId(null);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error(
            "Something went wrong with fetching movies. Reload the page."
          );

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navigation>
        <Logo />
        <Search query={query} onQuery={setQuery} />
        <FoundResults movies={movies} />
      </Navigation>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              selectedId={selectedId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddToWatched={handleAddToWatched}
              onUpdateUserRating={handleUpdateUserRating}
              onRemoveFromWatched={handleRemoveFromWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onSelectedMovie={handleSelectedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
