import * as Popover from '@radix-ui/react-popover';
import ProgressBar from '../ProgressBar';
import clsx from 'clsx';
import Checkbox from '../Checkbox';
import dayjs from 'dayjs';

interface HabitDayProps {
  completed?: number;
  amount?: number;
  date?: Date;
  extraClasses?: React.HTMLAttributes<HTMLDivElement>['className'];
}

function HabitDay({ completed, amount, extraClasses, date }: HabitDayProps) {
  const progress =
    completed && amount ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          `w-10 h-10 bg-zinc-900 border-zinc-800 rounded-lg border-2 ${extraClasses}`,
          {
            'bg-zinc-900 border-zinc-800': progress === 0,
            'bg-violet-900 border-violet-800': progress > 0 && progress < 20,
            'bg-violet-800 border-violet-700': progress >= 20 && progress < 40,
            'bg-violet-700 border-violet-600': progress >= 40 && progress < 60,
            'bg-violet-600 border-violet-500': progress >= 60 && progress < 80,
            'bg-violet-500 border-violet-400': progress >= 80 && progress < 100,
            'bg-violet-400 border-violet-300': progress === 100,
          }
        )}
      ></Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar value={progress} />

          <div className="mt-6 flex flex-col gap-3">
            {/* <Checkbox title="beber agua" extraClasses="font-semibold text-xl" /> */}
          </div>
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default HabitDay;
