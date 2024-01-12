import StreamPlayer from '@/components/stream-player';
import { getUserByUsername } from '@/lib/services/user-service';
import { currentUser } from '@clerk/nextjs';

interface CreatorDashboardProps {
  params: { username: string };
}

async function CreatorDashboardPage({
  params: { username },
}: CreatorDashboardProps) {
  const externalUser = await currentUser();
  const user = await getUserByUsername(username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error('Unauthorized');
  }

  return (
    <div className='h-full'>
      <StreamPlayer user={user} isFollowing stream={user.stream} />
    </div>
  );
}

export default CreatorDashboardPage;
