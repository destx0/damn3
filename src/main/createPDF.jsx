const PDFDocument = require('pdfkit');
const fs = require('fs');
const { dialog } = require('electron');

async function createPDF(studentData) {
	return new Promise(async (resolve, reject) => {
		console.log('Creating PDF document');
		const doc = new PDFDocument();

		console.log('PDF document created');

		// Open the file manager dialog to select the output path
		const { filePath } = await dialog.showSaveDialog({
			defaultPath: 'student_info.pdf',
			filters: [{ name: 'PDF', extensions: ['pdf'] }],
		});

		if (!filePath) {
			console.log('File save canceled');
			reject(new Error('File save canceled'));
			return;
		}

		const writeStream = fs.createWriteStream(filePath);

		writeStream.on('finish', () => {
			console.log('Write stream finished');
			resolve(filePath);
		});

		writeStream.on('error', (err) => {
			console.error('Write stream error:', err);
			reject(err);
		});

		doc.pipe(writeStream);

		console.log('PDF stream piped to output file');

		doc.fontSize(25).text('Student Information', { align: 'center' });
		doc.moveDown();
		doc.fontSize(18);

		console.log('Added title and moved down');

		Object.keys(studentData).forEach((key) => {
			const value = studentData[key];
			if (value !== undefined) {
				doc.text(`${key}: ${value}`, { width: 410, align: 'left' });
				doc.moveDown(0.5);
			}
		});

		console.log('Added student data');

		doc.end();

		console.log('PDF document ended');
	});
}
module.exports = createPDF;
