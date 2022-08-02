import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

const minChacteresToLogin = 3;

class Login extends Component {
  state = {
    userName: '',
    isDisableButton: true,
    isPageLoading: false,
  }

  handleButtonLogin = () => {
    const { history } = this.props;
    const { userName } = this.state;
    this.setState({ isPageLoading: true }, async () => {
      await createUser({ name: userName });
      this.setState({ isPageLoading: false });
      history.push('/search');
    });
  }

  handleChanges = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value }, () => {
      const { userName } = this.state;
      if (userName.length >= minChacteresToLogin) {
        this.setState({ isDisableButton: false });
      }
    });
  }

  render() {
    const { isDisableButton, isPageLoading } = this.state;
    return (
      <div data-testid="page-login">
        Login
        <input
          type="text"
          name="userName"
          id="user"
          data-testid="login-name-input"
          onChange={ this.handleChanges }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isDisableButton }
          onClick={ this.handleButtonLogin }
        >
          Entrar
        </button>
        { isPageLoading ? <Loading /> : <> </> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
