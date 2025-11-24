import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FilmList = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/films")
      .then((res) => setFilms(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista Film</h2>
      <div className="row g-4">
        {films.map((film) => (
          <div className="col-12 col-md-6 col-lg-3" key={film.id}>
            <div className="card h-100 shadow-sm position-relative d-flex flex-column">

              <div className="card-img-wrapper position-relative">
                {film.cover_url ? (
                  <img src={film.cover_url} alt={film.title} />
                ) : (
                  <div className="no-image">Nessuna immagine</div>
                )}
                <div className="card-overlay">{film.title}</div>
              </div>

              <div className="p-2 d-flex flex-wrap genres">
                {film.genres &&
                  film.genres.map((g) => (
                    <span className="badge bg-info text-dark" key={g.id}>
                      {g.name}
                    </span>
                  ))}
              </div>

              <div className="p-2 mt-auto">
                <Link
                  to={`/film/${film.id}`}
                  className="btn btn-primary w-100"
                >
                  Dettagli
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmList;
