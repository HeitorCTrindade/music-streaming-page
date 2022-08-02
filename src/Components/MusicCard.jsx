import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, onChange } = this.props;
    return (
      <div data-testid="page-MusicCard">
        <p>{trackName}</p>
        <audio src={ previewUrl } controls data-testid="audio-component">
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="User">
          Favorita
          <input
            type="checkbox"
            name={ trackId }
            id=""
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ onChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
