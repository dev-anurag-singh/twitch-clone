'use client';

import { useViewerToken } from '@/hooks/use-viewer-token';
import { Stream, User } from '@prisma/client';
import { LiveKitRoom } from '@livekit/components-react';

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

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      >
        stream
      </LiveKitRoom>
      You&apos;re Allowed to watch the stream
    </>
  );
}

export default StreamPlayer;
