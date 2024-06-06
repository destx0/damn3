'use client';

import { Menu, Eye, Edit, Trash, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DropdownMenuComponent = ({ student }) => {
	const handleDownloadPDF = async () => {
		try {
			await window.electron.generatePDF(student);
			window.electron.onPDFGenerated((message, path) => {
				alert(`Success: ${message}`);
				const link = document.createElement('a');
				link.href = `file://${path}`;
				link.download = 'student_info.pdf';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				console.log('PDF saved at:', path);
			});
		} catch (error) {
			alert(`Failed to generate PDF: ${error}`);
			console.error('Error generating PDF:', error);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<Menu className="h-4 w-4 text-blue-500" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="start"
				side="bottom"
				sideOffset={5}
				className="w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
			>
				<DropdownMenuLabel className="text-gray-700 font-semibold">
					Actions
				</DropdownMenuLabel>
				<DropdownMenuItem className="flex items-center text-gray-700 hover:bg-blue-100">
					<Eye className="mr-2 h-4 w-4 text-blue-500" />
					View student details
				</DropdownMenuItem>
				<DropdownMenuItem className="flex items-center text-gray-700 hover:bg-yellow-100">
					<Edit className="mr-2 h-4 w-4 text-yellow-500" />
					Edit student
				</DropdownMenuItem>
				<DropdownMenuItem className="flex items-center text-gray-700 hover:bg-red-100">
					<Trash className="mr-2 h-4 w-4 text-red-500" />
					Delete student
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex items-center text-gray-700 hover:bg-green-100"
					onClick={handleDownloadPDF}
				>
					<Printer className="mr-2 h-4 w-4 text-green-500" />
					Download PDF
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownMenuComponent;
