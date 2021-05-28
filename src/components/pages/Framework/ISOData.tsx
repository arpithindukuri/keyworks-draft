import { format } from "date-fns";
import { Alert } from "../../../redux/frameworkSlice";
import { controlType, createControl } from "./AllOverviews";

export const ISOAlerts: Alert[] = [
	{
		title: "Control 13.1.3",
		child: (
			<>
				<strong>High Risk Alert:</strong> An unauthorized device has
				connected to, or has attempted to connect to, the segregated OT
				ICS network in violation of ISO27001 Control 13.1.3
			</>
		),
		severity: "error",
		timestamp: format(new Date(), "T"),
	},
	{
		title: "Control A.10.1.2",
		child: (
			<>
				<strong>No Risk:</strong> All cryptographic keys are fully
				stored and backed up. ISO27001 Control A.10.1.2 is no longer in
				violation.
			</>
		),
		severity: "success",
		timestamp: format(new Date(), "T"),
	},
	{
		title: "Control A.18.1.3",
		child: (
			<>
				<strong>High Risk Alert:</strong> Certain data records are
				vulnerable to physical damage, violating ISO270001 Control
				A.18.1.3
			</>
		),
		severity: "error",
		timestamp: format(new Date(), "T"),
	},
	{
		title: "Control A.14.1.2",
		child: (
			<>
				<strong>No Risk:</strong> All systems connected to public
				networks are now appropriately secured. ISO27001 Control
				A.14.1.2 is no longer in violation.
			</>
		),
		severity: "success",
		timestamp: format(new Date(), "T"),
	},
	{
		title: "Control A.11.1.1",
		child: (
			<>
				<strong>No Risk:</strong> All sensitive areas are now
				appropriately secured. ISO27001 Control A.11.1.1 is no longer in
				violation.
			</>
		),
		severity: "success",
		timestamp: format(new Date(), "T"),
	},
	{
		title: "Control A.11.1.1",
		child: (
			<>
				<strong>Medium Risk Alert:</strong> Some systems have not been
				reviewed after a platform change, violating ISO27001 Control
				A.14.2.3
			</>
		),
		severity: "warning",
		timestamp: format(new Date(), "T"),
	},
	{
		title: "Control A.7.1.1",
		child: (
			<>
				<strong>High Risk Alert:</strong> Employees without appropriate
				screening have access to sensitive information, placing them in
				violation of ISO27001 Control A.7.1.1
			</>
		),
		severity: "error",
		timestamp: format(new Date(), "T"),
	},
];

export const ISOControls: controlType[] = [
	createControl("A.13.1.1", "Network Controls", "Medium", 18, false),
	createControl("A.13.1.2", "Security of Network Services", "High", 0, false),
	createControl("A.13.1.3", "Segregation in Networks", "Low", 0, false),
	createControl(
		"A.13.2.1",
		"Information Transfer Policies & Procedures",
		"Low",
		0,
		false
	),
	createControl(
		"A.13.2.2",
		"Agreements on Information Transfer",
		"Low",
		0,
		false
	),
	createControl("A.13.2.3", "Electronic Messaging", "Medium", 0, false),
	createControl(
		"A.13.2.4",
		"Confidentiality or Non-Disclosure Agreements",
		"Medium",
		12,
		false
	),
	createControl(
		"A.14.1.1",
		"Information Security Requirements Analysis & Specification",
		"Low",
		0,
		false
	),
	createControl(
		"A.14.1.2",
		"Securing Application Services on Public Networks",
		"Low",
		0,
		false
	),
	createControl(
		"A.14.1.3",
		"Protecting Application Services Transactions",
		"Medium",
		0,
		false
	),
	createControl("A.14.2.1", "Secure Development Policy", "Low", 9, false),
	createControl(
		"A.14.2.2",
		"System Change Control Procedures",
		"Low",
		0,
		false
	),
	createControl(
		"A.14.2.3",
		"Technical Review of Applications After Operating Platform Changes",
		"Medium",
		0,
		true
	),
	createControl(
		"A.14.2.4",
		"Restrictions on Changes to Software Packages",
		"Low",
		7,
		false
	),
	createControl(
		"A.14.2.5",
		"Secure System Engineering Principles",
		"Medium",
		0,
		false
	),
	createControl(
		"A.14.2.6",
		"Secure Development Environment",
		"Low",
		0,
		false
	),
	createControl("A.14.2.7", "Outsourced Development", "Medium", 0, false),
	createControl("A.14.2.8", "System Security Testing", "Medium", 4, false),
	createControl("A.14.2.9", "System Acceptance Testing", "Medium", 0, false),
	createControl("A.14.3.1", "Protection of Test Data", "Low", 0, false),
];
