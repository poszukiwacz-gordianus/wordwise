import { useState } from "react";

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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  const [watched, setWatched] = useLocalStorageState([], "watched");
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

    // if (!isAlredyWatched) {
    //   localStorage.setItem("watched", JSON.stringify([...watched, newWatched]));
    // }

    setSelectedId(null);
  }

  function handleUpdateUserRating(newRating, newCount, imdbID) {
    setWatched(
      watched.map((movie) =>
        movie.imdbID === imdbID
          ? {
              ...movie,
              userRating: newRating,
              countRatingDecisions: movie.countRatingDecisions + newCount,
            }
          : movie
      )
    );
  }

  function handleRemoveFromWatched(imdbID) {
    setWatched(watched.filter((movie) => movie.imdbID !== imdbID));
  }

  const { movies, isLoading, error } = useMovies(query);

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
