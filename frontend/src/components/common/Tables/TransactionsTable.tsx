'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { MoreVertical, Plus } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const tableData = [
  {
    name: 'Theo Lawrence',
    description: 'Add • Oct 18, 2024',
    amount: '€500,00',
    currency: '120 USD',
    status: 'Success',
    statusBg: 'bg-green-100 text-green-600',
    method: 'Credit Card',
    details: '**** 3560',
    icon: <Plus className="w-4 h-4 text-green-600" />,
    iconBg: 'bg-green-100'
  }
]

type TableData = (typeof tableData)[number]

// Define the columns
const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'name',
    header: 'Type',
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <div
          className={`w-8 h-8 ${row.original.iconBg} rounded-full flex items-center justify-center`}
        >
          {row.original.icon}
        </div>
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-gray-500 text-xs">{row.original.description}</p>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <>
        {row.original.amount}
        <br />
        <span className="text-xs text-gray-500">{row.original.currency}</span>
      </>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span className={`px-3 py-1 text-xs rounded-full ${row.original.statusBg}`}>
        {row.original.status}
      </span>
    )
  },
  {
    accessorKey: 'method',
    header: 'Method',
    cell: ({ row }) => (
      <>
        {row.original.method}
        <br />
        <span className="text-gray-500 text-xs">{row.original.details}</span>
      </>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-muted/80">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Open menu</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
]

const AppTable = () => {
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppTable
