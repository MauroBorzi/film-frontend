import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const apiBase = "http://127.0.0.1:8000";

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  // carica tutti i film
  useEffect(() => {
    axios
      .get(`${apiBase}/api/films`)
      .then((res) => {
        setFilms(res.data);
        setFilteredFilms(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // carica tutti i generi per il dropdown
  useEffect(() => {
    axios
      .get(`${apiBase}/api/genres`)
      .then((res) => setGenres(res.data))
      .catch((err) => console.error(err));
  }, []);

  // applica i filtri
  useEffect(() => {
    let temp = [...films];

    if (searchTitle) {
      temp = temp.filter((f) =>
        f.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    if (selectedGenre) {
      temp = temp.filter((f) =>
        f.genres.some((g) => g.id === parseInt(selectedGenre))
      );
    }

    setFilteredFilms(temp);
  }, [searchTitle, selectedGenre, films]);

  const renderFilmCard = (film) => (
    <div className="col-12 col-md-6 col-lg-3" key={film.id}>
      <div className="card h-100 shadow-lg border-0 rounded hover-card d-flex flex-column">
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
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold">Lista Film</h2>

      {/* FILTRO TITOLO + GENERE */}
      <div className="mb-4 d-flex flex-column flex-md-row gap-2 justify-content-center align-items-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Cerca per titolo..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <select
          className="form-select w-25"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Tutti i generi</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {filteredFilms.length === 0 ? (
        <p className="text-center">Nessun film trovato.</p>
      ) : (
        <div className="row g-4">{filteredFilms.map(renderFilmCard)}</div>
      )}

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
        .fixed-img {
          height: 350px;
          object-fit: cover;
          object-position: center;
        }
      `}</style>
    </div>
  );
};

export default FilmList;
