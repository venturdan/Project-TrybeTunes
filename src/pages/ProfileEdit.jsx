import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ ...user, loading: false });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, description, image } = this.state;
    await updateUser({ name, email, description, image });
    const { history } = this.props;
    history.push('/profile');
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  isFormValid = () => {
    const { name, email, description } = this.state;
    const emailRegex = /^\S+@\S+\.\S+$/;
    return (
      name.trim() !== ''
      && emailRegex.test(email.trim())
      && description.trim() !== ''
    );
  };

  render() {
    const { name, email, description, image, loading } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <h2>Editar perfil</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <form onSubmit={ this.handleSubmit }>
            <label>
              Nome:
              <input
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                data-testid="edit-input-name"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                data-testid="edit-input-email"
              />
            </label>
            <label>
              Descrição:
              <textarea
                name="description"
                value={ description }
                onChange={ this.handleChange }
                data-testid="edit-input-description"
              />
            </label>
            <label>
              Imagem:
              <input
                type="text"
                name="image"
                value={ image }
                onChange={ this.handleChange }
                data-testid="edit-input-image"
              />
            </label>
            <button
              type="submit"
              disabled={ !this.isFormValid() }
              data-testid="edit-button-save"
            >
              Salvar
            </button>
          </form>
        )}
        <Header />
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
