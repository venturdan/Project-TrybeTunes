import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: null,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      isLoading: false,
      user,
    });
  }

  render() {
    const { isLoading, user } = this.state;

    return (
      <div data-testid="page-profile">
        {isLoading && <p>Carregando...</p>}
        {user && (
          <>
            <img src={user.image} alt={user.name} data-testid="profile-image" />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </>
        )}
        <Header />
      </div>
    );
  }
}

export default Profile;
