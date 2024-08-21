import { useEffect, useState } from "react";
import StarRating from "./star-rating";
import Loader from "./loader";
const API_KEY = "b0a76f1d";

export default function MovieDetails({
  selectedId,
  watched,
  onCloseMovie,
  onAddToWatched,
  onUpdateUserRating,
  onRemoveFromWatched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );

        if (!res.ok)
          throw new Error(
            "Something went wrong with fetching movies. Reload the page."
          );

        const data = await res.json();

        if (data.Response === "False") throw new Error("Error");
        setMovie(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    }
    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovie]);

  function handleRating(rating) {
    setUserRating(rating);
    onUpdateUserRating(rating, selectedId);
  }

  function handleAddToWatched() {
    if (isWatched) onRemoveFromWatched(selectedId);

    const newWatchedMovie = {
      imdbID: selectedId,
      poster,
      title,
      year,
      imdbRating: Number(imdbRating),
      userRating: userRating,
      runtime: Number(runtime.split(" ").at(0)),
    };
    onAddToWatched(newWatchedMovie);
  }

  const watchedRating = watched.filter((movie) => movie.imdbID === selectedId);
  const rating = Number(watchedRating[0]?.userRating);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie: ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button onClick={onCloseMovie} className="btn-back">
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={handleRating}
                defaultRating={rating || 0}
              />
              <button
                className={isWatched ? "btn-delete-in-details" : "btn-add"}
                onClick={handleAddToWatched}
              >
                {isWatched ? "Remove from list" : "+ Add to watched"}
              </button>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
