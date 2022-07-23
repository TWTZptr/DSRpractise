import React from 'react';
import { VisitCreationData } from '../../types/VisitCreationData';
import { Pet } from '../../types/Pet';
import './VisitEditor.scss';
import { INIT_VISIT } from './constants';

interface VisitEditorProps {
  pets: Pet[];
  onSave: (visit: VisitCreationData) => any;
  onCancel: Function;
}

export const VisitEditor = React.memo(
  ({ pets, onSave, onCancel }: VisitEditorProps) => {
    const [visit, setVisit] = React.useState<VisitCreationData>(INIT_VISIT);

    const onFormChange = React.useCallback(
      (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.currentTarget;
        setVisit((prev) => ({ ...prev, [name]: value }));
      },
      [],
    );

    const onAddCancel = React.useCallback(() => {
      onCancel();
    }, [onCancel]);

    const onSubmit = React.useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave(visit);
      },
      [visit, onSave],
    );

    React.useEffect(() => {
      setVisit((prev) => ({ ...prev, petId: pets[0].id }));
    }, [pets]);

    return (
      <form className="visit-editor-form" onSubmit={onSubmit}>
        Питомец
        <select name="petId" defaultValue={pets[0].id} onChange={onFormChange}>
          {pets.map((pet) => (
            <option value={pet.id} key={pet.id}>
              {pet.name}
            </option>
          ))}
        </select>
        Дата и время визита
        <input
          type="datetime-local"
          value={visit.date}
          onChange={onFormChange}
          name="date"
          className="date-selector"
        />
        <div>
          <input type="submit" value="Сохранить" />
          <button onClick={onAddCancel}>Отменить</button>
        </div>
      </form>
    );
  },
);
