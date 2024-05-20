import React, { useState, useEffect } from 'react';
import { DataTable } from './DataTable'; // Adjust the path as necessary
import { columns } from './columns'; // Adjust the path as necessary

const AllStudents = () => {
	const [students, setStudents] = useState([]);
	const [page, setPage] = useState(1);
	const pageSize = 20; // Adjust the page size as needed

	const fetchStudents = async (page) => {
		try {
			const result = await window.electron.getStudents(page, pageSize);
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

	useEffect(() => {
		fetchStudents(page);
	}, [page]);

	const handleNext = () => {
		setPage((prev) => prev + 1);
	};

	const handlePrevious = () => {
		if (page > 1) {
			setPage((prev) => prev - 1);
		}
	};

	return (
		<div className="">
			<DataTable columns={columns} data={students} />
		</div>
	);
};

export default AllStudents;
