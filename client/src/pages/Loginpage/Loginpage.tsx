import './Loginpage.scss';
import React from 'react';
import { tryLogin } from '../../services/auth';
import { Link } from 'react-router-dom';
import { validateCredentials } from './validators';

export const Loginpage = () => {
  const errorContainerRef = React.useRef(null);

  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [err, setErr] = React.useState('');

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validationResult = validateCredentials(login, password);
      if (!validationResult.ok) {
        setErr(validationResult.error!);
        return;
      }

      tryLogin(login, password)
        .then((res) => {
          if (res.ok) {
            setErr('все ок');
          } else {
            setErr('Неверный логин или пароль!');
          }
        })
        .catch((err) => {
          setErr('Неизвестная ошибка');
        });
    },
    [login, password],
  );

  const onLoginChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setLogin(event.currentTarget.value);
      setErr('');
    },
    [],
  );

  const onPasswordChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setPassword(event.currentTarget.value);
      setErr('');
    },
    [],
  );

  return (
    <div className="credentials-container">
      <form onSubmit={onSubmit} className="login-form">
        <label>
          <input
            placeholder="Логин"
            className="login-input"
            value={login}
            onChange={onLoginChange}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Пароль"
            className="password-input"
            value={password}
            onChange={onPasswordChange}
          />
        </label>
        <div className="error-container" ref={errorContainerRef}>
          {err}
        </div>
        <button type="submit" className="login-button">
          Войти
        </button>
      </form>
      <div>
        <p>Еще не зарегистрированы?</p>
        <p>
          <Link to={'/registration'}>Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};
