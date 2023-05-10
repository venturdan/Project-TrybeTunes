import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    infoMusics: [],
    isLoading: true,
    listOfFavorites: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const returnApi = await getMusics(id);
    const favorites = await getFavoriteSongs();
    this.setState({
      infoMusics: returnApi,
      isLoading: false,
      listOfFavorites: favorites,
    });
  }

  render() {
    const { infoMusics, isLoading, listOfFavorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Loading /> : (
          <>
            <h1 data-testid="artist-name">{infoMusics[0].artistName}</h1>
            <h2 data-testid="album-name">{infoMusics[0].collectionName}</h2>
            <img src={ infoMusics[0].artworkUrl100 } alt="" />
            {infoMusics.slice(1).map((infoMusic) => (
              <MusicCard
                key={ infoMusic.trackId }
                infoMusic={ infoMusic }
                listOfFavorites={ listOfFavorites }
              />
            ))}
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
