import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const AllStudents = () => {
	const [students, setStudents] = useState([
		{
			studentId: 'S001',
			name: 'John Doe',
			dob: '2000-01-01',
			lastAttendedSchool: 'Springfield High',
			currentStandard: '10th Grade',
		},
		{
			studentId: 'S002',
			name: 'Jane Smith',
			dob: '2001-02-02',
			lastAttendedSchool: 'Riverview Middle School',
			currentStandard: '11th Grade',
		},
		{
			studentId: 'S003',
			name: 'Alice Johnson',
			dob: '2002-03-03',
			lastAttendedSchool: 'Westside Elementary',
			currentStandard: '9th Grade',
		},
		{
			studentId: 'S004',
			name: 'Bob Brown',
			dob: '2003-04-04',
			lastAttendedSchool: 'Northgate Academy',
			currentStandard: '12th Grade',
		},
	]);

	return (
		<Table>
			<TableCaption>A list of all students.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Student ID</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Date of Birth</TableHead>
					<TableHead>Last Attended School</TableHead>
					<TableHead>Current Standard</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{students.map((student) => (
					<TableRow key={student.studentId}>
						<TableCell className="font-medium">{student.studentId}</TableCell>
						<TableCell>{student.name}</TableCell>
						<TableCell>{student.dob}</TableCell>
						<TableCell>{student.lastAttendedSchool}</TableCell>
						<TableCell>{student.currentStandard}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default AllStudents;
