import { useParams } from 'react-router-dom';
import './EditUser.scss';
import React from 'react';
import { getUserInfo } from '../../services/usersService';

export const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const response = await getUserInfo(+id);
        setUser(response.data);
      }
    };

    fetchUser();
  }, [id]);

  console.log(user);

  return <div className="user-editor">{user ? '' : 'Загрузка...'}</div>;
};
