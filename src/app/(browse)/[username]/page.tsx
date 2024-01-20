import StreamPlayer from '@/components/stream-player/stream-player';
import { isBlockedByUser } from '@/lib/services/block-service';
import { isFollowingUser } from '@/lib/services/follow-service';
import { getUserByUsername } from '@/lib/services/user-service';
import { notFound } from 'next/navigation';

interface UserPageProps {
  params: {
    username: string;
  };
}

async function UserPage({ params: { username } }: UserPageProps) {
  const user = await getUserByUsername(username);
  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
  );
}

export default UserPage;
