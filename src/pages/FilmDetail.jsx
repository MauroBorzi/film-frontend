import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const apiBase = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const FilmDetail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiBase}/api/films/${id}`)
      .then((res) => setFilm(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!film) return <div className="text-center mt-5">Caricamento...</div>;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        ← Torna alla lista
      </Link>

      <div className="card shadow-sm">
        <div className="row g-0">

          <div className="col-md-4 d-flex align-items-stretch">
            {film.cover_url ? (
              <img
                src={film.cover_url}
                alt={film.title}
                className="img-fluid rounded-start h-100 w-100"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center bg-light rounded-start w-100">
                Nessuna immagine
              </div>
            )}
          </div>

          <div className="col-md-8">
            <div className="card-body d-flex flex-column h-100">
              <h1 className="card-title mb-3">{film.title}</h1>

              <div className="mb-2 text-muted">Anno: {film.year}</div>

              <div className="mb-3">
                {film.genres &&
                  film.genres.map((g) => (
                    <span className="badge bg-info text-dark me-1 mb-1" key={g.id}>
                      {g.name}
                    </span>
                  ))}
              </div>

              <p className="card-text flex-grow-1" style={{ lineHeight: "1.6" }}>
                {film.description || "Nessuna descrizione disponibile."}
              </p>

              <div className="mt-auto">
                <Link to="/films" className="btn btn-primary">
                  Vedi tutti i film
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
