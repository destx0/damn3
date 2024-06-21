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

		// Header (increased font sizes)
		doc
			.fontSize(16)
			.text("Jaggannath Shikshan Prasarak Mandal's", { align: 'center' });
		doc
			.fontSize(18)
			.text('Shashikant Sakharam Chaudhari Kanya Vidyalay, Yawal', {
				align: 'center',
			});
		doc.fontSize(14).text('Taluka- Yawal, Dist. Jalgaon', { align: 'center' });
		doc.fontSize(12).text('Phone No. 02585-261290 E Mail - mksyawal@yahoo.in', {
			align: 'center',
		});

		doc.moveDown(0.5);

		// School details (increased font size)
		doc.fontSize(12);
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

		// Title (increased font size)
		doc.fontSize(20).text('Leaving Certificate', { align: 'center' });

		doc.moveDown(0.5);

		// Student Info Fields (increased font size)
		doc.fontSize(12);
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

		const lineSpacing = 7; // Increased space between lines
		const fieldSpacing = 12; // Increased space between fields
		let currentX = doc.page.margins.left;
		let currentY = doc.y;

		fields.forEach((field, index) => {
			const labelText = `${field.label}: `;
			const valueText = field.value || '';

			const labelWidth = doc.widthOfString(labelText);
			const valueWidth = doc.widthOfString(valueText);
			const totalWidth = labelWidth + valueWidth;

			if (currentX + totalWidth > doc.page.width - doc.page.margins.right) {
				// Move to next line if there's not enough space
				currentX = doc.page.margins.left;
				currentY += lineSpacing + doc.currentLineHeight();
			}

			// Draw label (bold)
			doc
				.font('Helvetica-Bold')
				.text(labelText, currentX, currentY, { continued: true });

			// Draw value (normal) with dotted underline
			const valueX = currentX + labelWidth;
			doc.font('Helvetica').text(valueText, { underline: true });

			// Draw dotted underline
			doc
				.moveTo(valueX, currentY + doc.currentLineHeight())
				.lineTo(valueX + valueWidth, currentY + doc.currentLineHeight())
				.dash(1, { space: 2 })
				.stroke();

			// Update position for next field
			currentX += totalWidth + fieldSpacing;

			// Check if we need to move to the next line
			if (currentX > doc.page.width - doc.page.margins.right - 100) {
				// 100 is a buffer
				currentX = doc.page.margins.left;
				currentY += lineSpacing + doc.currentLineHeight();
			}
		});

		doc.moveDown(2);

		doc.text(
			'Certified that the above information is in accordance with the School Register.',
		);

		doc.moveDown();

		// Date
		doc.text(
			'Date: ........................ Month: ........................ Year: ........................',
		);

		doc.moveDown(4);

		// Signatures (increased font size)
		doc.fontSize(12);
		doc.text('Class Teacher', 50, 700);
		doc.text('Clerk', 250, 700);
		doc.text('Head Master', 450, 700);
		doc.text('(Seal)', 450, 715);

		doc.moveDown();

		// Footer (slightly increased font size)
		doc.fontSize(10);
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
