import { Plus } from 'phosphor-react';
import logoImage from '../../assets/logo.svg';

function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logoImage} alt="Habits Logo" />

      <button
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-all duration-300 group"
      >
        <Plus
          size={20}
          className="text-violet-500 group-hover:text-violet-300 transition-all duration-300"
        />
        Novo hábito
      </button>
    </div>
  );
}

export default Header;
