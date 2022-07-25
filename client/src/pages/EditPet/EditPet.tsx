import './EditPet.scss';
import React from 'react';
import { PetType } from '../../types/PetType';
import { getPetById, getPetTypes, updatePet } from '../../services/petsService';
import { useNavigate, useParams } from 'react-router-dom';
import { Pet } from '../../types/Pet';
import { SHOW_SAVED_MSG_TIME } from './constants';
import { validatePet } from '../../components/PetEditor/validators';

export const EditPet = () => {
  const { id } = useParams();

  const [petTypes, setPetTypes] = React.useState<PetType[]>([]);
  const [showSavedMsg, setShowSavedMsg] = React.useState<boolean>(false);
  const [pet, setPet] = React.useState<Pet | null>(null);
  const [err, setErr] = React.useState<string>('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPet = async () => {
      if (id) {
        const response = await getPetById(+id);
        if (response.ok) {
          setPet(response.data);
        }
      }
    };

    const fetchPetTypes = async () => {
      const response = await getPetTypes();
      if (response.ok) {
        setPetTypes(response.data);
        fetchPet();
      }
    };

    fetchPetTypes();
  }, [id]);

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (pet) {
        const validationErr = validatePet(pet);
        if (validationErr) {
          setErr(validationErr);
          return;
        }

        updatePet(pet).then((res) => {
          setShowSavedMsg(true);
          setTimeout(() => setShowSavedMsg(false), SHOW_SAVED_MSG_TIME);
        });
      }
    },
    [pet],
  );

  const onFormChange = React.useCallback(
    (
      event: React.FormEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setErr('');
      const { name, value } = event.currentTarget;
      setPet((prev) => {
        if (!prev) {
          return prev;
        }

        return { ...prev, [name]: value };
      });
    },
    [],
  );

  const goBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (!pet) {
    return <div></div>;
  }

  return (
    <div className="pet-editor">
      <span onClick={goBack} className="go-back">
        Назад
      </span>
      <form className="pet-editor-form" onSubmit={onSubmit}>
        <input
          placeholder="Имя"
          value={pet.name}
          onChange={onFormChange}
          name="name"
          className="pet-editor-input"
        />
        <select
          name="petType"
          defaultValue={petTypes[0].id}
          onChange={onFormChange}
        >
          {petTypes.map((type) => (
            <option value={type.id} key={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Порода"
          value={pet.breed}
          onChange={onFormChange}
          name="breed"
        />
        <input
          placeholder="Ссылка на фото"
          value={pet.photo}
          onChange={onFormChange}
          name="photo"
        />
        <textarea
          placeholder="Доп. информация"
          value={pet.info}
          onChange={onFormChange}
          name="info"
        />
        <input type="submit" value="Сохранить" />
      </form>
      {showSavedMsg ? <div>Сохранено</div> : ''}
      {err ? <div>{err}</div> : ''}
    </div>
  );
};
