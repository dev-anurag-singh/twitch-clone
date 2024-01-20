import { DataTable } from '@/components/data-table';
import { columns } from '@/components/data-table/columns';
import { getBlockedUser } from '@/lib/services/block-service';
import { format } from 'date-fns';

async function CommunityPage() {
  const blockedUsers = await getBlockedUser();
  const formattedData = blockedUsers.map(block => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageUrl,
    username: block.blocked.username,
    createdAt: format(new Date(block.blocked.createdAt), 'dd/MM/yyyy'),
  }));
  return (
    <div className='p-6'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Community Settings</h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
}

export default CommunityPage;
