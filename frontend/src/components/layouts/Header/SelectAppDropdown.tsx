'use client'

import type * as React from 'react'

import { ChevronDown } from 'lucide-react'

import { cn } from '@/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export type DropdownOption = {
  label: string
  value: string
}

type DropdownProps = {
  options: DropdownOption[]
  onSelect: (value: string) => void
  label?: string
}

const SelectAppDropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  label = 'Select an option'
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'inline-flex justify-between items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-primary-foreground rounded-md shadow-lg hover:bg-gray-100 focus:outline-none'
        )}
      >
        <div className="bg-rose-500 h-4 w-4 rounded-sm" />
        {label}
        <ChevronDown className="w-5 h-5 ml-2 -mr-1 text-gray-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-56"
      >
        {options.map(option => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSelect(option.value)}
            className="cursor-pointer"
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SelectAppDropdown
