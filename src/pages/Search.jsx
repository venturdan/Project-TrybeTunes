import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbums from '../services/searchAlbumsAPI';

function Search() {
  const [artistName, setArtistName] = useState('');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [resultTitle, setResultTitle] = useState('');

  const handleInputChange = (event) => {
    setArtistName(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    const result = await searchAlbums(artistName);
    setAlbums(result);
    setResultTitle(artistName);
    setArtistName('');
    setLoading(false);
  };

  const MIN_CHARS = 2;

  return (
    <div>
      <Header />
      <form onSubmit={ handleSearch }>
        <label htmlFor="search-artist-input">
          Digite o nome da banda ou artista:
        </label>
        <input
          type="text"
          data-testid="search-artist-input"
          value={ artistName }
          onChange={ handleInputChange }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ artistName.length < MIN_CHARS || loading }
        >
          Pesquisar
        </button>
      </form>
      {loading && <p>Carregando...</p>}
      {!loading && albums.length > 0 && (
        <>
          <p>
            Resultado de álbuns de:
            {' '}
            {resultTitle}
          </p>
          {albums.map((album) => (
            <div key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <p>{album.collectionName}</p>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                Ver detalhes do álbum
              </Link>
            </div>
          ))}
        </>
      )}
      {!loading && albums.length === 0 && <p>Nenhum álbum foi encontrado</p>}
    </div>
  );
}

export default Search;
