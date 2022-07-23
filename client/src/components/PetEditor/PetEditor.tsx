import { PetCreationData } from '../../types/PetCreationData';
import React from 'react';
import { PetType } from '../../types/PetType';
import './PetEditor.scss';
import { validatePet } from './validators';
import { INIT_PET } from './constants';

interface PetEditorProps {
  petTypes: PetType[];
  onSave: (pet: PetCreationData) => any;
  onCancel: Function;
}

export const PetEditor = React.memo(
  ({ petTypes, onSave, onCancel }: PetEditorProps) => {
    const [pet, setPet] = React.useState<PetCreationData>(INIT_PET);
    const [err, setErr] = React.useState<string>('');
    const onFormChange = React.useCallback(
      (
        event: React.FormEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) => {
        setErr('');
        const { name, value } = event.currentTarget;
        setPet((prev) => ({ ...prev, [name]: value }));
      },
      [],
    );

    const onSubmit = React.useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const err = validatePet(pet);
        if (err) {
          setErr(err);
        }
        onSave(pet);
      },
      [pet, onSave],
    );

    const onAddCancel = React.useCallback(() => {
      onCancel();
    }, [onCancel]);

    React.useEffect(() => {
      setPet((prev) => ({ ...prev, typeId: petTypes[0].id }));
    }, [petTypes]);

    return (
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
        {err ? <div className="error-container">{err}</div> : ''}
        <input type="submit" value="Сохранить" />
        <button onClick={onAddCancel}>Отменить</button>
      </form>
    );
  },
);
