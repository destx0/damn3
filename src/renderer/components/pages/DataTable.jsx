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
import PaginationComponent from '@/components/ui/PaginationComponent';
import { Settings } from 'lucide-react';

export function DataTable({ columns, data }) {
	const [columnVisibility, setColumnVisibility] = useState({});
	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize, setPageSize] = useState(10);

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
		<div className="w-full">
			<div className="flex justify-end mb-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="flex items-center space-x-2">
							<Settings className="h-4 w-4" />
							<span>Columns</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="max-h-60">
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
			<div className="rounded-lg shadow border border-gray-300">
				<ScrollArea className="h-[calc(100vh-200px)]">
					<Table>
						<TableHeader className="bg-gray-100 sticky top-0 z-10">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider whitespace-nowrap"
											style={{ minWidth: '150px' }}
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
						<TableBody>
							{table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap"
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
			<div className="mt-4">
				<PaginationComponent
					pageIndex={pageIndex}
					pageCount={pageCount}
					setPageIndex={setPageIndex}
				/>
			</div>
		</div>
	);
}
