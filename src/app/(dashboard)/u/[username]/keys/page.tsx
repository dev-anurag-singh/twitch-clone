import ConnectModal from '@/components/keys/connect-modal';
import KeyCard from '@/components/keys/key-card';
import UrlCard from '@/components/keys/url-card';
import { getSelf } from '@/lib/services/auth-service';
import { getStreamByUserId } from '@/lib/services/stream-service';

async function KeysPage() {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error('Stream not found');
  }

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className='space-y-4'>
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
}

export default KeysPage;
