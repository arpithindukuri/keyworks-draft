import { format } from "date-fns";
import { Alert, Control } from "../redux/frameworkSlice";

export const NISTAlerts: Alert[] = [
  {
    title: "Control 5.2.2",
    child: (
      <>
        <strong>Medium Risk Alert:</strong> A user ID has failed to enter the
        correct password in the required number of attempts and is in violation
        of NIST Control 5.2.2
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

export const NISTControls: Control[] = [
  {
    id: "5.1",
    isActive: true,
    description: "Requirements by Authenticator Typ",
    severity: "medium",
    nestedControls: [
      {
        id: "5.1.1",
        isActive: true,
        description: "Memorized Secret",
        severity: "low",
        nestedControls: [
          {
            id: "5.1.1.1",
            isActive: true,
            description: "Memorized Secret Authenticator",
            severity: "medium",
            compliance: Math.random(),
          },
          {
            id: "5.1.1.2",
            isActive: true,
            description: "Memorized Secret Verifier",
            severity: "low",
            compliance: Math.random(),
          },
        ],
      },
      {
        id: "5.1.2",
        isActive: true,
        description: "Look-Up Secret",
        severity: "medium",
        nestedControls: [
          {
            id: "5.1.2.1",
            isActive: true,
            description: "Look-Up Secret Authenticator",
            severity: "medium",
            compliance: 1,
          },
          {
            id: "5.1.2.2",
            isActive: true,
            description: "Look-Up Secret Verifier",
            severity: "medium",
            compliance: Math.random(),
          },
        ],
      },
      {
        id: "5.1.3",
        isActive: true,
        description: "Out-of-Band Device",
        severity: "high",
        nestedControls: [
          {
            id: "5.1.3.1",
            isActive: true,
            description: "Out-of-Band Authenticator",
            severity: "medium",
            compliance: Math.random(),
          },
          {
            id: "5.1.3.2",
            isActive: true,
            description: "Out-of-Band Verifier",
            severity: "medium",
            compliance: 1,
          },
          {
            id: "5.1.3.3",
            isActive: true,
            description:
              "Authentication using the Public Switched Telephone Networ",
            severity: "medium",
            compliance: Math.random(),
          },
        ],
      },
      {
        id: "5.1.4",
        isActive: true,
        description: "Single-Factor OTP Devic",
        severity: "high",
        nestedControls: [
          {
            id: "5.1.4.1",
            isActive: true,
            description: "Single-Factor OTP Authenticator",
            severity: "medium",
            compliance: 1,
          },
          {
            id: "5.1.4.2",
            isActive: true,
            description: "Single-Factor OTP Verifier",
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "5.1.5",
        isActive: true,
        description: "Multi-Factor OTP Device",
        severity: "medium",
        nestedControls: [
          {
            id: "5.1.5.1",
            isActive: true,
            description: "Multi-Factor OTP Authenticator",
            severity: "medium",
            compliance: 1,
          },
          {
            id: "5.1.5.2",
            isActive: true,
            description: "Multi-Factor OTP Verifier",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "5.1.6",
        isActive: true,
        description: "Single-Factor Cryptographic Softwar",
        severity: "medium",
        nestedControls: [
          {
            id: "5.1.6.1",
            isActive: true,
            description: "Single-Factor Cryptographic Software Authenticator",
            severity: "medium",
            compliance: 1,
          },
          {
            id: "5.1.6.2",
            isActive: true,
            description: "Single-Factor Cryptographic Software Verifier",
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "5.1.7",
        isActive: true,
        description: "Single-Factor Cryptographic Device",
        severity: "medium",
        nestedControls: [
          {
            id: "5.1.7.1",
            isActive: true,
            description: "Single-Factor Cryptographic Device Authenticator",
            severity: "high",
            compliance: 1,
          },
          {
            id: "5.1.7.2",
            isActive: true,
            description: "Single-Factor Cryptographic Device Verifier",
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "5.1.8",
        isActive: true,
        description: "Multi-Factor Cryptographic Softwar",
        severity: "medium",
        nestedControls: [
          {
            id: "5.1.8.1",
            isActive: true,
            description: "Multi-Factor Cryptographic Software Authenticator",
            severity: "high",
            compliance: 1,
          },
          {
            id: "5.1.8.2",
            isActive: true,
            description: "Multi-Factor Cryptographic Software Verifier",
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "5.1.9",
        isActive: true,
        description: "Multi-Factor Cryptographic Device",
        severity: "low",
        nestedControls: [
          {
            id: "5.1.9.1",
            isActive: true,
            description: "Multi-Factor Cryptographic Device Authenticator",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
];
