'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { CheckCheck, Copy } from 'lucide-react';

interface CopyButtonProps {
  value?: string;
}

function CopyButton({ value }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(value!);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Button
      onClick={onCopy}
      variant={'ghost'}
      disabled={!value || isCopied}
      size={'icon'}
    >
      {isCopied ? <CheckCheck /> : <Copy />}
    </Button>
  );
}

export default CopyButton;
