import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps {
  value: number;
}

function ProgressBar({ value }: ProgressBarProps) {
  const progressStyle = {
    width: `${value}%`,
  };

  return (
    <Progress.Root
      className="h-3 rounded-xl bg-zinc-700 w-full mt-4"
      value={value}
    >
      <Progress.Indicator
        className="h-3 rounded-xl bg-violet-600"
        style={{ width: progressStyle.width }}
      ></Progress.Indicator>
    </Progress.Root>
  );
}

export default ProgressBar;
