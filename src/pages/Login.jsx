import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createUser } from '../services/userAPI';

function Login() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await createUser({ name });
    setIsLoading(false);
    history.push('/search');
  };

  const MIN_NAME_LENGTH = 3;
  const isButtonDisabled = name.length < MIN_NAME_LENGTH;

  return (
    <div data-testid="page-login">
      <form onSubmit={ handleSubmit }>
        <label htmlFor="login-name-input">Nome:</label>
        <input
          id="login-name-input"
          type="text"
          value={ name }
          onChange={ handleNameChange }
          data-testid="login-name-input"
        />
        <button
          type="submit"
          disabled={ isButtonDisabled }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </form>
      {isLoading && <div>Carregando...</div>}
    </div>
  );
}

export default Login;
