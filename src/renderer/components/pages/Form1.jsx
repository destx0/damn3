import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StudentInfoForm } from './StudentInfoForm';

const Form1 = () => {
	const [studentData, setStudentData] = useState({});

	const handleGeneratePDF = async (event) => {
		event.preventDefault();

		// Validation or other checks can be performed here
		if (!studentData.fullName || !studentData.dob) {
			alert('Required student data is missing!');
			return;
		}

		console.log('Saving and generating PDF with student data:', studentData);

		// Save and generate PDF (assuming this functionality is correctly implemented)
		try {
			const savedId = await window.electron.saveStudentData(studentData);
			console.log('Data saved, ID:', savedId);
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
			<Button type="submit">Submit</Button>
		</form>
	);
};

export default Form1;
