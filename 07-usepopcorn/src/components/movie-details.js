import { useEffect, useRef, useState } from "react";
import StarRating from "./star-rating";
import Loader from "./loader";
import { useKey } from "../hooks/useKey";
import { useMovieDetails } from "../hooks/useMovieDetails";

export default function MovieDetails({
  selectedId,
  watched,
  onCloseMovie,
  onAddToWatched,
  onUpdateUserRating,
  onRemoveFromWatched,
}) {
  const [userRating, setUserRating] = useState(0);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const countRef = useRef(0);

  useKey("Escape", "keydown", onCloseMovie);
  const { movie, isLoading } = useMovieDetails(selectedId);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

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

  function handleRating(rating) {
    setUserRating(rating);
    onUpdateUserRating(rating, 1, selectedId);
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
      countRatingDecisions: countRef.current,
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
