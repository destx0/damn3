import React, { useState, useEffect, useCallback } from 'react';
import { DataTable } from './DataTable';
import { columns } from './columns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const AllStudents = () => {
	const [students, setStudents] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const loadAllStudents = useCallback(async () => {
		setIsLoading(true);
		try {
			const result = await window.electron.getAllStudents();
			if (result.success && Array.isArray(result.data)) {
				setStudents(result.data);
			} else {
				console.error('Failed to fetch students:', result.error);
				setStudents([]);
			}
		} catch (error) {
			console.error('Error fetching students:', error);
			setStudents([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadAllStudents();
	}, [loadAllStudents]);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const filteredStudents = students.filter((student) =>
		Object.values(student).some((value) =>
			String(value).toLowerCase().includes(searchTerm.toLowerCase()),
		),
	);

	return (
		<div className="space-y-4 p-4">
			<div className="flex items-center space-x-2">
				<Input
					type="text"
					placeholder="Search students..."
					value={searchTerm}
					onChange={handleSearch}
					className="flex-grow"
				/>
				<Button variant="outline">
					<Search className="h-4 w-4" />
				</Button>
			</div>
			{isLoading ? (
				<div className="flex justify-center items-center h-64">
					<p>Loading students...</p>
				</div>
			) : (
				<DataTable columns={columns} data={filteredStudents} />
			)}
		</div>
	);
};

export default AllStudents;
