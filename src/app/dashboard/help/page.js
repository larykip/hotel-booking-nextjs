import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * HelpPage component that displays frequently asked questions and answers.
 * @returns {JSX.Element} The rendered HelpPage component.
 */
const HelpPage = () => {
	return (
		<div className="container mx-auto py-8">
			<h1 className="mb-6 text-3xl font-bold">Help Center</h1>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Quick Start Guide</CardTitle>
						<CardDescription>Learn the basics of using the Metro Manor - Dashboard</CardDescription>
					</CardHeader>
					<CardContent>
						<ol className="list-inside list-decimal space-y-2">
							<li>Navigate using the sidebar menu</li>
							<li>View reservations and occupancy on the main dashboard</li>
							<li>Use the search bar to find specific information</li>
							<li>Create new reservations using the "New reservation" button</li>
							<li>Check notifications for important updates</li>
						</ol>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Contact Support</CardTitle>
						<CardDescription>Get in touch with our support team</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="mb-4">If you need further assistance, please contact our support team:</p>
						<ul className="space-y-2">
							<li>Email: support@metromanordashboard.com</li>
							<li>Phone: +254 (720) 123-567</li>
							<li>Live Chat: Available 24/7 on the dashboard</li>
						</ul>
					</CardContent>
				</Card>
			</div>

			<h2 className="mb-6 mt-12 text-2xl font-semibold">Frequently Asked Questions</h2>
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger>How do I create a new reservation?</AccordionTrigger>
					<AccordionContent>
						To create a new reservation, click on the "New reservation" button in the top right corner of the dashboard. Fill in the required information in the form
						that appears, including guest details, room type, and dates of stay. Once completed, click "Confirm Reservation" to finalize the booking.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>How can I view occupancy rates?</AccordionTrigger>
					<AccordionContent>
						Occupancy rates are displayed on the main dashboard under the "Occupancy" card. You can see the number of vacant, occupied, and not ready rooms. For more
						detailed occupancy reports, navigate to the "Reports" section using the sidebar menu.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>How do I update guest information?</AccordionTrigger>
					<AccordionContent>
						To update guest information, go to the "Guests" section using the sidebar menu. Use the search function to find the specific guest, then click on their name
						to access their profile. From there, you can edit their details and save the changes.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-4">
					<AccordionTrigger>Can I customize the dashboard layout?</AccordionTrigger>
					<AccordionContent>
						Currently, the dashboard layout is fixed to ensure consistency across all users. However, you can collapse the sidebar to gain more screen space. We're
						working on customization options for future updates. Stay tuned for announcements in the "What's New" section.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-5">
					<AccordionTrigger>How do I generate reports?</AccordionTrigger>
					<AccordionContent>
						To generate reports, navigate to the "Reports" section using the sidebar menu. From there, you can select the type of report you need (e.g., occupancy,
						revenue, guest statistics). Choose the date range and any other relevant filters, then click "Generate Report". You can view the report on-screen or
						download it in various formats like PDF or CSV.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default HelpPage;
