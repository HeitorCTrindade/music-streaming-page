import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    isPageLoading: true,
    userData: [],
    userImage: '',
    userName: '',
    userEmail: '',
    userDescribe: '',
    isSaveButtonDisabled: true,
  };

  componentDidMount() {
    this.setState(async () => {
      const userDataReceive = await getUser();
      this.setState({
        userData: userDataReceive,
        userImage: userDataReceive.image,
        userName: userDataReceive.name,
        userEmail: userDataReceive.email,
        userDescribe: userDataReceive.description,
      });
      this.setState({ isPageLoading: false });
      const {
        userName,
        userEmail,
        userImage,
        userDescribe,
      } = this.state;
      const isButtonDisabled = userName.length === 0
        || this.isValidEmail(userEmail) === false
        || userImage.length === 0
        || userDescribe.length === 0;
      this.setState({
        isSaveButtonDisabled: isButtonDisabled,
      });
    });
  }

  handleChangesForm = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const {
        userName,
        userEmail,
        userImage,
        userDescribe,
      } = this.state;
      const isButtonDisabled = userName.length === 0
        || this.isValidEmail(userEmail) === false
        || userImage.length === 0
        || userDescribe.length === 0;
      this.setState({
        isSaveButtonDisabled: isButtonDisabled,
      });
    });
  };

  onSaveButtonClick = async () => {
    const { history } = this.props;
    history.push('/profile');
    const {
      userName,
      userEmail,
      userImage,
      userDescribe,
    } = this.state;
    await updateUser({
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescribe });
  }

  isValidEmail(email) {
    const valid = email.includes('@') && email.includes('.com');
    return valid;
  }

  render() {
    const {
      isPageLoading,
      userData: { name, email, image, description },
      userName,
      userEmail,
      userImage,
      userDescribe,
      isSaveButtonDisabled,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isPageLoading ? <Loading /> : <> </> }
        <form>
          <p>imagem:</p>
          <input
            type="text"
            name="userImage"
            id=""
            data-testid="edit-input-image"
            placeholder={ image }
            value={ userImage }
            onChange={ this.handleChangesForm }
          />
          <p>Nome:</p>
          <input
            type="text"
            name="userName"
            id=""
            data-testid="edit-input-name"
            placeholder={ name }
            value={ userName }
            onChange={ this.handleChangesForm }
          />
          <p>Email:</p>
          <input
            type="text"
            name="userEmail"
            id=""
            data-testid="edit-input-email"
            placeholder={ email }
            value={ userEmail }
            onChange={ this.handleChangesForm }
          />
          <p>Descrição:</p>
          <input
            type="text"
            name="userDescribe"
            id=""
            data-testid="edit-input-description"
            placeholder={ description }
            value={ userDescribe }
            onChange={ this.handleChangesForm }
          />
          <button
            type="button"
            disabled={ isSaveButtonDisabled }
            data-testid="edit-button-save"
            onClick={ this.onSaveButtonClick }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.string.isRequired,
};

export default ProfileEdit;
