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
}
