'use client';

import { useParticipants } from '@livekit/components-react';

interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

export const ChatCommunity = ({}: ChatCommunityProps) => {
  const participants = useParticipants();
  return <div></div>;
};
