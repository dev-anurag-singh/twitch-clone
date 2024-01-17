'use client';

import { useViewerToken } from '@/hooks/use-viewer-token';
import { Stream, User } from '@prisma/client';

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}
function StreamPlayer({ user, stream, isFollowing }: StreamPlayerProps) {
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return <div>Cannot watch the stream</div>;
  }

  return <div>You&apos;re Allowed to watch the stream</div>;
}

export default StreamPlayer;