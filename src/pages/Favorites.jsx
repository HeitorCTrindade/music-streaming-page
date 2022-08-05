import React, { Component } from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';

class Favorites extends Component {
  state = {
    isPageLoading: true,
    arrayFavoriteMusics: [],
    isSavingMusic: false,
  };

  componentDidMount() {
    this.setState(async () => {
      const favoriteMusics = await getFavoriteSongs();
      this.setState({ arrayFavoriteMusics: favoriteMusics });
      this.setState({ isPageLoading: false });
    });
  }

  handleCheckBox = (event) => {
    this.setState({ isSavingMusic: true });
    const { name } = event.target;
    this.deleteFavoriteMusic(parseInt(name, 10));
  }

  deleteFavoriteMusic = async (musicId) => {
    const { arrayFavoriteMusics } = this.state;
    const newFavoriteMusicsArray = arrayFavoriteMusics
      .filter((music) => music.trackId !== musicId);
    const musicFavoriteObj = arrayFavoriteMusics
      .filter((music) => music.trackId === musicId);
    await removeSong(musicFavoriteObj[0]);
    this.setState({ arrayFavoriteMusics: newFavoriteMusicsArray });
    this.setState({ isSavingMusic: false });
  }

  createAlbumElements = () => (
    <div>
      <h2 data-testid="artist-name">
        MUSICAS FAVORITAS:
      </h2>
      { this.generateArrayMusicCardElements() }
    </div>
  )

  generateArrayMusicCardElements = () => {
    const { arrayFavoriteMusics } = this.state;

    const arrayMusicCardElements = arrayFavoriteMusics.map((music, key) => (
      <MusicCard
        key={ music.trackId }
        id={ key }
        trackName={ music.trackName }
        previewUrl={ music.previewUrl }
        trackId={ music.trackId }
        checked // all musics must be generated with checkbox checked
        onChange={ this.handleCheckBox }
      />
    ));
    return arrayMusicCardElements;
  }

  render() {
    const { isPageLoading, isSavingMusic } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isSavingMusic ? <Loading /> : <> </> }
        {/* { isPageLoading ? <Loading /> : arrayMusicCardElements } */}
        <hr />
        <hr />
        <hr />
        { isPageLoading ? <Loading /> : this.createAlbumElements() }
      </div>
    );
  }
}

export default Favorites;
