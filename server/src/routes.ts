import { prisma } from './lib/prisma';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import dayjs from 'dayjs';

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (request, reply) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);

    const today = dayjs().startOf('day').toDate();

    const habit = await prisma.habit.create({
      data: {
        title,
        createdAt: today,
        WeekDays: {
          create: weekDays.map((weekDay: number) => ({ weekDay })),
        },
      },
    });

    reply.send(habit);
  });

  app.get('/day', async (request, reply) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(request.query);

    const parsedDate = dayjs(date).startOf('day').toDate();
    const weekDay = parsedDate.getDay();

    const possibleHabits = await prisma.habit.findMany({
      where: {
        createdAt: {
          lte: date,
        },
        WeekDays: {
          some: {
            weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate,
      },
      include: {
        DayHabit: {
          include: {
            habit: true,
          },
        },
      },
    });

    const completedHabits = day?.DayHabit.map((dayHabit) => dayHabit.habitId);

    return {
      possibleHabits,
      completedHabits,
    };
  });

  app.get('/habits', async (request, reply) => {
    const habits = await prisma.habit.findMany({
      include: {
        WeekDays: true,
      },
    });

    reply.send(habits);
  });

  app.patch('/habits/:id/toggle', async (request, reply) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toggleHabitParams.parse(request.params);

    const today = dayjs().startOf('day').toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        dayId_habitId: {
          dayId: day.id,
          habitId: id,
        },
      },
    });

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          habitId: id,
          dayId: day.id,
        },
      });
    }
  });

  app.get('/summary', async () => {
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT 
            CAST(COUNT(*) as float)
          FROM day_habits DH
          WHERE DH.dayId = D.id
        ) AS completed_habits,
        (
          SELECT
            CAST(COUNT(*) as float)
          FROM habit_week_days HWD
          JOIN habits H 
            ON HWD.habitId = H.id
            AND H.createdAt <= D.date
          WHERE 
            HWD.weekDay = cast(strftime('%w', D.date / 1000, 'unixepoch') as int)
        ) as amount
      FROM days D
    `;

    return summary;
  });
}
