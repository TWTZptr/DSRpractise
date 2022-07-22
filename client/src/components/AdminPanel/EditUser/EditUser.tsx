import { useParams } from 'react-router-dom';
import './EditUser.scss';

export const EditUser = () => {
  const { id } = useParams();

  return <div className="user-editor"></div>;
};
