import { columns } from './columns';
import { DataTable } from './DataTable';

export default function AllStudents() {
	const data = [
		{
			studentId: 'S001',
			name: 'John Doe',
			fathersName: 'Robert Doe',
			mothersName: 'Jane Doe',
			aadharNo: '1234-5678-9101',
			dob: '2005-06-15',
			placeOfBirth: 'New York',
			religion: 'Christianity',
			caste: 'General',
			subCaste: 'N/A',
			taluka: 'Manhattan',
			district: 'New York',
			state: 'New York',
			lastAttendedSchool: 'NY High School',
			lastSchoolStandard: '10th',
			dateOfAdmission: '2020-06-20',
			admissionStandard: '11th',
			currentStandard: '12th',
			progress: 'Excellent',
			conduct: 'Good',
			dateOfLeaving: 'N/A',
			reasonOfLeaving: 'N/A',
			remarks: 'N/A',
		},
		{
			studentId: 'S002',
			name: 'Jane Smith',
			fathersName: 'Tom Smith',
			mothersName: 'Mary Smith',
			aadharNo: '5678-9101-1234',
			dob: '2006-09-10',
			placeOfBirth: 'Los Angeles',
			religion: 'Christianity',
			caste: 'General',
			subCaste: 'N/A',
			taluka: 'Central LA',
			district: 'Los Angeles',
			state: 'California',
			lastAttendedSchool: 'LA High School',
			lastSchoolStandard: '9th',
			dateOfAdmission: '2021-08-15',
			admissionStandard: '10th',
			currentStandard: '11th',
			progress: 'Good',
			conduct: 'Excellent',
			dateOfLeaving: 'N/A',
			reasonOfLeaving: 'N/A',
			remarks: 'N/A',
		},
		{
			studentId: 'S003',
			name: 'Michael Brown',
			fathersName: 'James Brown',
			mothersName: 'Patricia Brown',
			aadharNo: '9101-1234-5678',
			dob: '2007-01-20',
			placeOfBirth: 'Chicago',
			religion: 'Islam',
			caste: 'General',
			subCaste: 'N/A',
			taluka: 'North Side',
			district: 'Cook',
			state: 'Illinois',
			lastAttendedSchool: 'Chicago High School',
			lastSchoolStandard: '8th',
			dateOfAdmission: '2022-01-10',
			admissionStandard: '9th',
			currentStandard: '10th',
			progress: 'Average',
			conduct: 'Good',
			dateOfLeaving: 'N/A',
			reasonOfLeaving: 'N/A',
			remarks: 'N/A',
		},
		{
			studentId: 'S004',
			name: 'Emily Davis',
			fathersName: 'William Davis',
			mothersName: 'Linda Davis',
			aadharNo: '2345-6789-0123',
			dob: '2005-12-25',
			placeOfBirth: 'Houston',
			religion: 'Hinduism',
			caste: 'OBC',
			subCaste: 'N/A',
			taluka: 'South Houston',
			district: 'Harris',
			state: 'Texas',
			lastAttendedSchool: 'Houston High School',
			lastSchoolStandard: '11th',
			dateOfAdmission: '2019-09-05',
			admissionStandard: '12th',
			currentStandard: '12th',
			progress: 'Excellent',
			conduct: 'Excellent',
			dateOfLeaving: 'N/A',
			reasonOfLeaving: 'N/A',
			remarks: 'N/A',
		},
		{
			studentId: 'S005',
			name: 'David Wilson',
			fathersName: 'Richard Wilson',
			mothersName: 'Barbara Wilson',
			aadharNo: '3456-7890-1234',
			dob: '2004-03-30',
			placeOfBirth: 'Phoenix',
			religion: 'Buddhism',
			caste: 'General',
			subCaste: 'N/A',
			taluka: 'Central Phoenix',
			district: 'Maricopa',
			state: 'Arizona',
			lastAttendedSchool: 'Phoenix High School',
			lastSchoolStandard: '12th',
			dateOfAdmission: '2018-03-01',
			admissionStandard: '12th',
			currentStandard: 'Graduated',
			progress: 'Good',
			conduct: 'Good',
			dateOfLeaving: '2023-05-25',
			reasonOfLeaving: 'Graduated',
			remarks: 'Graduated with honors',
		},
	];

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
