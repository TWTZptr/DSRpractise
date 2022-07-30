import { Link, useParams } from 'react-router-dom';
import './EditUser.scss';
import React from 'react';
import { getUserInfo, updateUser } from '../../services/usersService';
import { User } from '../../types/User';
import { SHOW_SAVED_MSG_TIME } from './constants';
import { Pet } from '../../types/Pet';
import { getPetsByUserId } from '../../services/petsService';
import { PetItem } from './PetItem/PetItem';
import { validateUser } from './validators';

export const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState<User | null>(null);
  const [pets, setPets] = React.useState<Pet[]>([]);
  const [showSavedMsg, setShowSavedMsg] = React.useState<boolean>(false);
  const [selectedPet, setSelectedPet] = React.useState<Pet | null>(null);
  const [err, setErr] = React.useState<string>('');

  React.useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const response = await getUserInfo(+id);
        if (response.ok) {
          setUser(response.data);
        }
      }
    };

    fetchUser();

    const fetchPets = async () => {
      if (id) {
        const response = await getPetsByUserId(+id);
        if (response.ok) {
          setPets(response.data);
        }
      }
    };

    fetchPets();
  }, [id]);

  const onFormChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setErr('');
      const { name, value } = event.currentTarget;
      setUser((prev) => {
        if (!prev) {
          return prev;
        }

        return { ...prev, [name]: value };
      });
    },
    [],
  );

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (user) {
        const validationErr = validateUser(user);
        if (validationErr) {
          setErr(validationErr);
          return;
        }
        updateUser(user).then(() => {
          setShowSavedMsg(true);
          setTimeout(() => setShowSavedMsg(false), SHOW_SAVED_MSG_TIME);
        });
      }
    },
    [user],
  );

  const onPetSelect = React.useCallback((pet: Pet) => {
    setSelectedPet(pet);
  }, []);

  return (
    <div className="user-editor">
      <Link to={'/profile'}>Назад</Link>
      {user ? (
        <form onSubmit={onSubmit}>
          <label>
            <div>Логин</div>
            <input
              placeholder="Логин"
              value={user.login}
              onChange={onFormChange}
              name="login"
            />
          </label>
          <label>
            <div>Электронная почта</div>
            <input
              placeholder="Электронная почта"
              value={user.email}
              onChange={onFormChange}
              name="email"
            />
          </label>

          <label>
            <div>Имя</div>
            <input
              placeholder="Имя"
              value={user.name}
              onChange={onFormChange}
              name="name"
            />
          </label>
          <label>
            <div>Номер телефона</div>
            <input
              placeholder="Номер телефона"
              value={user.phone}
              onChange={onFormChange}
              name="phone"
            />
          </label>
          <button type="submit">Сохранить</button>
          {showSavedMsg ? <div>Сохранено</div> : ''}
          {err ? <div>{err}</div> : ''}
        </form>
      ) : (
        'Загрузка...'
      )}
      <h3>Питомцы: </h3>
      {pets.length ? (
        pets.map((pet) => (
          <PetItem
            key={pet.id}
            pet={pet}
            onOpen={onPetSelect}
            opened={selectedPet?.id === pet.id}
          />
        ))
      ) : (
        <i>Нет</i>
      )}
    </div>
  );
};
