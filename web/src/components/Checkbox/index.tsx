import * as RCheckbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

interface CheckboxProps {
  title: string;
  checked?: boolean;
  extraClasses?: React.HTMLAttributes<HTMLDivElement>['className'];
  index: number;
  callback?: (index: number) => void;
}

function Checkbox({
  title,
  checked = false,
  extraClasses,
  callback,
  index,
}: CheckboxProps) {
  return (
    <RCheckbox.Root
      className={`flex items-center gap-3 group ${extraClasses}`}
      onCheckedChange={() => callback && callback(index)}
      checked={checked}
    >
      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-all">
        <RCheckbox.Indicator>
          <Check size={20} className="text-white" weight="bold" />
        </RCheckbox.Indicator>
      </div>
      <span className="text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 transition-all">
        {title}
      </span>
    </RCheckbox.Root>
  );
}

export default Checkbox;
