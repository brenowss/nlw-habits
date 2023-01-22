import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import api from '../../lib/axios';
import { generateDatesFromYearBeginning } from '../../utils/generateDatesFromYearBeginning';
import HabitDay from '../HabitDay';

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed_habits: number;
}>;

function SummaryTable() {
  const weekDays = useMemo(() => {
    return ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  }, []);

  const summaryDates = useMemo(() => {
    return generateDatesFromYearBeginning();
  }, []);

  const amountOfDaysToFill = useMemo(() => {
    const minimumSummaryDate = 18 * 7;
    return minimumSummaryDate - summaryDates.length;
  }, []);

  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    const fetchSummary = async () => {
      const { data } = await api.get('/summary');
      console.log(data);

      setSummary(data);
    };

    fetchSummary();
  }, []);

  return (
    <div className="w-full flex overflow-x-auto pb-4 scroll">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, index) => (
          <div
            className="font-bold text-zinc-400 text-xl h-10 w-10 flex items-center justify-center"
            key={`${day}-${index}`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          const summaryItem = summary.find((item) =>
            dayjs(date).isSame(item.date, 'day')
          );

          return (
            <HabitDay
              amount={summaryItem?.amount || 0}
              completed={summaryItem?.completed_habits || 0}
              date={date}
              key={date.toISOString()}
            />
          );
        })}
        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => (
            <HabitDay
              extraClasses="opacity-40 cursor-not-allowed"
              key={index}
            />
          ))}
      </div>
    </div>
  );
}

export default SummaryTable;
