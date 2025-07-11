import { HTMLInputTypeAttribute } from 'react'

import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type Props<TFieldValues extends FieldValues> = {
  title: string
  name: FieldPath<TFieldValues>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<TFieldValues, any, TFieldValues>
  placeholder?: string
  className?: string
  type?: HTMLInputTypeAttribute
}

export default function FormInput<TFieldValues extends FieldValues>({
  control,
  title,
  className,
  placeholder,
  name,
  type
}: Props<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-semibold">{title}</FormLabel>
          <FormControl>
            <Input
              autoComplete="off"
              placeholder={placeholder}
              className={className}
              type={type ?? 'text'}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
