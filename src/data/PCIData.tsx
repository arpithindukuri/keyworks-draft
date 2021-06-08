import { format } from "date-fns";
import { Alert, Control } from "../redux/frameworkSlice";

export const PCIAlerts: Alert[] = [
  {
    title: "Control 4.1.1",
    child: (
      <>
        <strong>High Risk Alert:</strong> A PCI transaction contains unencrypted
        data and is in violation of PCI Control 4.1.1
      </>
    ),
    severity: "error",
    timestamp: format(new Date(), "T"),
  },
  {
    title: "Control 5.2",
    child: (
      <>
        <strong>Medium Risk Alert:</strong> 4 systems currently do not have
        functioning antivirus and are in violation of PCI Control 5.2
      </>
    ),
    severity: "warning",
    timestamp: format(new Date(), "T"),
  },
  {
    title: "Control 6.5.1",
    child: (
      <>
        <strong>Medium Risk Alert:</strong> A data server is vulnerable to SQL
        injection attacks, and is in violation of PCI Control 6.5.1
      </>
    ),
    severity: "warning",
    timestamp: format(new Date(), "T"),
  },
];

export const PCIControls: Control[] = [
  {
    id: "1.1",
    isActive: false,
    description:
      "Establish and implement firewall and router configuration standards that include the following:",
    severity: "low",
    nestedControls: [
      {
        id: "1.1.1",
        isActive: false,
        description:
          "A formal process for approving and testing all network connections and changes to the firewall and router configuration",
        severity: "high",
        compliance: Math.random(),
        requiredProcesses: [
          {
            name: "An inventory of authorized wireless access points with listed business justifications (11.1.1)",
            process: {
              id: "doc-1.1.1-a",
              name: "doc-1.1.1-a",
              dateUploaded: format(new Date(), "T"),
              link: "https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf",
              status: "needs-review",
            },
          },
          {
            name: "Have a process in place to keep up to date with the latest identified security vulnerabilities and their threat level. (6.1, 6.5.6)",
          },
        ],
      },
      {
        id: "1.1.2",
        isActive: false,
        description:
          "Current network diagram that identifies all connections between the cardholder data environment and other networks, including any wireless network",
        severity: "medium",
        compliance: Math.random(),
        dataItems: [
          {
            name: "How many days until this diagram should be updated",
            type: "number",
            value: 200,
          },
        ],
      },
      {
        id: "1.1.3",
        isActive: false,
        description:
          "Current diagram that shows all cardholder data flows across systems and network",
        severity: "low",
        compliance: 1,
      },
      {
        id: "1.1.4",
        isActive: false,
        description:
          "Requirements for a firewall at each Internet connection and between any demilitarized zone (DMZ) and the internal network zone",
        severity: "medium",
        compliance: 1,
      },
      {
        id: "1.1.5",
        isActive: false,
        description:
          "Description of groups, roles, and responsibilities for management of network component",
        severity: "high",
        compliance: 1,
      },
      {
        id: "1.1.6",
        isActive: false,
        description:
          "Documentation of business justification and approval for use of all services, protocols, and ports allowed, including documentation of security features implemented for those protocols considered to be insecure",
        severity: "low",
        compliance: 1,
        requiredDocuments: [
          {
            name: "Documented business justification for each port or protocol allowed through the firewall (1.1.6a)",
            document: {
              id: "doc-1.1.6-a",
              name: "doc-1.1.6-a",
              dateUploaded: format(new Date(), "T"),
              link: "https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf",
              status: "in-effect",
            },
          },
        ],
      },
      {
        id: "1.1.7",
        isActive: false,
        description:
          "Requirement to review firewall and router rule sets at least every six month",
        severity: "low",
        compliance: 1,
      },
    ],
  },
  {
    id: "1.2",
    isActive: false,
    description:
      "Build firewall and router configurations that restrict connections between untrusted networks and any system components in the cardholder data environment",
    severity: "medium",
    nestedControls: [
      {
        id: "1.2.1",
        isActive: false,
        description:
          "Restrict inbound and outbound traffic to that which is necessary for the cardholder data environment, and specifically deny all other traffic",
        severity: "medium",
        compliance: Math.random(),
      },
      {
        id: "1.2.2",
        isActive: false,
        description: "Secure and synchronize router configuration files",
        severity: "medium",
        compliance: 1,
      },
      {
        id: "1.2.3",
        isActive: false,
        description:
          "Install perimeter firewalls between all wireless networks and the cardholder data environment, and configure these firewalls to deny or, if traffic is necessary for business purposes, permit only authorized traffic between the wireless environment and the cardholder data environment",
        severity: "medium",
        compliance: 1,
      },
    ],
  },
  {
    id: "1.3",
    isActive: false,
    description:
      "Prohibit direct public access between the Internet and any system component in the cardholder data environment",
    severity: "low",
    nestedControls: [
      {
        id: "1.3.1",
        isActive: false,
        description:
          "Implement a DMZ to limit inbound traffic to only system components that provide authorized publicly accessible services, protocols, and ports",
        severity: "medium",
        compliance: Math.random(),
      },
      {
        id: "1.3.2",
        isActive: false,
        description:
          "Limit inbound Internet traffic to IP addresses within the DMZ",
        severity: "low",
        compliance: 1,
      },
      {
        id: "1.3.3",
        isActive: false,
        description:
          "Implement anti-spoofing measures to detect and block forged source IP addresses from entering the network",
        severity: "medium",
        compliance: 1,
      },
      {
        id: "1.3.4",
        isActive: false,
        description:
          "Do not allow unauthorized outbound traffic from the cardholder data environment to the Internet",
        severity: "medium",
        compliance: 1,
      },
      {
        id: "1.3.5",
        isActive: false,
        description: "Permit only “established” connections into the network",
        severity: "medium",
        compliance: 1,
      },
      {
        id: "1.3.6",
        isActive: false,
        description:
          "Place system components that store cardholder data (such as a database) in an internal network zone, segregated from the DMZ and other untrusted networks",
        severity: "low",
        compliance: Math.random(),
      },
      {
        id: "1.3.7",
        isActive: false,
        description:
          "Do not disclose private IP addresses and routing information to unauthorized parties",
        severity: "low",
        compliance: Math.random(),
      },
    ],
  },
  {
    id: "1.4",
    isActive: false,
    description:
      "Install personal firewall software or equivalent functionality on any portable computing devices (including company and/or employee-owned) that connect to the Internet when outside the network (for example, laptops used by employees), and which are also used to access the CDE",
    severity: "low",
    compliance: 1,
  },
  {
    id: "1.5",
    isActive: false,
    description:
      "Ensure that security policies and operational procedures for managing firewalls are documented, in use, and known to all affected parties",
    severity: "medium",
    compliance: 1,
  },
];
