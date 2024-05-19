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
					<TableHead>Aadhar No</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Surname</TableHead>
					<TableHead>Father's Name</TableHead>
					<TableHead>Mother's Name</TableHead>
					<TableHead>Religion</TableHead>
					<TableHead>Caste</TableHead>
					<TableHead>Sub-Caste</TableHead>
					<TableHead>Place of Birth</TableHead>
					<TableHead>Taluka</TableHead>
					<TableHead>District</TableHead>
					<TableHead>State</TableHead>
					<TableHead>Date of Birth</TableHead>
					<TableHead>Last Attended School</TableHead>
					<TableHead>Last Attended School Standard</TableHead>
					<TableHead>Date of Admission</TableHead>
					<TableHead>Admission Standard</TableHead>
					<TableHead>Progress</TableHead>
					<TableHead>Conduct</TableHead>
					<TableHead>Date of Leaving</TableHead>
					<TableHead>Current Standard</TableHead>
					<TableHead>Reason of Leaving</TableHead>
					<TableHead>Remarks</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{students.map((student) => (
					<TableRow key={student.studentId}>
						<TableCell className="font-medium">{student.studentId}</TableCell>
						<TableCell>{student.aadharNo}</TableCell>
						<TableCell>{student.name}</TableCell>
						<TableCell>{student.surname}</TableCell>
						<TableCell>{student.fathersName}</TableCell>
						<TableCell>{student.mothersName}</TableCell>
						<TableCell>{student.religion}</TableCell>
						<TableCell>{student.caste}</TableCell>
						<TableCell>{student.subCaste}</TableCell>
						<TableCell>{student.placeOfBirth}</TableCell>
						<TableCell>{student.taluka}</TableCell>
						<TableCell>{student.district}</TableCell>
						<TableCell>{student.state}</TableCell>
						<TableCell>{student.dob}</TableCell>
						<TableCell>{student.lastAttendedSchool}</TableCell>
						<TableCell>{student.lastSchoolStandard}</TableCell>
						<TableCell>{student.dateOfAdmission}</TableCell>
						<TableCell>{student.admissionStandard}</TableCell>
						<TableCell>{student.progress}</TableCell>
						<TableCell>{student.conduct}</TableCell>
						<TableCell>{student.dateOfLeaving}</TableCell>
						<TableCell>{student.currentStandard}</TableCell>
						<TableCell>{student.reasonOfLeaving}</TableCell>
						<TableCell>{student.remarks}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default AllStudents;
