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
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Table className="min-w-full divide-y divide-gray-200">
			<TableHead className="bg-gray-50">
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHeader
								key={header.id}
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								{flexRender(
									header.column.columnDef.header,
									header.getContext(),
								)}
							</TableHeader>
						))}
					</TableRow>
				))}
			</TableHead>
			<TableBody className="bg-white divide-y divide-gray-200">
				{table.getRowModel().rows.map((row) => (
					<TableRow key={row.id}>
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
	);
}
