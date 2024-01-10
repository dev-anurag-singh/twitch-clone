import db from '@/lib/db';
import { getSelf } from './auth-service';

export const getRecommended = async () => {
  let userId;

  try {
    const user = await getSelf();
    userId = user.id;
  } catch {
    userId = null;
  }
  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: { blockedId: userId },
              },
            },
          },
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  return users;
};
