import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

type Props<TFieldValues extends FieldValues> = {
  title: string
  name: FieldPath<TFieldValues>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<TFieldValues, any, TFieldValues>
  placeholder?: string
  className?: string
}

export default function FormTextarea<TFieldValues extends FieldValues>({
  control,
  title,
  className,
  placeholder,
  name
}: Props<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-semibold">{title}</FormLabel>
          <FormControl>
            <Textarea
              autoComplete="off"
              placeholder={placeholder}
              className={className}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
