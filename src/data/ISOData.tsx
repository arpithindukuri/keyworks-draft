import { format } from "date-fns";
import { Alert, Control } from "../redux/frameworkSlice";

export const ISOAlerts: Alert[] = [
  {
    title: "Control 13.1.3",
    child: (
      <>
        <strong>High Risk Alert:</strong> An unauthorized device has connected
        to, or has attempted to connect to, the segregated OT ICS network in
        violation of ISO27001 Control 13.1.3
      </>
    ),
    severity: "error",
    timestamp: format(new Date(), "T"),
  },
  {
    title: "Control A.10.1.2",
    child: (
      <>
        <strong>No Risk:</strong> All cryptographic keys are fully stored and
        backed up. ISO27001 Control A.10.1.2 is no longer in violation.
      </>
    ),
    severity: "success",
    timestamp: format(new Date(), "T"),
  },
  {
    title: "Control A.18.1.3",
    child: (
      <>
        <strong>High Risk Alert:</strong> Certain data records are vulnerable to
        physical damage, violating ISO270001 Control A.18.1.3
      </>
    ),
    severity: "error",
    timestamp: format(new Date(), "T"),
  },
  {
    title: "Control A.14.1.2",
    child: (
      <>
        <strong>No Risk:</strong> All systems connected to public networks are
        now appropriately secured. ISO27001 Control A.14.1.2 is no longer in
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
        <strong>No Risk:</strong> All sensitive areas are now appropriately
        secured. ISO27001 Control A.11.1.1 is no longer in violation.
      </>
    ),
    severity: "success",
    timestamp: format(new Date(), "T"),
  },
  {
    title: "Control A.11.1.1",
    child: (
      <>
        <strong>Medium Risk Alert:</strong> Some systems have not been reviewed
        after a platform change, violating ISO27001 Control A.14.2.3
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

export const ISOControls: Control[] = [
  {
    id: "A.13.1.1",
    isActive: true,
    description: "Network Control",
    severity: "low",
  },
  {
    id: "A.13.1.2",
    isActive: true,
    description: "Security of Network Service",
    severity: "low",
  },
  {
    id: "A.13.1.3",
    isActive: true,
    description: "Segregation in Network",
    severity: "medium",
  },
  {
    id: "A.13.2.1",
    isActive: true,
    description: "Information Transfer Policies & Procedure",
    severity: "medium",
  },
  {
    id: "A.13.2.2",
    isActive: true,
    description: "Agreements on Information Transfe",
    severity: "medium",
  },
  {
    id: "A.13.2.3",
    isActive: true,
    description: "Electronic Messagin",
    severity: "medium",
  },
  {
    id: "A.13.2.4",
    isActive: true,
    description: "Confidentiality or Non-Disclosure Agreement",
    severity: "low",
  },
  {
    id: "A.14.1.1",
    isActive: true,
    description: "Information Security Requirements Analysis & Specificatio",
    severity: "medium",
  },
  {
    id: "A.14.1.2",
    isActive: true,
    description: "Securing Application Services on Public Network",
    severity: "low",
  },
  {
    id: "A.14.1.3",
    isActive: true,
    description: "Protecting Application Services Transaction",
    severity: "medium",
  },
  {
    id: "A.14.2.1",
    isActive: true,
    description: "Secure Development Polic",
    severity: "medium",
  },
  {
    id: "A.14.2.2",
    isActive: true,
    description: "System Change Control Procedure",
    severity: "low",
  },
  {
    id: "A.14.2.3",
    isActive: true,
    description:
      "Technical Review of Applications After Operating Platform Change",
    severity: "medium",
  },
  {
    id: "A.14.2.4",
    isActive: true,
    description: "Restrictions on Changes to Software Package",
    severity: "low",
  },
  {
    id: "A.14.2.5",
    isActive: true,
    description: "Secure System Engineering Principle",
    severity: "low",
  },
  {
    id: "A.14.2.6",
    isActive: true,
    description: "Secure Development Environmen",
    severity: "medium",
  },
  {
    id: "A.14.2.7",
    isActive: true,
    description: "Outsourced Developmen",
    severity: "low",
  },
  {
    id: "A.14.2.8",
    isActive: true,
    description: "System Security Testin",
    severity: "medium",
  },
  {
    id: "A.14.2.9",
    isActive: true,
    description: "System Acceptance Testin",
    severity: "low",
  },
  {
    id: "A.14.3.1",
    isActive: true,
    description: "Protection of Test Dat",
    severity: "medium",
  },
];
