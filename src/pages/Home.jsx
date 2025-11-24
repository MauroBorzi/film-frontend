import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const apiBase = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const Home = () => {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiBase}/api/films`)
      .then((res) => setLatest(res.data.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>

      <section className="bg-dark text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Benvenuto nella Film App 🎬</h1>
          <p className="lead mt-3">
            Esplora centinaia di film con descrizioni, generi e dettagli.
          </p>
          <Link to="/films" className="btn btn-primary btn-lg mt-3">
            Vai alla lista Film
          </Link>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="mb-4 text-center">Ultimi Film Aggiunti</h2>

        <div className="row g-4">
          {latest.map((film) => (
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
                  <Link to={`/film/${film.id}`} className="btn btn-primary w-100">
                    Dettagli
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};

export default Home;
