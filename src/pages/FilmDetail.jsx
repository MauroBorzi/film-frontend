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

  if (!film)
    return <div className="text-center mt-5">Caricamento...</div>;

  return (
    <div className="container mt-4">
      <Link to="/films" className="btn btn-outline-secondary mb-4 hover-grow">
        ← Torna alla lista
      </Link>

      <div className="card shadow-lg border-0 rounded hover-card overflow-hidden">
        <div className="row g-0">

          {/* COPERTINA FILM */}
          <div className="col-md-4 position-relative">
            {film.cover_url ? (
              <img
                src={film.cover_url}
                alt={film.title}
                className="w-100 fixed-img"
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center bg-secondary text-white w-100 fixed-img">
                Nessuna immagine
              </div>
            )}
          </div>

          {/* DETTAGLI */}
          <div className="col-md-8">
            <div className="card-body d-flex flex-column h-100 p-4">
              <h1 className="card-title mb-3">{film.title}</h1>

              <div className="mb-2 text-muted">Anno: {film.year}</div>

              <div className="mb-3 d-flex flex-wrap gap-2">
                {film.genres?.map((g) => (
                  <span className="badge bg-primary text-light" key={g.id}>
                    {g.name}
                  </span>
                ))}
              </div>

              <p className="card-text flex-grow-1" style={{ lineHeight: "1.6" }}>
                {film.description || "Nessuna descrizione disponibile."}
              </p>

              <div className="mt-auto">
                <Link
                  to="/films"
                  className="btn btn-primary w-100 shadow-sm hover-grow"
                >
                  Vedi tutti i film
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hover-card {
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }
        .hover-grow {
          transition: transform .2s ease;
        }
        .hover-grow:hover {
          transform: scale(1.05);
        }
        .fixed-img {
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      `}</style>
    </div>
  );
};

export default FilmDetail;
