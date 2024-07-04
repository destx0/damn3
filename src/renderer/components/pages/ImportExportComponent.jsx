import React from 'react';
import { Upload, Download } from 'lucide-react';

const ImportExportComponent = () => {
	return (
		<div className="flex flex-col gap-4 p-4">
			<h2 className="text-2xl font-bold">Import/Export</h2>
			<div className="flex gap-4">
				<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
					<Upload className="mr-2 h-4 w-4" />
					Import Data
				</button>
				<button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center">
					<Download className="mr-2 h-4 w-4" />
					Export Data
				</button>
			</div>
			<p className="mt-4">
				Use these buttons to import or export student data and leave
				certificates.
			</p>
		</div>
	);
};

export default ImportExportComponent;
