import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    isPageLoading: true,
    userData: [],
  };

  // {"name":"aaaa","email":"","image":"","description":""}

  componentDidMount() {
    this.setState(async () => {
      const userDataReceive = await getUser();
      this.setState({ userData: userDataReceive });
      this.setState({ isPageLoading: false });
    });
  }

  createProfileElements = () => {
    const { userData: { name, email, image, description } } = this.state;
    return (
      <div>
        <img src={ image } alt="userImage" data-testid="profile-image" />
        <p>{ name }</p>
        <p>{ email }</p>
        <p>{ description }</p>
        <Link to="/profile/edit"> Editar perfil </Link>
      </div>
    );
  }

  render() {
    const { isPageLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isPageLoading ? <Loading /> : this.createProfileElements() }
      </div>
    );
  }
}

export default Profile;
