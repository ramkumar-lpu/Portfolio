import React from "react";
import { Button } from "@/components/ui/button";

const Resume = () => {
	return (
		<div className="min-h-screen p-6">
			<div className="container mx-auto">
				<h1 className="text-3xl md:text-4xl font-semibold mb-4">Resume</h1>

				<p className="mb-4 text-muted-foreground">You can view the resume below or open/download the PDF.</p>

				<div className="flex flex-wrap gap-4 mb-6">
					<Button asChild>
						<a href="./src/pages/resume.pdf" target="_blank" rel="noopener noreferrer">Open / Download PDF</a>
					</Button>
					<Button asChild variant="outline">
						<a href="./src/pages/resume.pdf" download>Download</a>
					</Button>
				</div>

				<div className="w-full h-[80vh] border rounded-md overflow-hidden">
					<iframe src="./src/pages/resume.pdf" title="Resume" className="w-full h-full" />
				</div>
			</div>
		</div>
		);
		};

export default Resume;
