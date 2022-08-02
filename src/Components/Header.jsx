import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    isPageLoading: false,
  }

  componentDidMount = () => {
    this.setState({ isPageLoading: true }, async () => {
      const acctualUser = await getUser();
      this.setState({ userName: acctualUser.name });
      this.setState({ isPageLoading: false });
    });
  }

  render() {
    const { userName, isPageLoading } = this.state;
    return (
      <header data-testid="header-component">
        <h1>imagine um header</h1>
        { isPageLoading ? <Loading /> : (
          <h2 data-testid="header-user-name">
            Usuário:
            { userName }
          </h2>
        )}
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Musicas Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Aulas ao Vivo</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
