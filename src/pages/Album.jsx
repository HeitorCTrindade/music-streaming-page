import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';

class Album extends Component {
  state = {
    muscisFromAlbum: [],
    isPageLoading: true,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState(async () => {
      const arrayMuscisFromAlbum = await getMusics(id);
      this.setState({ muscisFromAlbum: arrayMuscisFromAlbum });
      this.setState({ isPageLoading: false });
    });
  }

  musicCardElements = () => {
    const { muscisFromAlbum } = this.state;
    muscisFromAlbum.shift();
    const arrayMusicCardElements = muscisFromAlbum.map((music) => (
      <MusicCard
        key={ music.trackId }
        trackName={ music.trackName }
        previewUrl={ music.previewUrl }
      />
    ));
    return arrayMusicCardElements;
  }

  render() {
    const { muscisFromAlbum, isPageLoading } = this.state;
    const arrayMusicCardElements = this.musicCardElements();
    console.log(muscisFromAlbum);
    return (
      <div data-testid="page-album">
        <Header />
        { isPageLoading ? <Loading /> : (
          <div>
            
          </div>
        )}
        { arrayMusicCardElements }
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
