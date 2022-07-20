import React from 'react';
import { UserRegistrationData } from '../../types/UserRegistrationData';
import './Registrationpage.scss';
import { validateRegistrationCredentials } from './validators';
import { register } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export const Registrationpage = () => {
  const [err, setErr] = React.useState<string>('');
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth && auth.authenticated) {
    console.log(123);
    navigate('/profile', { replace: true });
  }

  const [data, setData] = React.useState<UserRegistrationData>({
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validationErr = validateRegistrationCredentials(data);
      if (validationErr) {
        setErr(validationErr);
        return;
      }

      register(data)
        .then((res) => {
          if (res.ok) {
            auth!.register(res.data);
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
          setErr('Неизвестная 1ошибка');
        });
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
