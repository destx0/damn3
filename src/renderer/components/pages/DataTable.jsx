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

export function DataTable({ columns, data }) {
	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	const table = useReactTable({
		data,
		columns,
		pageCount: Math.ceil(data.length / pageSize),
		state: { pageIndex, pageSize },
		onPaginationChange: (updater) => {
			const newState = updater({
				pageIndex: table.getState().pagination.pageIndex,
				pageSize: table.getState().pagination.pageSize,
			});
			setPageIndex(newState.pageIndex);
			setPageSize(newState.pageSize);
		},
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
			<div className="pagination flex justify-between items-center px-4 py-3 bg-gray-100 border-t border-gray-300 sm:px-6">
				<button
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					className="relative inline-flex items-center px-4 py-2 border border-gray-400 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-200 disabled:opacity-50"
				>
					Previous
				</button>
				<span className="text-sm text-gray-700">
					Page {table.getState().pagination.pageIndex + 1} of{' '}
					{table.getPageCount()}
				</span>
				<button
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					className="relative inline-flex items-center px-4 py-2 border border-gray-400 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-200 disabled:opacity-50"
				>
					Next
				</button>
			</div>
		</div>
	);
}
