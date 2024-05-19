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
	const [students, setStudents] = useState([]);

	useEffect(() => {
		const fetchStudents = async () => {
			const fetchedStudents = await window.electron.getStudents();
			setStudents(fetchedStudents);
		};

		fetchStudents();
	}, []);

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
