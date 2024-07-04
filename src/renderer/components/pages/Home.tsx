import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCircle, FileText, Upload } from 'lucide-react';
import CertificateForm from './Form1';
import AllStudents from './AllStudents';
import ImportExportComponent from './ImportExportComponent';

export function Home() {
	return (
		<div className="flex flex-col gap-4 items-center h-screen overflow-auto">
			<Tabs defaultValue="c1" className="w-screen p-8 justify-center">
				<TabsList className="grid w-full grid-cols-3 rounded-xl bg-gray-100 p-1">
					<TabsTrigger
						value="c1"
						className="data-[state=active]:bg-white rounded-lg transition-all"
					>
						<UserCircle className="mr-2 h-4 w-4" />
						All Students
					</TabsTrigger>
					<TabsTrigger
						value="c2"
						className="data-[state=active]:bg-white rounded-lg transition-all"
					>
						<FileText className="mr-2 h-4 w-4" />
						Add Leave Certificate
					</TabsTrigger>
					<TabsTrigger
						value="c3"
						className="data-[state=active]:bg-white rounded-lg transition-all"
					>
						<Upload className="mr-2 h-4 w-4" />
						Import/Export
					</TabsTrigger>
				</TabsList>
				<TabsContent value="c1" className="mt-6">
					<AllStudents />
				</TabsContent>
				<TabsContent value="c2" className="mt-6">
					<CertificateForm />
				</TabsContent>
				<TabsContent value="c3" className="mt-6">
					<ImportExportComponent />
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default Home;
