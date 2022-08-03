import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';

class Album extends Component {
  state = {
    isPageLoading: true,
    isSavingMusic: false,
    arrayMusicsCard: [],
    // arrayMusicCardElements: <> </>,
    arrayFavoriteMusics: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState(async () => {
      const arrayMuscisFromAlbum = await getMusics(id);
      const favoriteMusics = await getFavoriteSongs();
      this.setState({ arrayMusicsCard: arrayMuscisFromAlbum });
      this.setState({ arrayFavoriteMusics: favoriteMusics });
      // this.setState({ arrayMusicCardElements:
      //   this.musicCardElements(arrayMuscisFromAlbum) });
      this.setState({ isPageLoading: false });
    });
  }

  // musicCardElements = () => {
  //   const { arrayFavoriteMusics, arrayMusicsCard } = this.state;
  //   console.log(arrayFavoriteMusics);
  //   const filteredMusicsFromAlbum = arrayMusicsCard
  //     .filter((track) => track.trackId);
  //   const arrayMusicCardElements = filteredMusicsFromAlbum.map((music, key) => {
  //     const isFavoriteMusic = arrayFavoriteMusics
  //       .some((favoriteMusic) => favoriteMusic[0].trackId === music.trackId);
  //     return (
  //       <MusicCard
  //         key={ music.trackId }
  //         id={ key }
  //         trackName={ music.trackName }
  //         previewUrl={ music.previewUrl }
  //         trackId={ music.trackId }
  //         checked={ isFavoriteMusic }
  //         onChange={ this.handleCheckBox }
  //       />
  //     );
  //   });
  //   return (
  //     <div>
  //       <h2 data-testid="artist-name">
  //         { arrayMusicsCard[0].artistName }
  //       </h2>
  //       <h4 data-testid="album-name">
  //         { arrayMusicsCard[0].collectionName }
  //       </h4>
  //       { arrayMusicCardElements }
  //     </div>
  //   );
  // }

  handleCheckBox = (event) => {
    this.setState({ isSavingMusic: true });
    const { name, checked } = event.target;
    if (checked) {
      this.saveFavoriteMusic(parseInt(name, 10));
    } else {
      this.deleteFavoriteMusic(parseInt(name, 10));
    }
  }

  saveFavoriteMusic = async (musicId) => {
    const { arrayMusicsCard } = this.state;
    const musicFavoriteObj = arrayMusicsCard
      .filter((musics) => musics.trackId === musicId);
    await addSong(musicFavoriteObj[0]);
    console.log(musicFavoriteObj[0]);
    this.setState((prev) => ({
      arrayFavoriteMusics: [...prev.arrayFavoriteMusics, musicFavoriteObj[0]] }));
    this.setState({ isSavingMusic: false });
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

  createAlbumElements = () => {
    const { arrayMusicsCard } = this.state;
    return (
      <div>
        <h2 data-testid="artist-name">
          { arrayMusicsCard[0].artistName }
        </h2>
        <h4 data-testid="album-name">
          { arrayMusicsCard[0].collectionName }
        </h4>
        { this.generateArrayMusicCardElements() }
      </div>
    );
  }

  generateArrayMusicCardElements = () => {
    const { arrayFavoriteMusics, arrayMusicsCard } = this.state;

    const filteredMusicsFromAlbum = arrayMusicsCard
      .filter((track) => track.trackId); // get only musics from array

    const arrayMusicCardElements = filteredMusicsFromAlbum.map((music, key) => {
      const isFavoriteMusic = arrayFavoriteMusics
        .some((favoriteMusic) => favoriteMusic.trackId === music.trackId);
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
    return arrayMusicCardElements;
  }

  render() {
    const { isPageLoading, isSavingMusic } = this.state;
    return (
      <div data-testid="page-album">
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

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
