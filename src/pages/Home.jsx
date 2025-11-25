import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const apiBase = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const Home = () => {
  const [latest, setLatest] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);

  useEffect(() => {
    // ultimi film
    axios
      .get(`${apiBase}/api/films`)
      .then((res) => setLatest(res.data.slice(0, 4)))
      .catch((err) => console.error(err));

    // film più visti
    axios
      .get(`${apiBase}/api/films?sort=views`) // oppure '?ordering=-views' a seconda dell'API
      .then((res) => setMostViewed(res.data.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  const renderFilmCard = (film) => (
    <div className="col-12 col-md-6 col-lg-3" key={film.id}>
      <div className="card h-100 shadow-lg border-0 rounded hover-card">
        <div className="position-relative overflow-hidden rounded-top">
          {film.cover_url ? (
            <img
              src={film.cover_url}
              alt={film.title}
              className="w-100 card-img-top img-zoom fixed-img"
            />
          ) : (
            <div className="no-image bg-secondary text-white text-center p-4">
              Nessuna immagine
            </div>
          )}

          <div
            className="position-absolute bottom-0 w-100 text-white text-center py-2 px-2"
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(3px)",
            }}
          >
            <strong>{film.title}</strong>
          </div>
        </div>

        <div className="p-3 d-flex flex-wrap gap-2">
          {film.genres?.map((g) => (
            <span className="badge bg-primary text-light" key={g.id}>
              {g.name}
            </span>
          ))}
        </div>

        <div className="p-3 mt-auto">
          <Link
            to={`/film/${film.id}`}
            className="btn btn-primary w-100 shadow-sm hover-grow"
          >
            Dettagli
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="py-5 text-white"
        style={{
          background: "linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)",
        }}
      >
        <div className="container text-center py-5">
          <h1 className="display-3 fw-bold mb-3 fade-in">
            🎬 Benvenuto nella Film App
          </h1>
          <p className="lead mb-4 fade-in">
            Esplora centinaia di film con descrizioni, generi e dettagli
            aggiornati.
          </p>
          <Link
            to="/films"
            className="btn btn-light btn-lg px-4 py-2 shadow-sm hover-grow"
          >
            Vai alla lista Film
          </Link>
        </div>
      </section>

      {/* ULTIMI FILM */}
      <section className="container my-5">
        <h2 className="text-center mb-5 fw-bold">✨ Ultimi Film Aggiunti</h2>
        <div className="row g-4">{latest.map(renderFilmCard)}</div>
      </section>

      {/* FILM PIÙ VISTI */}
      <section className="container my-5">
        <h2 className="text-center mb-5 fw-bold">🔥 Film Più Visti</h2>
        <div className="row g-4">{mostViewed.map(renderFilmCard)}</div>
      </section>

      {/* STYLE */}
      <style>{`
        .hover-card {
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }
        .img-zoom {
          transition: transform .5s ease;
        }
        .hover-card:hover .img-zoom {
          transform: scale(1.1);
        }
        .hover-grow {
          transition: transform .2s ease;
        }
        .hover-grow:hover {
          transform: scale(1.05);
        }
        .fade-in {
          animation: fadeIn .9s ease forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        .fixed-img {
          height: 350px; /* scegli tu la misura */
          object-fit: cover;
          object-position: center;
        }        
      `}</style>
    </div>
  );
};

export default Home;
