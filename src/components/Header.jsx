import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    loading: false,
    user: '',
  };

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    const userInfo = await getUser();
    this.setState({
      loading: true,
      user: userInfo.name,
    });
  };

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <br />
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <br />
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
        {
          !loading ? <Loading /> : (
            <h3 data-testid="header-user-name">
              {user}
            </h3>)
        }
      </header>

    );
  }
}
export default Header;
