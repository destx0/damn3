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
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

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

	const totalPages = table.getPageCount();

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
			<div className="">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={() => {
									if (pageIndex > 0) setPageIndex(pageIndex - 1);
								}}
								disabled={!table.getCanPreviousPage()}
							/>
						</PaginationItem>
						{Array.from({ length: totalPages }, (_, index) => (
							<PaginationItem key={index}>
								<PaginationLink
									href="#"
									isActive={pageIndex === index}
									onClick={() => setPageIndex(index)}
								>
									{index + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						{totalPages > 5 && <PaginationEllipsis />}
						<PaginationItem>
							<PaginationNext
								href="#"
								onClick={() => {
									if (pageIndex < totalPages - 1) setPageIndex(pageIndex + 1);
								}}
								disabled={!table.getCanNextPage()}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}
