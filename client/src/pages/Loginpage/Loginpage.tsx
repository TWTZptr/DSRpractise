import './Loginpage.scss';
import React from 'react';
import { tryLogin } from '../../services/auth';

export const Loginpage = () => {
  const loginInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = React.useCallback((event: React.FormEvent) => {
    event.preventDefault();
    tryLogin(
      loginInputRef.current!.value,
      passwordInputRef.current!.value,
    ).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="credentials-container">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            ref={loginInputRef}
            placeholder="Логин"
            className="user-input"
          />
        </label>
        <label>
          <input
            ref={passwordInputRef}
            type="password"
            placeholder="Пароль"
            className="user-input"
          />
        </label>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};
