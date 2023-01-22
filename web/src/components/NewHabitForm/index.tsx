import { Check } from 'phosphor-react';
import { useMemo, useState } from 'react';
import api from '../../lib/axios';
import Checkbox from '../Checkbox';

function NewHabitForm() {
  const availableWeekDays = useMemo(() => {
    return [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
  }, []);

  const [title, setTitle] = useState('');
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);

  function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title || selectedWeekDays.length === 0) {
      return;
    }
    api
      .post('/habits', {
        title,
        weekDays: selectedWeekDays,
      })
      .then(() => {
        setTitle('');
        setSelectedWeekDays([]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSelectWeekDay(index: number) {
    if (selectedWeekDays.includes(index)) {
      setSelectedWeekDays((prev) => prev.filter((day) => day !== index));
    } else {
      setSelectedWeekDays((prev) => [...prev, index]);
    }
  }

  return (
    <form className="w-full flex flex-col mt-6" onSubmit={handleForm}>
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="Ex: exercícios, dormir bem, etc..."
        className="p-4 mt-3 text-white bg-zinc-800 rounded-lg placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
        autoFocus
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="mt-6 flex flex-col gap-3">
        {availableWeekDays.map((day, index) => (
          <Checkbox
            key={index}
            title={day}
            checked={selectedWeekDays.includes(index)}
            callback={handleSelectWeekDay}
            index={index}
          />
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-all duration-300"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}

export default NewHabitForm;
