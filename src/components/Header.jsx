import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

function Header() {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState('');

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const user = await getUser();
      setUserDetails(user);
      setLoading(false);
    }

    fetchUser();
  }, []);

  return (
    <header data-testid="header-component">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <h1 data-testid="header-user-name">{userDetails.name}</h1>
      )}
      <Link to="/search" data-testid="link-to-search">
        Search
      </Link>
      <Link to="/favorites" data-testid="link-to-favorites">
        Favorites
      </Link>
      <Link to="/profile" data-testid="link-to-profile">
        Profile
      </Link>
    </header>
  );
}

export default Header;
