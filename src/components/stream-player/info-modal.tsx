'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UploadDropzone } from '@/lib/uploadthing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ElementRef,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from 'react';
import { updateStream } from '@/actions/stream';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Hint } from '../hint';
import { Trash } from 'lucide-react';
import Image from 'next/image';

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}
export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) => {
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          setThumbnailUrl('');
          toast.success('Thumbnail removed');
          closeRef.current?.click();
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success('Stream updated');
          closeRef.current?.click();
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'default'} variant={'link'} className='ml-auto'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className='space-y-14'>
          <div className='space-y-2'>
            <Label>Name</Label>
            <Input
              onChange={onChange}
              value={name}
              disabled={isPending}
              placeholder='Stream name'
            ></Input>
          </div>
          <div className='space-y-2'>
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className='relative aspect-video rounded-xl overflow-hidden border border-white/10 '>
                <div className='absolute top-2 right-2 z-10'>
                  <Hint label='Remove thumbnail' asChild side='left'>
                    <Button
                      type='button'
                      disabled={isPending}
                      onClick={onRemove}
                      className='h-auto w-auto p-1.5'
                    >
                      <Trash className='h-4 w-4' />
                    </Button>
                  </Hint>
                </div>
                <Image
                  src={thumbnailUrl}
                  alt='thumbnail'
                  fill
                  className='object-cover'
                />
              </div>
            ) : (
              <div className='rounded-xl border outline-dashed outline-muted'>
                <UploadDropzone
                  endpoint='thumbnailUploader'
                  appearance={{
                    label: { color: '#FFFFFF' },
                    allowedContent: { color: '#FFFFFF' },
                  }}
                  onClientUploadComplete={res => {
                    setThumbnailUrl(res?.[0].url);
                    router.refresh();
                    closeRef.current?.click();
                  }}
                />
              </div>
            )}
          </div>
          <div className='flex justify-between'>
            <DialogClose ref={closeRef} asChild>
              <Button variant='ghost' type='button'>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type='submit'>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
