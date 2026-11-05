import { useEffect, useState } from "react";
import { Search, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { searchUsers } from "../services/searchService";
import { getApiErrorMessage } from "../services/api";

function SearchBox() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchText = query.trim();

    if (!searchText) {
      setUsers([]);
      setError("");
      setIsLoading(false);
      return;
    }

    let isCurrent = true;
    setIsLoading(true);
    setError("");

    searchUsers({ q: searchText })
      .then((results) => {
        if (isCurrent) setUsers(results);
      })
      .catch((searchError) => {
        if (isCurrent) setError(getApiErrorMessage(searchError));
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [query]);

  return (
    <div className="relative min-w-0 w-full max-w-xl flex-1 lg:ml-auto">
      <label className="relative block" aria-label="Search students">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search students by name..."
          className="w-full rounded-2xl border border-line bg-white py-3 pl-11 pr-4 text-sm text-brand-navy-dark shadow-sm outline-none placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
          aria-expanded={isOpen}
          aria-controls="search-results"
        />
      </label>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close search results"
            onClick={() => setIsOpen(false)}
          />

          <div
            id="search-results"
            className="absolute left-0 right-0 top-[calc(100%+0.65rem)] z-50 max-h-[min(70vh,34rem)] overflow-y-auto rounded-3xl border border-line bg-white p-3 shadow-card sm:p-4"
          >
            {!query.trim() && (
              <p className="px-2 py-5 text-center text-sm text-muted">
                Enter a student name to search.
              </p>
            )}

            {isLoading && (
              <p
                role="status"
                className="px-2 py-5 text-center text-sm text-muted"
              >
                Searching students...
              </p>
            )}

            {!isLoading && error && (
              <p
                role="alert"
                className="px-2 py-5 text-center text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {!isLoading && !error && query.trim() && users.length === 0 && (
              <p className="px-2 py-5 text-center text-sm text-muted">
                No students found.
              </p>
            )}

            {!isLoading && !error && users.length > 0 && (
              <ul className="divide-y divide-slate-100">
                {users.map((student) => (
                  <li key={student.id}>
                    <Link
                      to={`/profile/${student.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-2xl px-2 py-3 hover:bg-page"
                    >
                      {student.profilePicture ? (
                        <img
                          src={student.profilePicture}
                          alt=""
                          className="h-10 w-10 rounded-xl object-cover"
                        />
                      ) : (
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#d9eedc] text-brand-green">
                          <UserRound className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}

                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-brand-navy-dark">
                          {student.fullName}
                        </span>
                        <span className="block truncate text-xs text-muted">
                          {student.fieldOfStudy || "Student"}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchBox;
