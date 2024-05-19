import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StudentInfoForm } from './StudentInfoForm';

const Form1 = () => {
	const [studentData, setStudentData] = useState({});

	const handleGeneratePDF = async (event) => {
		event.preventDefault();

		// Validation or other checks can be performed here
		if (!studentData.studentId || !studentData.name || !studentData.dob) {
			alert('Required student data is missing!');
			return;
		}

		console.log('Saving student data:', studentData);

		// Save student data to the database
		try {
			const success = await window.electron.addStudent(studentData);
			if (success) {
				console.log('Data saved successfully');
				alert('Student data saved successfully!');
			} else {
				throw new Error('Failed to save student data');
			}
		} catch (error) {
			alert(`Failed to save data: ${error}`);
			console.error('Error saving data:', error);
		}

		// Generate PDF (assuming this functionality is correctly implemented)
		try {
			window.electron.generatePDF(studentData);
			window.electron.onPDFGenerated((message, path) => {
				alert(`Success: ${message}`);
				console.log('PDF saved at:', path);
			});
		} catch (error) {
			alert(`Failed to generate PDF: ${error}`);
			console.error('Error generating PDF:', error);
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
