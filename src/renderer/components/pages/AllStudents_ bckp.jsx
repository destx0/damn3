import { columns } from './columns';
import { DataTable } from './data-table';

async function getData() {
	// Replace this with your data fetching logic
	return [
		{
			studentId: '1',
			name: 'John',
			surname: 'Doe',
			fathersName: 'Mark Doe',
			mothersName: 'Jane Doe',
			aadharNo: '123456789012',
			dob: '2000-01-01',
			placeOfBirth: 'New York',
			religion: 'Christianity',
			caste: 'General',
			subCaste: 'None',
			taluka: 'Taluka 1',
			district: 'District 1',
			state: 'State 1',
			lastAttendedSchool: 'School 1',
			lastSchoolStandard: '10th',
			dateOfAdmission: '2015-06-01',
			admissionStandard: '10th',
			currentStandard: '12th',
			progress: 'Good',
			conduct: 'Excellent',
			dateOfLeaving: '2023-05-01',
			reasonOfLeaving: 'Graduated',
			remarks: 'Outstanding student',
		},
		// Add more students here
	];
}

export default async function StudentsPage() {
	const data = await getData();

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
