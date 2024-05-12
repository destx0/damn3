import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CertificateForm from './Form1'; 

export function Home() {
	return (
		<div className="flex flex-col gap-4 items-center h-screen overflow-auto">
			<Tabs defaultValue="c2" className="w-screen p-8 justify-center">
				<TabsList>
					<TabsTrigger value="c1">Certificate 1</TabsTrigger>
					<TabsTrigger value="c2">Certificate 2</TabsTrigger>
				</TabsList>
				<TabsContent value="c1">
					Make changes to your account here.Make changes to your account here.
				</TabsContent>
				<TabsContent value="c2" className="gap-12 m-12">
					<CertificateForm />
				</TabsContent>
			</Tabs>
		</div>
	);
}
