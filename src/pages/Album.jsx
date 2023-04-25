import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumInfo: {},
      musics: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const albumId = match.params.id;
    musicsAPI(albumId)
      .then((response) => {
        const [albumInfo, ...musics] = response;
        this.setState({ albumInfo, musics });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { albumInfo, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{albumInfo.artistName}</h2>
        <h1 data-testid="album-name">{albumInfo.collectionName}</h1>
        {musics.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
