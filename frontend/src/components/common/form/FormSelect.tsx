import { ForwardRefExoticComponent, RefAttributes } from 'react'

import { LucideProps } from 'lucide-react'
import { Control, FieldValues } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type Props = {
  title: string
  name: string
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues, any, FieldValues>
  options: {
    value: string
    color: string
    label: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  }[]
}

export default function FormSelect({ control, title, name, className, options }: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className={className}>
              {options.map(option => {
                const Icon = option.icon
                return (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="py-2"
                  >
                    <div className="flex items-center gap-2">
                      {Icon && (
                        <Icon
                          className="h-5 w-5 mr-1"
                          style={{
                            color: option.color
                          }}
                        />
                      )}
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
