import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';

class Album extends Component {
  state = {
    isPageLoading: true,
    arrayMusicCardElements: <> </>,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState(async () => {
      const arrayMuscisFromAlbum = await getMusics(id);
      this.setState({ arrayMusicCardElements:
        this.musicCardElements(arrayMuscisFromAlbum) });
      this.setState({ isPageLoading: false });
    });
  }

  musicCardElements = (array) => {
    const filteredMuscisFromAlbum = array
      .filter((track) => track.trackId);
    const arrayMusicCardElements = filteredMuscisFromAlbum.map((music) => (
      <MusicCard
        key={ music.trackId }
        trackName={ music.trackName }
        previewUrl={ music.previewUrl }
      />
    ));
    return (
      <div>
        <h2 data-testid="artist-name">
          { array[0].artistName }
        </h2>
        <h4 data-testid="album-name">
          { array[0].collectionName }
        </h4>
        { arrayMusicCardElements }
      </div>
    );
  }

  render() {
    const { isPageLoading, arrayMusicCardElements } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isPageLoading ? <Loading /> : arrayMusicCardElements }
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
