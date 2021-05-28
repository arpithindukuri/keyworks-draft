import { format } from "date-fns";
import { Alert } from "../../../redux/frameworkSlice";
import { controlType, createControl } from "./AllOverviews";

export const NISTAlerts: Alert[] = [
	{
		title: "Control 5.2.2",
		child: (
			<>
				<strong>Medium Risk Alert:</strong> A user ID has failed to
				enter the correct password in the required number of attempts
				and is in violation of NIST Control 5.2.2
			</>
		),
		severity: "warning",
		timestamp: format(new Date(), "T"),
	},
	{
		title: "Control 9.1",
		child: (
			<>
				<strong>No Risk:</strong> All systems have passed Privacy Risk
				Assessments. NIST Control 9.1 is no longer in violation.
			</>
		),
		severity: "success",
		timestamp: format(new Date(), "T"),
	},
];

export const NISTControls: controlType[] = [
	createControl(
		"5.1",
		"Requirements by Authenticator Type",
		"High",
		0,
		false
	),
	createControl("5.1.1", "Memorized Secrets", "Low", 0, true),
	createControl(
		"5.1.1.1",
		"Memorized Secret Authenticators",
		"Low",
		5,
		false
	),
	createControl("5.1.1.2", "Memorized Secret Verifiers", "Low", 0, false),
	createControl("5.1.2", "Look-Up Secrets", "Medium", 0, false),
	createControl("5.1.2.1", "Look-Up Secret Authenticators", "Low", 0, false),
	createControl("5.1.2.2", "Look-Up Secret Verifiers", "Medium", 0, false),
	createControl("5.1.3", "Out-of-Band Devices", "Medium", 6, false),
	createControl("5.1.3.1", "Out-of-Band Authenticators", "Medium", 0, false),
	createControl("5.1.3.2", "Out-of-Band Verifiers", "Medium", 0, false),
	createControl(
		"5.1.3.3",
		"Authentication using the Public Switched Telephone Network",
		"Medium",
		0,
		false
	),
	createControl("5.1.4", "Single-Factor OTP Device", "Medium", 0, false),
	createControl(
		"5.1.4.1",
		"Single-Factor OTP Authenticators",
		"Low",
		9,
		false
	),
	createControl("5.1.4.2", "Single-Factor OTP Verifiers", "Medium", 0, false),
	createControl("5.1.5", "Multi-Factor OTP Devices", "Medium", 0, false),
	createControl(
		"5.1.5.1",
		"Multi-Factor OTP Authenticators",
		"Medium",
		0,
		false
	),
	createControl("5.1.5.2", "Multi-Factor OTP Verifiers", "Medium", 14, false),
	createControl(
		"5.1.6",
		"Single-Factor Cryptographic Software",
		"Medium",
		0,
		false
	),
	createControl(
		"5.1.6.1",
		"Single-Factor Cryptographic Software Authenticators",
		"Medium",
		0,
		false
	),
	createControl(
		"5.1.6.2",
		"Single-Factor Cryptographic Software Verifiers",
		"Low",
		0,
		false
	),
	createControl(
		"5.1.7",
		"Single-Factor Cryptographic Devices",
		"Low",
		0,
		false
	),
	createControl(
		"5.1.7.1",
		"Single-Factor Cryptographic Device Authenticators",
		"Medium",
		18,
		false
	),
	createControl(
		"5.1.7.2",
		"Single-Factor Cryptographic Device Verifiers",
		"Low",
		0,
		false
	),
	createControl(
		"5.1.8",
		"Multi-Factor Cryptographic Software",
		"High",
		0,
		false
	),
	createControl(
		"5.1.8.1",
		"Multi-Factor Cryptographic Software Authenticators",
		"Low",
		10,
		false
	),
	createControl(
		"5.1.8.2",
		"Multi-Factor Cryptographic Software Verifiers",
		"Medium",
		0,
		false
	),
	createControl(
		"5.1.9",
		"Multi-Factor Cryptographic Devices",
		"Medium",
		0,
		false
	),
	createControl(
		"5.1.9.1",
		"Multi-Factor Cryptographic Device Authenticators",
		"Medium",
		0,
		false
	),
	createControl(
		"5.1.9.2",
		"Multi-Factor Cryptographic Device Verifier",
		"Medium",
		0,
		false
	),
];
