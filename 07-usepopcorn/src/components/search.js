import { useRef } from "react";
import { useKey } from "../hooks/useKey";

export default function Search({ query, onQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", "keydown", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    onQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
