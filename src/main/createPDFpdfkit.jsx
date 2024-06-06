const PDFDocument = require('pdfkit');
const fs = require('fs');
const { dialog } = require('electron');

// Sample student data structure for testing purposes
const studentData = {
	studentId: '12345',
	aadharNo: '987654321012',
	name: 'John Doe',
	surname: 'Doe',
	fathersName: 'Richard Roe',
	mothersName: 'Jane Doe',
	religion: 'Christianity',
	caste: 'General',
	subCaste: 'N/A',
	placeOfBirth: 'Mumbai',
	taluka: 'Yawal',
	district: 'Jalgaon',
	state: 'Maharashtra',
	dob: '01/01/2000',
	lastAttendedSchool: 'XYZ High School',
	lastSchoolStandard: '10th',
	dateOfAdmission: '01/06/2015',
	admissionStandard: '11th',
	progress: 'Excellent',
	conduct: 'Good',
	dateOfLeaving: '30/04/2020',
	currentStandard: '12th',
	reasonOfLeaving: 'Completed Studies',
	remarks: 'No Remarks',
};

async function createPDF(studentData) {
	return new Promise(async (resolve, reject) => {
		const doc = new PDFDocument();
		const { filePath } = await dialog.showSaveDialog({
			defaultPath: 'student_info.pdf',
			filters: [{ name: 'PDF', extensions: ['pdf'] }],
		});

		if (!filePath) {
			reject(new Error('File save canceled'));
			return;
		}

		const writeStream = fs.createWriteStream(filePath);

		writeStream.on('finish', () => resolve(filePath));
		writeStream.on('error', (err) => reject(err));

		doc.pipe(writeStream);

		// Title
		doc
			.fontSize(25)
			.text('Leaving Certificate', { align: 'center' })
			.moveDown();

		// Student Info Fields
		doc.fontSize(12);
		doc.text(`Student ID: ${studentData.studentId}`).moveDown(0.5);
		doc.text(`Aadhar No: ${studentData.aadharNo}`).moveDown(0.5);
		doc.text(`Name: ${studentData.name}`).moveDown(0.5);
		doc.text(`Surname: ${studentData.surname}`).moveDown(0.5);
		doc.text(`Father's Name: ${studentData.fathersName}`).moveDown(0.5);
		doc.text(`Mother's Name: ${studentData.mothersName}`).moveDown(0.5);
		doc.text(`Religion: ${studentData.religion}`).moveDown(0.5);
		doc.text(`Caste: ${studentData.caste}`).moveDown(0.5);
		doc.text(`Sub-Caste: ${studentData.subCaste}`).moveDown(0.5);
		doc.text(`Place of Birth: ${studentData.placeOfBirth}`).moveDown(0.5);
		doc.text(`Taluka: ${studentData.taluka}`).moveDown(0.5);
		doc.text(`District: ${studentData.district}`).moveDown(0.5);
		doc.text(`State: ${studentData.state}`).moveDown(0.5);
		doc.text(`Date of Birth: ${studentData.dob}`).moveDown(0.5);
		doc
			.text(`Last Attended School: ${studentData.lastAttendedSchool}`)
			.moveDown(0.5);
		doc
			.text(`Last Attended School Standard: ${studentData.lastSchoolStandard}`)
			.moveDown(0.5);
		doc
			.text(`Date of Admission in This School: ${studentData.dateOfAdmission}`)
			.moveDown(0.5);
		doc
			.text(
				`Admission Standard in This School: ${studentData.admissionStandard}`,
			)
			.moveDown(0.5);
		doc.text(`Progress: ${studentData.progress}`).moveDown(0.5);
		doc.text(`Conduct: ${studentData.conduct}`).moveDown(0.5);
		doc
			.text(`Date of Leaving School: ${studentData.dateOfLeaving}`)
			.moveDown(0.5);
		doc
			.text(
				`Standard in Which Studying and Since When: ${studentData.currentStandard}`,
			)
			.moveDown(0.5);
		doc
			.text(`Reason of Leaving School: ${studentData.reasonOfLeaving}`)
			.moveDown(0.5);
		doc.text(`Remarks: ${studentData.remarks}`).moveDown(0.5);

		doc.end();
	});
}

module.exports = createPDF;
