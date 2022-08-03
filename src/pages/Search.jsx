import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../index.css';

const minChacteresToSearch = 2;

class Search extends Component {
  state = {
    searchArtist: '',
    isDisableButton: true,
    isPageLoading: false,
    albunsArtist: [],
    albunsElementesRender: <> </>,
  }

  handleButtonSearch = () => {
    const { searchArtist } = this.state;
    this.setState({ isPageLoading: true }, async () => {
      const tempAlbunsArray = await searchAlbumsAPI(searchArtist);
      this.setState({ isPageLoading: false });
      this.setState({ albunsArtist: tempAlbunsArray });
      this.setState({ albunsElementesRender: this.albunsElements(searchArtist) });
      this.setState({ searchArtist: '' });
    });
  }

  handleChanges = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value }, () => {
      const { searchArtist } = this.state;
      if (searchArtist.length >= minChacteresToSearch) {
        this.setState({ isDisableButton: false });
      }
    });
  }

  albunsElements = (searchArtist) => {
    const { albunsArtist } = this.state;
    if (albunsArtist.length === 0) {
      return <h1>Nenhum álbum foi encontrado</h1>;
    }
    const arrayAlbunsElements = (albunsArtist.map((album) => (
      <div key={ album.collectionName }>
        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        <Link
          to={ `/album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          <h5>{ album.collectionName }</h5>
        </Link>
      </div>
    )));
    return (
      <div className="albuns-cart">
        <h2>
          { `Resultado de álbuns de:  ${searchArtist}`}
        </h2>
        { arrayAlbunsElements }
      </div>
    );
  }

  render() {
    const {
      isDisableButton,
      isPageLoading,
      albunsElementesRender,
      searchArtist,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search:
        <input
          type="text"
          name="searchArtist"
          id=""
          value={ searchArtist }
          data-testid="search-artist-input"
          onChange={ this.handleChanges }
        />
        <button
          type="button"
          disabled={ isDisableButton }
          data-testid="search-artist-button"
          onClick={ this.handleButtonSearch }
        >
          Pesquisar
        </button>
        { isPageLoading ? <Loading /> : albunsElementesRender }
      </div>
    );
  }
}

export default Search;
