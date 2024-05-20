'use client';

import React, { useState } from 'react';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
 import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import PaginationComponent from '@/components/ui/PaginationComponent'; // Adjust the path as necessary
import { Settings } from 'lucide-react'; // Import the icon from lucide-react

export function DataTable({ columns, data }) {
	const [columnVisibility, setColumnVisibility] = useState({});
	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	// Calculate the current page data
	const pageCount = Math.ceil(data.length / pageSize);
	const currentData = data.slice(
		pageIndex * pageSize,
		(pageIndex + 1) * pageSize,
	);

	const table = useReactTable({
		data: currentData,
		columns,
		state: { columnVisibility, pageIndex, pageSize },
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex items-center py-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							className="ml-auto flex items-center space-x-2"
						>
							<Settings className="h-4 w-4" />
							<span>Columns</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="max-h-60 overflow-y-auto">
						<ScrollArea className="h-full">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								))}
							<ScrollBar orientation="vertical" />
						</ScrollArea>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-lg shadow overflow-hidden border border-gray-300">
				<ScrollArea className="w-full overflow-auto scrollbar-visible">
					<Table className="min-w-full divide-y divide-gray-300">
						<TableHeader className="bg-gray-300">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody className="bg-white divide-y divide-gray-300">
							{table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="even:bg-gray-100 odd:bg-gray-50 hover:bg-gray-200 transition-colors duration-200"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
			<div className="p-4">
				<PaginationComponent
					pageIndex={pageIndex}
					pageCount={pageCount}
					setPageIndex={setPageIndex}
				/>
			</div>
		</div>
	);
}
