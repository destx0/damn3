'use client';

import { Menu, Eye, Edit, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const columns = [
	{
		id: 'actions',
		cell: ({ row }) => {
			const student = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<Menu className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem>
							<Eye className="mr-2 h-4 w-4" />
							View student details
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Edit className="mr-2 h-4 w-4" />
							Edit student
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Trash className="mr-2 h-4 w-4" />
							Delete student
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
	{
		accessorKey: 'studentId',
		header: 'Student ID',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'fathersName',
		header: "Father's Name",
	},
	{
		accessorKey: 'mothersName',
		header: "Mother's Name",
	},
	{
		accessorKey: 'aadharNo',
		header: 'Aadhar No',
	},
	{
		accessorKey: 'dob',
		header: 'Date of Birth',
	},
	{
		accessorKey: 'placeOfBirth',
		header: 'Place of Birth',
	},
	{
		accessorKey: 'religion',
		header: 'Religion',
	},
	{
		accessorKey: 'caste',
		header: 'Caste',
	},
	{
		accessorKey: 'subCaste',
		header: 'Sub-Caste',
	},
	{
		accessorKey: 'taluka',
		header: 'Taluka',
	},
	{
		accessorKey: 'district',
		header: 'District',
	},
	{
		accessorKey: 'state',
		header: 'State',
	},
	{
		accessorKey: 'lastAttendedSchool',
		header: 'Last Attended School',
	},
	{
		accessorKey: 'lastSchoolStandard',
		header: 'Last School Standard',
	},
	{
		accessorKey: 'dateOfAdmission',
		header: 'Date of Admission',
	},
	{
		accessorKey: 'admissionStandard',
		header: 'Admission Standard',
	},
	{
		accessorKey: 'currentStandard',
		header: 'Current Standard',
	},
	{
		accessorKey: 'progress',
		header: 'Progress',
	},
	{
		accessorKey: 'conduct',
		header: 'Conduct',
	},
	{
		accessorKey: 'dateOfLeaving',
		header: 'Date of Leaving',
	},
	{
		accessorKey: 'reasonOfLeaving',
		header: 'Reason of Leaving',
	},
	{
		accessorKey: 'remarks',
		header: 'Remarks',
	},
];
