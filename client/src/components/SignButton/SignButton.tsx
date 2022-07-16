import './SignButton.scss';
import { useNavigate } from 'react-router-dom';

export const SignButton = () => {
  const navigate = useNavigate();

  const onClick = () => navigate('/login');

  return (
    <button className="sign-button" onClick={onClick}>
      Зарегистрироваться / Войти
    </button>
  );
};
