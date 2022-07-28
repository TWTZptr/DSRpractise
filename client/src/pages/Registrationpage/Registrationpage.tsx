import React from 'react';
import { UserRegistrationData } from '../../types/UserRegistrationData';
import './Registrationpage.scss';
import { validateRegistrationCredentials } from './validators';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { INIT_USER } from './constants';

export const Registrationpage = () => {
  const [err, setErr] = React.useState<string>('');
  const auth = useAuth();
  const navigate = useNavigate();

  const [data, setData] = React.useState<UserRegistrationData>(INIT_USER);

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validationErr = validateRegistrationCredentials(data);
      if (validationErr) {
        setErr(validationErr);
        return;
      }

      if (auth) {
        auth
          .register(data)
          .then((res) => {
            if (res.ok) {
              navigate('/profile');
              return;
            }

            if (res.status === 409) {
              setErr(res.data.message);
              return;
            }

            setErr('Неизвестная ошибка');
          })
          .catch((err) => {
            console.error(err);
            setErr('Неизвестная ошибка');
          });
      }
    },
    [auth, data, navigate],
  );

  const onFormChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;

      setData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  return (
    <div className="registration-info-container">
      <form onSubmit={onSubmit} className="registration-form">
        <label>
          <input
            placeholder="Логин"
            value={data.login}
            onChange={onFormChange}
            name="login"
          />
        </label>
        <label>
          <input
            placeholder="Электронная почта"
            value={data.email}
            onChange={onFormChange}
            name="email"
          />
        </label>
        <label>
          <input
            placeholder="Пароль"
            value={data.password}
            onChange={onFormChange}
            name="password"
            type="password"
          />
        </label>
        <label>
          <input
            placeholder="Подтверждение пароля"
            value={data.confirmPassword}
            onChange={onFormChange}
            name="confirmPassword"
            type="password"
          />
        </label>
        <label>
          <input
            placeholder="Имя"
            value={data.name}
            onChange={onFormChange}
            name="name"
          />
        </label>
        <label>
          <input
            placeholder="Номер телефона"
            value={data.phone}
            onChange={onFormChange}
            name="phone"
          />
        </label>
        <button type="submit">Зарегистрироваться</button>
        <div className="error-container">{err}</div>
        <div>
          <p>Уже зарегистрированы?</p>
          <p>
            <Link to={'/login'}>Войти</Link>
          </p>
        </div>
      </form>
    </div>
  );
};
