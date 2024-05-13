import React from 'react';
import { Input } from '@/components/ui/input';
import DateInput from '../../../components/ui/date-input';
import { Label } from '@/components/ui/label';
import fieldData from '@/renderer/config/formFieldConfig';

export function StudentInfoForm({ studentData, handleInputChange }) {
	return (
		<>
			{fieldData.map((field) => (
				<div key={field.id} className="space-x-2">
					<Label htmlFor={field.id}>{field.label}</Label>
					{field.type === 'text' ? (
						<Input
							type="text"
							id={field.id}
							placeholder={field.placeholder}
							value={studentData[field.id] || ''}
							onChange={handleInputChange}
						/>
					) : (
						<DateInput
							id={field.id}
							value={studentData[field.id] || ''}
							onChange={(dateString) =>
								handleInputChange({
									target: {
										id: field.id,
										value: dateString,
									},
								})
							}
						/>
					)}
				</div>
			))}
		</>
	);
}
