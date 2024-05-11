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

type Props = {};
// const form = useForm();
export function Home(props: Props) {
	const [studentData, setStudentData] = useState({
		studentId: '',
		uidNo: '',
		fullName: '',
		fatherName: '',
		surname: '',
		motherName: '',
		nationality: '',
		motherTongue: '',
		religion: '',
		caste: '',
		subCaste: '',
		placeOfBirth: '',
		taluka: '',
		dist: '',
		state: '',
		dob: '',
		dobWords: '',
		lastSchool: '',
		admissionDate: '',
		standard: '',
		progress: '',
		conduct: '',
		leavingDate: '',
		studyingStandard: '',
		leavingReason: '',
		remarks: '',
		date: '',
		month: '',
		year: '',
	});
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
			<Tabs defaultValue="c1" className="w-screen p-8 justify-center">
				<TabsList>
					<TabsTrigger value="c1">Certificate 1</TabsTrigger>
					<TabsTrigger value="c2">certificate 2</TabsTrigger>
				</TabsList>
				<TabsContent value="c1">
					Make changes to your account here.Make changes to your account here.
					Make changes to your account here. Make changes to your account here.
					Make changes to your account here. Make changes to your account here.
					Make changes to your account here. Make changes to your account here.
				</TabsContent>
				<TabsContent value="c2" className="gap-12 m-12">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-x-2">
							<Label htmlFor="studentId">Student ID</Label>
							<Input
								type="text"
								id="studentId"
								placeholder="Enter Student ID"
								value={studentData.studentId}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="uidNo">U.I.D. No. (Aadhaar Card No.)</Label>
							<Input
								type="text"
								id="uidNo"
								placeholder="Enter U.I.D. No."
								value={studentData.uidNo}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="fullName">
								Name of the student in full (Name)
							</Label>
							<Input
								type="text"
								id="fullName"
								placeholder="Enter Full Name"
								value={studentData.fullName}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="fatherName">(Father's Name)</Label>
							<Input
								type="text"
								id="fatherName"
								placeholder="Enter Father's Name"
								value={studentData.fatherName}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="surname">(Surname)</Label>
							<Input
								type="text"
								id="surname"
								placeholder="Enter Surname"
								value={studentData.surname}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="motherName">Mother's Name</Label>
							<Input
								type="text"
								id="motherName"
								placeholder="Enter Mother's Name"
								value={studentData.motherName}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="nationality">Nationality</Label>
							<Input
								type="text"
								id="nationality"
								placeholder="Enter Nationality"
								value={studentData.nationality}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="motherTongue">Mother tongue</Label>
							<Input
								type="text"
								id="motherTongue"
								placeholder="Enter Mother Tongue"
								value={studentData.motherTongue}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="religion">Religion</Label>
							<Input
								type="text"
								id="religion"
								placeholder="Enter Religion"
								value={studentData.religion}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="caste">Caste</Label>
							<Input
								type="text"
								id="caste"
								placeholder="Enter Caste"
								value={studentData.caste}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="subCaste">Sub-caste</Label>
							<Input
								type="text"
								id="subCaste"
								placeholder="Enter Sub-caste"
								value={studentData.subCaste}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="placeOfBirth">Place of Birth</Label>
							<Input
								type="text"
								id="placeOfBirth"
								placeholder="Enter Place of Birth"
								value={studentData.placeOfBirth}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="taluka">Taluka</Label>
							<Input
								type="text"
								id="taluka"
								placeholder="Enter Taluka"
								value={studentData.taluka}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="dist">Dist</Label>
							<Input
								type="text"
								id="dist"
								placeholder="Enter Dist"
								value={studentData.dist}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="state">State</Label>
							<Input
								type="text"
								id="state"
								placeholder="Enter State"
								value={studentData.state}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
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
						</div>

						<div className="space-x-2">
							<Label htmlFor="dobWords">Date of Birth (In words)</Label>
							<Input
								type="text"
								id="dobWords"
								placeholder="Enter Date of Birth in words"
								value={studentData.dobWords}
								onChange={handleInputChange}
							/>
						</div>
						<div className="space-x-2">
							<Label htmlFor="dobWords">Date of Birth (In words)</Label>
							<Input
								type="text"
								id="dobWords"
								placeholder="Enter Date of Birth in words"
								value={studentData.dobWords}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="lastSchool">
								Last school attended & standard
							</Label>
							<Input
								type="text"
								id="lastSchool"
								placeholder="Enter Last School Attended"
								value={studentData.lastSchool}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="admissionDate">
								Date of admission in this school
							</Label>
							<Input
								type="text"
								id="admissionDate"
								placeholder="Enter Admission Date"
								value={studentData.admissionDate}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="standard">Standard</Label>
							<Input
								type="text"
								id="standard"
								placeholder="Enter Standard"
								value={studentData.standard}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="progress">Progress</Label>
							<Input
								type="text"
								id="progress"
								placeholder="Enter Progress"
								value={studentData.progress}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="conduct">Conduct</Label>
							<Input
								type="text"
								id="conduct"
								placeholder="Enter Conduct"
								value={studentData.conduct}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="leavingDate">Date of leaving school</Label>
							<Input
								type="text"
								id="leavingDate"
								placeholder="Enter Leaving Date"
								value={studentData.leavingDate}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="studyingStandard">
								Standard in which studying and since when (in words and figure)
							</Label>
							<Input
								type="text"
								id="studyingStandard"
								placeholder="Enter Studying Standard"
								value={studentData.studyingStandard}
								onChange={handleInputChange}
							/>
						</div>

						<div className="space-x-2">
							<Label htmlFor="leavingReason">Reason of leaving school</Label>
							<Input
								type="text"
								id="leavingReason"
								placeholder="Enter Reason for Leaving"
								value={studentData.leavingReason}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Button type="submit">Submit</Button>
						</div>
					</form>
				</TabsContent>
			</Tabs>
		</div>
	);
}
