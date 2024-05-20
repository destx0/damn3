import React, { useState } from 'react';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import PaginationComponent from '@/components/ui/PaginationComponent'; // Adjust the path as necessary

export function DataTable({ columns, data }) {
	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize, setPageSize] = useState(5);

	// Calculate the current page data
	const pageCount = Math.ceil(data.length / pageSize);
	const currentData = data.slice(
		pageIndex * pageSize,
		(pageIndex + 1) * pageSize,
	);

	const table = useReactTable({
		data: currentData,
		columns,
		pageCount,
		state: { pageIndex, pageSize },
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="rounded-lg shadow overflow-hidden border border-gray-300">
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
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
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
