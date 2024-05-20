import React, { useState, useEffect } from 'react';
import { DataTable } from './DataTable'; // Adjust the path as necessary
import { columns } from './columns'; // Adjust the path as necessary

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
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={students} />
		</div>
	);
};

export default AllStudents;
