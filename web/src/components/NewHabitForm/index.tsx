import { Check } from 'phosphor-react';

function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="Ex: exercícios, dormir bem, etc..."
        className="p-4 mt-3 text-white bg-zinc-800 rounded-lg placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
        autoFocus
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

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
