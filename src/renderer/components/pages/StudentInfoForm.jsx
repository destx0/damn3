import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function StudentInfoForm({ studentData, handleInputChange }) {
	return (
		<>
			<div className="space-x-2">
				<Label htmlFor="fullName">Name of the student in full (Name)</Label>
				<Input
					type="text"
					id="fullName"
					placeholder="Enter Full Name"
					value={studentData.fullName}
					onChange={handleInputChange}
				/>
			</div>
			{/* Add more input fields here following the same pattern */}
		</>
	);
}
