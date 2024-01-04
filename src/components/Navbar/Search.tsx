'use client';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type FormValues = {
  search: string;
};

function Search() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    const url = qs.stringifyUrl(
      {
        url: '/search',
        query: { term: data.search },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='relative basis-full md:basis-[25rem] flex items-center'
    >
      <Input
        {...register('search', { required: true })}
        placeholder='Search'
        className='pr-10 border-muted-foreground'
      />
      {isValid && (
        <Button
          type='button'
          onClick={() => reset()}
          className='absolute right-10 top-0 hover:bg-transparent'
          size='icon'
          variant='ghost'
        >
          <X className='h-5 w-5 text-muted-foreground' />
        </Button>
      )}
      <Button
        className='absolute right-0 top-0.5 h-9 rounded-l-none border-l-2 hover:bg-transparent'
        type='submit'
        size='icon'
        variant='ghost'
      >
        <SearchIcon className='h-5 w-5 text-muted-foreground' />
      </Button>
    </form>
  );
}

export default Search;
