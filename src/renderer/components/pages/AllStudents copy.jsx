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
			try {
				const result = await window.electron.getStudents();
				if (result.success && Array.isArray(result.data)) {
					setStudents(result.data);
				} else {
					console.error('Failed to fetch students:', result.error);
					setStudents([]); // Ensure students is always an array
				}
			} catch (error) {
				console.error('Error fetching students:', error);
				setStudents([]); // Ensure students is always an array
			}
		};

		fetchStudents();
	}, []);

	return (
		<Table>
			<TableCaption>A list of all students.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Student ID</TableHead>
					<TableHead className="w-[200px]">Name</TableHead>
					<TableHead className="w-[150px]">Father's Name</TableHead>
					<TableHead className="w-[150px]">Mother's Name</TableHead>
					<TableHead className="w-[150px]">Aadhar No</TableHead>
					<TableHead className="w-[150px]">Date of Birth</TableHead>
					<TableHead className="w-[150px]">Place of Birth</TableHead>
					<TableHead className="w-[200px]">Religion</TableHead>
					<TableHead className="w-[150px]">Caste</TableHead>
					<TableHead className="w-[150px]">Sub-Caste</TableHead>
					<TableHead className="w-[150px]">Taluka</TableHead>
					<TableHead className="w-[150px]">District</TableHead>
					<TableHead className="w-[100px]">State</TableHead>
					<TableHead className="w-[200px]">Last Attended School</TableHead>
					<TableHead className="w-[150px]">Last School Standard</TableHead>
					<TableHead className="w-[150px]">Date of Admission</TableHead>
					<TableHead className="w-[200px]">Admission Standard</TableHead>
					<TableHead className="w-[200px]">Current Standard</TableHead>
					<TableHead className="w-[150px]">Progress</TableHead>
					<TableHead className="w-[150px]">Conduct</TableHead>
					<TableHead className="w-[150px]">Date of Leaving</TableHead>
					<TableHead className="w-[200px]">Reason of Leaving</TableHead>
					<TableHead className="w-[200px]">Remarks</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{students.map((student) => (
					<TableRow key={student.studentId}>
						<TableCell className="font-medium">{student.studentId}</TableCell>
						<TableCell>
							{student.name} {student.surname}
						</TableCell>
						<TableCell>{student.fathersName}</TableCell>
						<TableCell>{student.mothersName}</TableCell>
						<TableCell>{student.aadharNo}</TableCell>
						<TableCell>{student.dob}</TableCell>
						<TableCell>{student.placeOfBirth}</TableCell>
						<TableCell>{student.religion}</TableCell>
						<TableCell>{student.caste}</TableCell>
						<TableCell>{student.subCaste}</TableCell>
						<TableCell>{student.taluka}</TableCell>
						<TableCell>{student.district}</TableCell>
						<TableCell>{student.state}</TableCell>
						<TableCell>{student.lastAttendedSchool}</TableCell>
						<TableCell>{student.lastSchoolStandard}</TableCell>
						<TableCell>{student.dateOfAdmission}</TableCell>
						<TableCell>{student.admissionStandard}</TableCell>
						<TableCell>{student.currentStandard}</TableCell>
						<TableCell>{student.progress}</TableCell>
						<TableCell>{student.conduct}</TableCell>
						<TableCell>{student.dateOfLeaving}</TableCell>
						<TableCell>{student.reasonOfLeaving}</TableCell>
						<TableCell>{student.remarks}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default AllStudents;
