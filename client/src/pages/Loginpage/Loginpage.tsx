import './Loginpage.scss';
import React from 'react';
import { tryLogin } from '../../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { validateLoginCredentials } from './validators';
import { LoginData } from '../../types/LoginData';
import { useAuth } from '../../hooks/useAuth';

export const Loginpage = () => {
  const errorContainerRef = React.useRef(null);
  const auth = useAuth();

  const [data, setData] = React.useState<LoginData>({
    login: '',
    password: '',
  });

  const [err, setErr] = React.useState<string>('');

  const navigate = useNavigate();

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validationErr = validateLoginCredentials(data);
      if (validationErr) {
        setErr(validationErr);
        return;
      }

      tryLogin(data.login, data.password)
        .then((res) => {
          if (res.ok) {
            auth!.signIn(res.data);
            navigate('/profile');
          } else {
            setErr('Неверный логин или пароль!');
          }
        })
        .catch((err) => {
          console.error(err);
          setErr('Неизвестная ошибка');
        });
    },
    [data, navigate, auth],
  );

  const onFormChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const name = event.currentTarget.name;
      const value = event.currentTarget.value;

      setData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  return (
    <div className="credentials-container">
      <form onSubmit={onSubmit} className="login-form">
        <label>
          <input
            placeholder="Логин"
            className="user-input"
            value={data.login}
            onChange={onFormChange}
            name="login"
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Пароль"
            className="user-input last"
            value={data.password}
            onChange={onFormChange}
            name="password"
          />
        </label>
        <button type="submit">Войти</button>
        <div className="error-container" ref={errorContainerRef}>
          {err}
        </div>
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
