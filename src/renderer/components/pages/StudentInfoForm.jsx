import React from 'react';
import { Input } from '@/components/ui/input';
import DateInput from '@/components/ui/date-input';
import { Label } from '@/components/ui/label';
import fieldData from '@/renderer/config/formFieldConfig';

export function StudentInfoForm({ studentData, handleInputChange }) {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			{fieldData.map((field) => (
				<div key={field.id} className="space-y-2">
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
		</div>
	);
}
