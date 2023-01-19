interface HabitDayProps {
  completed?: number;
  extraClasses?: React.HTMLAttributes<HTMLDivElement>['className'];
}

function HabitDay({ completed, extraClasses }: HabitDayProps) {
  return (
    <div
      className={`w-10 h-10 bg-zinc-900 border-zinc-800 rounded-lg border-2 ${extraClasses}`}
    ></div>
  );
}

export default HabitDay;
