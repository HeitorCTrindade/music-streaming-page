import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, onChange, checked, id } = this.props;
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
            id={ id }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
            onChange={ onChange }
          />
        </label>
        <h4>{ checked.toString() }</h4>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default MusicCard;
