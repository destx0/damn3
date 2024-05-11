const PDFDocument = require('pdfkit');
const fs = require('fs');

function createPDF(studentData, path) {
	const doc = new PDFDocument();

	doc.pipe(fs.createWriteStream(path));

	doc.fontSize(25).text('Student Information', 100, 80);

	doc
		.fontSize(12)
		.text(`Student ID: ${studentData.studentId}`, 100, 120)
		.text(`Full Name: ${studentData.fullName}`, 100, 140)
		.text(`Father's Name: ${studentData.fatherName}`, 100, 160)
		.text(`Date of Birth: ${studentData.dob}`, 100, 180)
		.text(`Nationality: ${studentData.nationality}`, 100, 200);
	// Add more fields as necessary

	doc.end();
}

module.exports = createPDF;
