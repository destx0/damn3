import { buttonVariants } from '@/components/ui/button';
import { nav } from '@/renderer/config/nav';
import React from 'react';
import { Link } from 'react-router-dom';
import { InputComboboxForm } from '../input/InputComboboxForm';
import { InputSelectForm } from '../input/InputSelectForm';
import { InputSlider } from '../input/InputSlider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import DateInput from '../../../components/ui/date-input';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { StudentInfoForm } from './StudentInfoForm';

type Props = {};
// const form = useForm();
export function Home(props: Props) {
	const [studentData, setStudentData] = useState({
		fullName: '',
		dob: '' /* other fields */,
	});

	const handleGeneratePDF = (event) => {
		event.preventDefault();

		if (!studentData) {
			alert('Student data is missing!');
			return;
		}

		console.log('Generating PDF with student data:', studentData);
		window.electron.generatePDF(studentData);
		window.electron.onPDFGenerated((message, path) => {
			alert(`Success: ${message}`);
			console.log('PDF saved at:', path);
		});
		window.electron.onPDFGenerationError((message) => {
			alert(`Error: ${message}`);
		});
	};
	const [val, setVal] = React.useState(50);
	const handleInputChange = (event) => {
		const { id, value } = event.target;
		setStudentData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent the default form submission behavior
		console.log('Submitted Data:', studentData);
		// Here you can also handle data sending to a server or further processing
	};
	return (
		<div className="flex flex-col gap-4 items-center h-screen  overflow-auto">
			<Tabs defaultValue="c2" className="w-screen p-8 justify-center">
				<TabsList>
					<TabsTrigger value="c1">Certificate 1</TabsTrigger>
					<TabsTrigger value="c2">certificate 2</TabsTrigger>
				</TabsList>
				<TabsContent value="c1">
					Make changes to your account here.Make changes to your account here.
				</TabsContent>
				<TabsContent value="c2" className="gap-12 m-12">
					<form onSubmit={handleGeneratePDF} className="space-y-6">
						<StudentInfoForm
							studentData={studentData}
							handleInputChange={handleInputChange}
						/>
						{/* <div className="space-x-2">
							<Label htmlFor="dob">
								Date of Birth (DD/MM/YY) according to the Christian era
							</Label>
							<DateInput
								id="dob"
								value={studentData.dob}
								onChange={(date) =>
									setStudentData({
										...studentData,
										dob: format(date, 'dd/MM/yy'),
									})
								}
							/>
						</div> */}

						<div>
							<Button type="submit">Submit</Button>
						</div>
					</form>
				</TabsContent>
			</Tabs>
		</div>
	);
}
