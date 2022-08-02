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

  handleCheckBox = async (event) => {
    this.setState({ isSavingMusic: true });
    const { name } = event.target;
    const { arrayMusicsCard } = this.state;
    const musicFavoriteObj = arrayMusicsCard
      .filter((musics) => musics.trackId === parseInt(name, 10));
    await addSong(musicFavoriteObj);
    this.setState((prev) => ({
      arrayFavoriteMusics: [...prev.arrayFavoriteMusics, musicFavoriteObj] }));
    this.setState({ isSavingMusic: false });
  }

  createArrayMusicCardElements = () => {
    const { arrayFavoriteMusics, arrayMusicsCard } = this.state;

    const filteredMusicsFromAlbum = arrayMusicsCard
      .filter((track) => track.trackId); // get only musics from array

    const arrayMusicCardElements = filteredMusicsFromAlbum.map((music, key) => {
      const isFavoriteMusic = arrayFavoriteMusics
        .some((favoriteMusic) => favoriteMusic[0].trackId === music.trackId);
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
    }); // generate music cards elements

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
        { isPageLoading ? <Loading /> : this.createArrayMusicCardElements() }
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
