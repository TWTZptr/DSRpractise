import './Loginpage.scss';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateLoginCredentials } from './validators';
import { LoginData } from '../../types/LoginData';
import { useAuth } from '../../hooks/useAuth';

export const Loginpage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [data, setData] = React.useState<LoginData>({
    login: '',
    password: '',
  });

  const [err, setErr] = React.useState<string>('');

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validationErr = validateLoginCredentials(data);
      if (validationErr) {
        setErr(validationErr);
        return;
      }

      if (auth) {
        auth
          .login(data)
          .then((res) => {
            if (res.ok) {
              navigate('/profile');
            }

            if (res.status === 401) {
              setErr('Неверный логин или пароль');
            }
          })
          .catch((err) => {
            console.log(err);
            setErr('Неизвестная ошибка');
          });
      }
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
        <div className="error-container">{err}</div>
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
