import React from 'react';
import { cn } from '@/utils/cn';

const Loading = ({ className, size = 'default', ...props }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
};

const LoadingSpinner = ({ text = 'Loading...', className, ...props }) => {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <Loading />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
};

export { Loading, LoadingSpinner };
