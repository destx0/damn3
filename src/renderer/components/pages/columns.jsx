'use client';

import { Menu } from 'lucide-react';
import DropdownMenuComponent from '../../../components/ui/DropdownMenuComponent'; // Adjust the path as necessary

export const columns = [
	{
		id: 'actions',
		cell: ({ row }) => {
			const student = row.original;

			return <DropdownMenuComponent student={student} />;
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
