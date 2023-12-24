import * as React from 'react';
import { get, useFormState } from 'react-hook-form';

import { cn } from '@/lib/utils';

type ErrorMessageProps = {
  id: string;
} & React.ComponentPropsWithoutRef<'p'>;

export default function ErrorMessage({
  id,
  className,
  ...rest
}: ErrorMessageProps) {
  const { errors } = useFormState();
  const error = get(errors, id);

  return (
    <p className={cn('text-sm text-red-500', className)} {...rest}>
      {error.message?.toString()}
    </p>
  );
}
