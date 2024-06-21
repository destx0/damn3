const PDFDocument = require('pdfkit');
const fs = require('fs');
const { dialog } = require('electron');

async function createPDF(studentData) {
	return new Promise(async (resolve, reject) => {
		const doc = new PDFDocument({
			size: 'A4',
			margins: {
				top: 30,
				bottom: 30,
				left: 40,
				right: 40,
			},
		});

		const { filePath } = await dialog.showSaveDialog({
			defaultPath: 'leaving_certificate.pdf',
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

		// Header
		doc
			.fontSize(12)
			.text("Jaggannath Shikshan Prasarak Mandal's", { align: 'center' });
		doc
			.fontSize(14)
			.text('Shashikant Sakharam Chaudhari Kanya Vidyalay, Yawal', {
				align: 'center',
			});
		doc.fontSize(10).text('Taluka- Yawal, Dist. Jalgaon', { align: 'center' });
		doc.fontSize(9).text('Phone No. 02585-261290 E Mail - mksyawal@yahoo.in', {
			align: 'center',
		});

		doc.moveDown(0.5);

		// School details
		doc.fontSize(9);
		doc.text(`Sr. No. ${studentData.srNo || ''}`, {
			continued: true,
			align: 'left',
		});
		doc.text(`G. Register No. ${studentData.gRegisterNo || ''}`, {
			align: 'right',
		});
		doc.text(
			`School Reg. No.- Edu. Depu.Dir/Sec-2/First Appru/90-91/92/Div.Sec.Depu.Dir.Nashik/Datted 12-3-92`,
		);
		doc.text(`Medium :- Marathi`);
		doc.text(
			`U Dise No.- 27031508414    Board- Nashik    Index No.- 15.15.005`,
		);

		doc.moveDown(0.5);

		// Title
		doc.fontSize(14).text('Leaving Certificate', { align: 'center' });

		doc.moveDown(0.5);

		// Student Info Fields
		doc.fontSize(10);
		const fields = [
			{ label: 'Student ID', value: studentData.studentId },
			{ label: 'U.I.D. No. (Aadhar Card No.)', value: studentData.aadharNo },
			{ label: 'Name of the student in full (Name)', value: studentData.name },
			{ label: "Father's Name", value: studentData.fathersName },
			{ label: 'Surname', value: studentData.surname },
			{ label: "Mother's Name", value: studentData.mothersName },
			{ label: 'Nationality', value: studentData.nationality },
			{ label: 'Mother tongue', value: studentData.motherTongue },
			{ label: 'Religion', value: studentData.religion },
			{ label: 'Caste', value: studentData.caste },
			{ label: 'Sub-caste', value: studentData.subCaste },
			{ label: 'Place of Birth', value: studentData.placeOfBirth },
			{ label: 'Taluka', value: studentData.taluka },
			{ label: 'Dist', value: studentData.district },
			{ label: 'State', value: studentData.state },
			{ label: 'Country', value: 'India' },
			{ label: 'Date of Birth (DD/MM/YY)', value: studentData.dob },
			{ label: 'Date of Birth (In words)', value: studentData.dobInWords },
			{
				label: 'Last school attended & standard',
				value: studentData.lastSchool,
			},
			{
				label: 'Date of admission in this school',
				value: studentData.dateOfAdmission,
			},
			{ label: 'Standard', value: studentData.admissionStandard },
			{ label: 'Progress', value: studentData.progress },
			{ label: 'Conduct', value: studentData.conduct },
			{ label: 'Date of leaving school', value: studentData.dateOfLeaving },
			{
				label:
					'Standard in which studying and since when (in words and figure)',
				value: studentData.currentStandard,
			},
			{ label: 'Reason of leaving school', value: studentData.reasonOfLeaving },
			{ label: 'Remarks', value: studentData.remarks },
		];

		const lineHeight = 20; // Adjust this value to increase/decrease vertical spacing
		const labelPadding = 5; // Space between label and start of dotted line

		fields.forEach((field, index) => {
			const y = doc.y;
			const labelWidth = doc.widthOfString(field.label + ':');
			const startX = doc.page.margins.left + labelWidth + labelPadding;

			// Draw label
			doc.text(field.label + ':', doc.page.margins.left, y);

			// Draw dotted line
			doc
				.moveTo(startX, y + lineHeight / 2)
				.lineTo(doc.page.width - doc.page.margins.right, y + lineHeight / 2)
				.dash(1, { space: 2 })
				.stroke();

			// Add value text
			doc.text(field.value || '', startX + 2, y);

			// Move to next line
			doc.moveDown(1);
		});

		doc.moveDown();

		doc.text(
			'Certified that the above information is in accordance with the School Register.',
		);

		doc.moveDown();

		// Date
		doc.text(
			'Date: ........................ Month: ........................ Year: ........................',
		);

		doc.moveDown(4);

		// Signatures
		doc.text('Class Teacher', 50, 700);
		doc.text('Clerk', 250, 700);
		doc.text('Head Master', 450, 700);
		doc.text('(Seal)', 450, 715);

		doc.moveDown();

		// Footer
		doc.fontSize(8);
		doc.text(
			'* No change in any entry in this certificate shall be made except by the authority issuing it.',
		);
		doc.text(
			'* Any infringement of the rule is liable to be dealt with by rustication or by other suitable punishment.',
		);

		doc.end();
	});
}

module.exports = createPDF;
