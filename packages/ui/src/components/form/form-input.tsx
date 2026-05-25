import React from 'react';
import { Input, InputProps } from '../input';
import { cn } from '@healthtech/utils';

export interface FormInputProps extends InputProps {
  label: string;
  error?: string;
  description?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, description, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-medium text-zinc-200">
          {label}
        </label>
        <Input 
          ref={ref}
          error={error}
          className={cn(className)}
          {...props} 
        />
        {description && !error && (
          <span className="text-xs text-zinc-500">{description}</span>
        )}
      </div>
    );
  }
);
FormInput.displayName = 'FormInput';
