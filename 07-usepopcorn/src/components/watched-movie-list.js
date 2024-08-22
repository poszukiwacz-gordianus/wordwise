import WatchedMovie from "./watched-movie";

export default function WatchedMovieList({ watched, onSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onSelectedMovie={onSelectedMovie}
        />
      ))}
    </ul>
  );
}
