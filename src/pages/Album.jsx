import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';

class Album extends Component {
  state = {
    isPageLoading: true,
    isSavingMusic: false,
    arrayMusicsCard: [],
    arrayMusicCardElements: <> </>,
    arrayFavoriteMusics: [],
    checkedStates: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState(async () => {
      const arrayMuscisFromAlbum = await getMusics(id);
      const favoriteMusics = await getFavoriteSongs();
      this.setState({ arrayMusicsCard: arrayMuscisFromAlbum });
      this.setState({ arrayMusicCardElements:
        this.musicCardElements(arrayMuscisFromAlbum) });
      this.setState({arrayFavoriteMusics: favoriteMusics});
      this.setState({ isPageLoading: false });
    });
  }

  musicCardElements = () => {
    
    
    
    const filteredMuscisFromAlbum = arrayMusicsCard
      .filter((track) => track.trackId);
    const ARRAYTEST = new Array(filteredMuscisFromAlbum.length);
    console.log(arrayFavoriteMusics);
    const arrayMusicCardElements = filteredMuscisFromAlbum.map((music, key) => {
      const isFavoriteMusic = arrayFavoriteMusics
        .some((favoriteMusic) => favoriteMusic[0].trackId === music.trackId);
      ARRAYTEST[key] = isFavoriteMusic;
      return (
        <MusicCard
          key={ music.trackId }
          id={ key }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          trackId={ music.trackId }
          checked={ isFavoriteMusic }
          onChange={ this.handleCheckBox }
        />
      );
    });
    console.log(ARRAYTEST);
    this.setState({ checkedStates: ARRAYTEST });
    return (
      <div>
        <h2 data-testid="artist-name">
          { arrayMusicsCard[0].artistName }
        </h2>
        <h4 data-testid="album-name">
          { arrayMusicsCard[0].collectionName }
        </h4>
        { arrayMusicCardElements }
      </div>
    );
  }

  handleCheckBox = async (event) => {
    this.setState({ isSavingMusic: true });
    const { name } = event.target;
    console.log(event.target);
    const { arrayMusicsCard } = this.state;
    const musicFavoriteObj = arrayMusicsCard
      .filter((musics) => musics.trackId === parseInt(name, 10));
    await addSong(musicFavoriteObj);
    this.setState((prev) =>
      ({ arrayFavoriteMusics: [...prev.arrayFavoriteMusics, musicFavoriteObj] }));
    this.setState({ isSavingMusic: false });
  }

  render() {
    const { isPageLoading, arrayMusicCardElements, isSavingMusic } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isSavingMusic ? <Loading /> : <> </> }
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
