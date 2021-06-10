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
    id: "1",
    description:
      "Install and maintain a firewall configuration to protect cardholder data",
    isActive: true,
    severity: "low",
    compliance: 1,
    nestedControls: [
      {
        id: "1.1",
        description:
          "Establish and implement firewall and router configuration standards that include the following",
        isActive: true,
        severity: "medium",
        compliance: 0.3,
        nestedControls: [
          {
            id: "1.1.1",
            description:
              "A formal process for approving and testing all network connections and changes to the firewall and router configurations",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "1.1.2",
            description:
              "Current network diagram that identifies all connections between the cardholder data environment and other networks",
            isActive: false,
            severity: "medium",
            compliance: 0.2,
          },
          {
            id: "1.1.3",
            description: " including any wireless networks",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "1.1.4",
            description:
              "Current diagram that shows all cardholder data flows across systems and networks",
            isActive: true,
            severity: "medium",
            compliance: 0.5,
          },
          {
            id: "1.1.5",
            description:
              "Requirements for a firewall at each Internet connection and between any demilitarized zone (DMZ) and the internal network zone",
            isActive: true,
            severity: "medium",
            compliance: 0.2,
          },
          {
            id: "1.1.6",
            description: "Description of groups",
            isActive: true,
            severity: "medium",
            compliance: 0.1,
          },
          {
            id: "1.1.7",
            description: " roles",
            isActive: true,
            severity: "medium",
            compliance: 0.4,
          },
        ],
      },
      {
        id: "1.2",
        description:
          " and responsibilities for management of network components",
        isActive: false,
        severity: "medium",
        compliance: 0.5,
        nestedControls: [
          {
            id: "1.2.1",
            description:
              "Documentation of business justification and approval for use of all services",
            isActive: true,
            severity: "low",
            compliance: 0.2,
          },
          {
            id: "1.2.2",
            description: " protocols",
            isActive: true,
            severity: "low",
            compliance: 0.9,
          },
          {
            id: "1.2.3",
            description: " and ports allowed",
            isActive: false,
            severity: "low",
            compliance: 0.5,
          },
        ],
      },
      {
        id: "1.3",
        description:
          " including documentation of security features implemented for those protocols considered to be insecure.",
        isActive: false,
        severity: "low",
        compliance: 0.3,
        nestedControls: [
          {
            id: "1.3.1",
            description:
              "Requirement to review firewall and router rule sets at least every six months",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "1.3.2",
            description:
              "Build firewall and router configurations that restrict connections between untrusted networks and any system components in the cardholder data environment",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "1.3.3",
            description:
              "Restrict inbound and outbound traffic to that which is necessary for the cardholder data environment",
            isActive: true,
            severity: "medium",
            compliance: 0.5,
          },
          {
            id: "1.3.4",
            description: " and specifically deny all other traffic.",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "1.3.5",
            description: "Secure and synchronize router configuration files.",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "1.3.6",
            description:
              "Install perimeter firewalls between all wireless networks and the cardholder data environment",
            isActive: true,
            severity: "low",
            compliance: 0.8,
          },
          {
            id: "1.3.7",
            description: " and configure these firewalls to deny or",
            isActive: true,
            severity: "high",
            compliance: 0.8,
          },
        ],
      },
      {
        id: "1.4",
        description: " if traffic is necessary for business purposes",
        isActive: true,
        severity: "medium",
        compliance: 0.9,
      },
      {
        id: "1.5",
        description:
          " permit only authorized traffic between the wireless environment and the cardholder data environment.",
        isActive: false,
        severity: "medium",
        compliance: 1,
      },
    ],
  },
  {
    id: "2",
    description:
      "Prohibit direct public access between the Internet and any system component in the cardholder data environment.",
    isActive: true,
    severity: "medium",
    compliance: 1,
    nestedControls: [
      {
        id: "2.1",
        description:
          "Implement a DMZ to limit inbound traffic to only system components that provide authorized publicly accessible services",
        isActive: false,
        severity: "medium",
        compliance: 0.7,
        nestedControls: [
          {
            id: "2.1.1",
            description: " protocols",
            isActive: true,
            severity: "medium",
            compliance: 0.5,
          },
        ],
      },
      {
        id: "2.2",
        description: " and ports.",
        isActive: false,
        severity: "medium",
        compliance: 0.4,
        nestedControls: [
          {
            id: "2.2.1",
            description:
              "Limit inbound Internet traffic to IP addresses within the DMZ.",
            isActive: true,
            severity: "medium",
            compliance: 0.5,
          },
          {
            id: "2.2.2",
            description:
              "Implement anti-spoofing measures to detect and block forged source IP addresses from entering the network.",
            isActive: false,
            severity: "medium",
            compliance: 0.6,
          },
          {
            id: "2.2.3",
            description:
              "Do not allow unauthorized outbound traffic from the cardholder data environment to the Internet.",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "2.2.4",
            description:
              "Permit only “established” connections into the network.",
            isActive: true,
            severity: "medium",
            compliance: 0.2,
          },
          {
            id: "2.2.5",
            description:
              "Place system components that store cardholder data (such as a database) in an internal network zone",
            isActive: true,
            severity: "low",
            compliance: 0.8,
          },
        ],
      },
      {
        id: "2.3",
        description: " segregated from the DMZ and other untrusted networks.",
        isActive: false,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "2.4",
        description:
          "Do not disclose private IP addresses and routing information to unauthorized parties",
        isActive: false,
        severity: "high",
        compliance: 1,
      },
      {
        id: "2.5",
        description:
          "Install personal firewall software or equivalent functionality on any portable computing devices (including company and/or employee-owned) that connect to the Internet when outside the network (for example",
        isActive: false,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "2.6",
        description: " laptops used by employees)",
        isActive: true,
        severity: "low",
        compliance: 1,
      },
    ],
  },
  {
    id: "3",
    description:
      " and which are also used to access the CDE. Firewall (or equivalent) configurations include: • Specific configuration settings are defined. • Personal firewall (or equivalent functionality) is actively running. • Personal firewall (or equivalent functionality) is not alterable by users of the portable computing devices.",
    isActive: true,
    severity: "low",
    compliance: 0.8,
    nestedControls: [
      {
        id: "3.1",
        description:
          "Ensure that security policies and operational procedures for managing firewalls are documented",
        isActive: false,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "3.2",
        description: " in use",
        isActive: true,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "3.2.1",
            description: " and known to all affected parties.",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "3.2.2",
            description:
              "Do not use vendor-supplied defaults for system passwords and other security parameters",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "3.2.3",
            description:
              "Always change vendor-supplied defaults and remove or disable unnecessary default accounts before installing a system on the network. This applies to ALL default passwords",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "3.3",
        description:
          " including but not limited to those used by operating systems",
        isActive: true,
        severity: "low",
        compliance: 1,
      },
      {
        id: "3.4",
        description: " software that provides security services",
        isActive: false,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "3.4.1",
            description: " application and system accounts",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "3.5",
        description: " point-of-sale(POS) terminals",
        isActive: true,
        severity: "medium",
        compliance: 0.5,
        nestedControls: [
          {
            id: "3.5.1",
            description: " payment applications",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "3.5.2",
            description:
              " Simple Network Management Protocol (SNMP) community strings",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "3.5.3",
            description: " etc.).",
            isActive: false,
            severity: "medium",
            compliance: 0.3,
          },
          {
            id: "3.5.4",
            description:
              "For wireless environments connected to the cardholder data environment or transmitting cardholder data",
            isActive: true,
            severity: "medium",
            compliance: 0.9,
          },
        ],
      },
      {
        id: "3.6",
        description: " change ALL wireless vendor defaults at installation",
        isActive: false,
        severity: "low",
        compliance: 1,
      },
      {
        id: "3.7",
        description:
          " including but not limited to default wireless encryption keys",
        isActive: true,
        severity: "low",
        compliance: 1,
      },
    ],
  },
  {
    id: "4",
    description: " passwords",
    isActive: true,
    severity: "low",
    compliance: 1,
    nestedControls: [
      {
        id: "4.1",
        description: " and SNMP community strings. ",
        isActive: true,
        severity: "medium",
        compliance: 0.8,
        nestedControls: [
          {
            id: "4.1.1",
            description:
              "Develop configuration standards for all system components. Assure that these standards address all known security vulnerabilities and are consistent with industry-accepted system hardening standards. Sources of industry-accepted system hardening standards may include",
            isActive: false,
            severity: "low",
            compliance: 0.5,
          },
        ],
      },
      {
        id: "4.2",
        description:
          " but are not limited to: • Center for Internet Security (CIS) • International Organization for Standardization (ISO) • SysAdmin Audit Network Security (SANS) Institute • National Institute of Standards Technology (NIST).",
        isActive: false,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "4.3",
        description:
          "Implement only one primary function per server to prevent functions that require different security levels from co-existing on the same server. (For example",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
    ],
  },
  {
    id: "5",
    description: " web servers",
    isActive: true,
    severity: "low",
    compliance: 0.6,
    nestedControls: [
      {
        id: "5.1",
        description: " database servers",
        isActive: false,
        severity: "medium",
        compliance: 0.2,
      },
      {
        id: "5.2",
        description: " and DNS should be implemented on separate servers.)",
        isActive: false,
        severity: "low",
        compliance: 1,
      },
      {
        id: "5.3",
        description: "Enable only necessary services",
        isActive: true,
        severity: "low",
        compliance: 1,
      },
      {
        id: "5.4",
        description: " protocols",
        isActive: true,
        severity: "low",
        compliance: 1,
      },
    ],
  },
  {
    id: "6",
    description: " daemons",
    isActive: false,
    severity: "medium",
    compliance: 0.4,
    nestedControls: [
      {
        id: "6.1",
        description: " etc.",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "6.2",
        description: " as required for the function of the system. ",
        isActive: true,
        severity: "medium",
        compliance: 0.8,
      },
      {
        id: "6.3",
        description:
          "Implement additional security features for any required services",
        isActive: true,
        severity: "medium",
        compliance: 0.8,
      },
      {
        id: "6.4",
        description: " protocols",
        isActive: true,
        severity: "low",
        compliance: 1,
      },
      {
        id: "6.5",
        description: " or daemons that are considered to be insecure.",
        isActive: false,
        severity: "low",
        compliance: 0.4,
        nestedControls: [
          {
            id: "6.5.1",
            description:
              "Configure system security parameters to prevent misuse.",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "6.5.2",
            description: "Remove all unnecessary functionality",
            isActive: true,
            severity: "high",
            compliance: 0.3,
          },
          {
            id: "6.5.3",
            description: " such as scripts",
            isActive: true,
            severity: "high",
            compliance: 0.3,
          },
          {
            id: "6.5.4",
            description: " drivers",
            isActive: false,
            severity: "medium",
            compliance: 0.7,
          },
          {
            id: "6.5.5",
            description: " features",
            isActive: true,
            severity: "medium",
            compliance: 0.6,
          },
          {
            id: "6.5.6",
            description: " subsystems",
            isActive: true,
            severity: "medium",
            compliance: 0.7,
          },
          {
            id: "6.5.7",
            description: " file systems",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "6.5.8",
            description: " and unnecessary web servers.",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "6.5.9",
            description:
              "Encrypt all non-console administrative access using strong cryptography. ",
            isActive: false,
            severity: "medium",
            compliance: 0.6,
          },
          {
            id: "6.5.10",
            description:
              "Maintain an inventory of system components that are in scope for PCI DSS.",
            isActive: false,
            severity: "high",
            compliance: 1,
          },
        ],
      },
      {
        id: "6.6",
        description:
          "Ensure that security policies and operational procedures for managing vendor defaults and other security parameters are documented",
        isActive: true,
        severity: "medium",
        compliance: 0.6,
      },
      {
        id: "6.7",
        description: " in use",
        isActive: true,
        severity: "medium",
        compliance: 0.8,
      },
    ],
  },
  {
    id: "7:",
    description: " and known to all affected parties.",
    isActive: true,
    severity: "high",
    compliance: 1,
    nestedControls: [
      {
        id: "7.1",
        description:
          "Shared hosting providers must protect each entity’s hosted environment and cardholder data. These providers must meet specific requirements as detailed in Appendix A1: Additional PCI DSS Requirements for Shared Hosting Providers.",
        isActive: true,
        severity: "high",
        compliance: 0.8,
      },
      {
        id: "7.2",
        description: "Protect stored cardholder data",
        isActive: true,
        severity: "medium",
        compliance: 0.9,
      },
      {
        id: "7.3",
        description:
          "Keep cardholder data storage to a minimum by implementing data retention and disposal policies",
        isActive: false,
        severity: "medium",
        compliance: 0.5,
      },
    ],
  },
  {
    id: "8",
    description:
      " procedures and processes that include at least the following for all cardholder data (CHD) storage: • Limiting data storage amount and retention time to that which is required for legal",
    isActive: true,
    severity: "low",
    compliance: 1,
  },
  {
    id: "9",
    description: " regulatory",
    isActive: true,
    severity: "low",
    compliance: 1,
  },
  {
    id: "10",
    description:
      " and/or business requirements • Specific retention requirements for cardholder data • Processes for secure deletion of data when no longer needed • A quarterly process for identifying and securely deleting stored cardholder data that exceeds defined retention.",
    isActive: true,
    severity: "medium",
    compliance: 0.4,
  },
  {
    id: "11",
    description:
      "Do not store sensitive authentication data after authorization (even if encrypted). If sensitive authentication data is received",
    isActive: false,
    severity: "medium",
    compliance: 1,
  },
  {
    id: "12",
    description:
      " render all data unrecoverable upon completion of the authorization process.",
    isActive: false,
    severity: "low",
    compliance: 0.4,
  },
];
