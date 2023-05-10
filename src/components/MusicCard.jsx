import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    const { listOfFavorites, infoMusic } = props;
    const isChecked = listOfFavorites.some((fav) => fav.trackId === infoMusic.trackId);
    this.state = {
      isLoading: false,
      isChecked,
    };
    this.onChangeCheckedBox = this.onChangeCheckedBox.bind(this);
  }

  async onChangeCheckedBox({ target }) {
    const { checked } = target;
    const { infoMusic } = this.props;
    this.setState({
      isChecked: checked,
      isLoading: true,
    });
    if (checked) {
      await addSong(infoMusic);
    } else {
      await removeSong(infoMusic);
    }
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { infoMusic } = this.props;
    const { trackName, previewUrl, trackId } = infoMusic;
    const { isChecked, isLoading } = this.state;

    return trackName ? (
      <li>
        {isLoading ? <Loading /> : (
          <>
            <h2>{trackName}</h2>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              Your browser does not support the audio element
            </audio>
            <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
              Favorita
            </label>
            <input
              type="checkbox"
              name="isChecked"
              id={ trackId }
              onChange={ this.onChangeCheckedBox }
              checked={ isChecked }
            />
          </>
        )}
      </li>
    ) : null;
  }
}
// erro no evaluator - push 2 para testar
MusicCard.propTypes = {
  infoMusic: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  listOfFavorites: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  })).isRequired,
};

export default MusicCard;
