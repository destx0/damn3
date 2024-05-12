import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import DateInput from '../../../components/ui/date-input';
import { StudentInfoForm } from './StudentInfoForm';
import { format } from 'date-fns';

const Form1 = () => {
	const [studentData, setStudentData] = useState({
		fullName: '',
		dob: '' /* other fields */,
	});

	const handleGeneratePDF = async (event) => {
		event.preventDefault();

		if (!studentData.fullName || !studentData.dob) {
			alert('Required student data is missing!');
			return;
		}

		console.log('Saving and generating PDF with student data:', studentData);

		// Save data to the database
		try {
			const savedId = await window.electron.saveStudentData(studentData);
			console.log('Data saved, ID:', savedId);
			// Proceed to generate PDF
			window.electron.generatePDF(studentData);
			window.electron.onPDFGenerated((message, path) => {
				alert(`Success: ${message}`);
				console.log('PDF saved at:', path);
			});
		} catch (error) {
			alert(`Failed to save data: ${error}`);
			console.error('Error saving data:', error);
		}

		window.electron.onPDFGenerationError((message) => {
			alert(`Error: ${message}`);
		});
	};

	const handleInputChange = (event) => {
		const { id, value } = event.target;
		setStudentData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	return (
		<form onSubmit={handleGeneratePDF} className="space-y-6">
			<StudentInfoForm
				studentData={studentData}
				handleInputChange={handleInputChange}
			/>
			<div className="space-x-2">
				<Label htmlFor="dob">
					Date of Birth (DD/MM/YY) according to the Christian era
				</Label>
				<DateInput
					id="dob"
					value={studentData.dob}
					onChange={(date) =>
						handleInputChange({
							target: {
								id: 'dob',
								value: format(date, 'dd/MM/yyyy'),
							},
						})
					}
				/>
			</div>
			<Button type="submit">Submit</Button>
		</form>
	);
};

export default Form1;
