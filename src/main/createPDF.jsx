const PDFDocument = require('pdfkit');
const fs = require('fs');
const { dialog } = require('electron');

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

		// Student Info Fields in a Single Line
		const studentInfo = `
            Student ID: ${studentData.studentId} Aadhar No: ${studentData.aadharNo}Name: ${studentData.name} Surname: ${studentData.surname} Father's Name: ${studentData.fathersName}
            Mother's Name: ${studentData.mothersName}
            Religion: ${studentData.religion}
            Caste: ${studentData.caste}
            Sub-Caste: ${studentData.subCaste}
            Place of Birth: ${studentData.placeOfBirth}
            Taluka: ${studentData.taluka}
            District: ${studentData.district}
            State: ${studentData.state}
            Date of Birth: ${studentData.dob}
            Last Attended School: ${studentData.lastAttendedSchool}
            Last Attended School Standard: ${studentData.lastSchoolStandard}
            Date of Admission in This School: ${studentData.dateOfAdmission}
            Admission Standard in This School: ${studentData.admissionStandard}
            Progress: ${studentData.progress}
            Conduct: ${studentData.conduct}
            Date of Leaving School: ${studentData.dateOfLeaving}
            Standard in Which Studying and Since When: ${studentData.currentStandard}
            Reason of Leaving School: ${studentData.reasonOfLeaving}
            Remarks: ${studentData.remarks}
        `;

		doc.fontSize(12).text(studentInfo, { align: 'left', lineGap: 1.5 });

		doc.end();
	});
}

module.exports = createPDF;
