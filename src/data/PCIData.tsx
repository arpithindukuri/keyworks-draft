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
    nestedControls: [
      {
        id: "1.1",
        description:
          "Establish and implement firewall and router configuration standards that include the following",
        isActive: true,
        severity: "low",
        nestedControls: [
          {
            id: "1.1.1",
            description:
              "A formal process for approving and testing all network connections and changes to the firewall and router configurations",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "1.1.2",
            description:
              "Current network diagram that identifies all connections between the cardholder data environment and other networks, including any wireless networks",
            isActive: true,
            severity: "high",
            compliance: 1,
          },
          {
            id: "1.1.3",
            description:
              "Current diagram that shows all cardholder data flows across systems and networks",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "1.1.4",
            description:
              "Requirements for a firewall at each Internet connection and between any demilitarized zone (DMZ) and the internal network zone",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "1.1.5",
            description:
              "Description of groups, roles, and responsibilities for management of network components",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "1.1.6",
            description:
              "Documentation of business justification and approval for use of all services, protocols, and ports allowed, including documentation of security features implemented for those protocols considered to be insecure.",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "1.1.7",
            description:
              "Requirement to review firewall and router rule sets at least every six months",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "1.2",
        description:
          "Build firewall and router configurations that restrict connections between untrusted networks and any system components in the cardholder data environment",
        isActive: true,
        severity: "medium",
        nestedControls: [
          {
            id: "1.2.1",
            description:
              "Restrict inbound and outbound traffic to that which is necessary for the cardholder data environment, and specifically deny all other traffic.",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "1.2.2",
            description: "Secure and synchronize router configuration files.",
            isActive: true,
            severity: "low",
            compliance: 0.2,
          },
          {
            id: "1.2.3",
            description:
              "Install perimeter firewalls between all wireless networks and the cardholder data environment, and configure these firewalls to deny or, if traffic is necessary for business purposes, permit only authorized traffic between the wireless environment and the cardholder data environment.",
            isActive: true,
            severity: "high",
            compliance: 1,
          },
        ],
      },
      {
        id: "1.3",
        description:
          "Prohibit direct public access between the Internet and any system component in the cardholder data environment.",
        isActive: true,
        severity: "low",
        nestedControls: [
          {
            id: "1.3.1",
            description:
              "Implement a DMZ to limit inbound traffic to only system components that provide authorized publicly accessible services, protocols, and ports.",
            isActive: true,
            severity: "low",
            compliance: 0.9,
          },
          {
            id: "1.3.2",
            description:
              "Limit inbound Internet traffic to IP addresses within the DMZ.",
            isActive: true,
            severity: "medium",
            compliance: 0.4,
          },
          {
            id: "1.3.3",
            description:
              "Implement anti-spoofing measures to detect and block forged source IP addresses from entering the network.",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "1.3.4",
            description:
              "Do not allow unauthorized outbound traffic from the cardholder data environment to the Internet.",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "1.3.5",
            description:
              "Permit only “established” connections into the network.",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "1.3.6",
            description:
              "Place system components that store cardholder data (such as a database) in an internal network zone, segregated from the DMZ and other untrusted networks.",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "1.3.7",
            description:
              "Do not disclose private IP addresses and routing information to unauthorized parties",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "1.4",
        description:
          "Install personal firewall software or equivalent functionality on any portable computing devices (including company and/or employee-owned) that connect to the Internet when outside the network (for example, laptops used by employees), and which are also used to access the CDE. Firewall (or equivalent) configurations include: • Specific configuration settings are defined. • Personal firewall (or equivalent functionality) is actively running. • Personal firewall (or equivalent functionality) is not alterable by users of the portable computing devices.",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "1.5",
        description:
          "Ensure that security policies and operational procedures for managing firewalls are documented, in use, and known to all affected parties.",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
    ],
  },
  {
    id: "2",
    description:
      "Do not use vendor-supplied defaults for system passwords and other security parameters",
    isActive: true,
    severity: "low",
    nestedControls: [
      {
        id: "2.1",
        description:
          "Always change vendor-supplied defaults and remove or disable unnecessary default accounts before installing a system on the network. This applies to ALL default passwords, including but not limited to those used by operating systems, software that provides security services, application and system accounts, point-of-sale(POS) terminals, payment applications, Simple Network Management Protocol (SNMP) community strings, etc.).",
        isActive: true,
        severity: "medium",
        nestedControls: [
          {
            id: "2.1.1",
            description:
              "For wireless environments connected to the cardholder data environment or transmitting cardholder data, change ALL wireless vendor defaults at installation, including but not limited to default wireless encryption keys, passwords, and SNMP community strings. ",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "2.2",
        description:
          "Develop configuration standards for all system components. Assure that these standards address all known security vulnerabilities and are consistent with industry-accepted system hardening standards. Sources of industry-accepted system hardening standards may include, but are not limited to: • Center for Internet Security (CIS) • International Organization for Standardization (ISO) • SysAdmin Audit Network Security (SANS) Institute • National Institute of Standards Technology (NIST).",
        isActive: true,
        severity: "low",
        nestedControls: [
          {
            id: "2.2.1",
            description:
              "Implement only one primary function per server to prevent functions that require different security levels from co-existing on the same server. (For example, web servers, database servers, and DNS should be implemented on separate servers.)",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "2.2.2",
            description:
              "Enable only necessary services, protocols, daemons, etc., as required for the function of the system. ",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "2.2.3",
            description:
              "Implement additional security features for any required services, protocols, or daemons that are considered to be insecure.",
            isActive: true,
            severity: "medium",
            compliance: 0.6,
          },
          {
            id: "2.2.4",
            description:
              "Configure system security parameters to prevent misuse.",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "2.2.5",
            description:
              "Remove all unnecessary functionality, such as scripts, drivers, features, subsystems, file systems, and unnecessary web servers.",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "2.3",
        description:
          "Encrypt all non-console administrative access using strong cryptography. ",
        isActive: true,
        severity: "low",
        compliance: 1,
      },
      {
        id: "2.4",
        description:
          "Maintain an inventory of system components that are in scope for PCI DSS.",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "2.5",
        description:
          "Ensure that security policies and operational procedures for managing vendor defaults and other security parameters are documented, in use, and known to all affected parties.",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "2.6",
        description:
          "Shared hosting providers must protect each entity’s hosted environment and cardholder data. These providers must meet specific requirements as detailed in Appendix A1: Additional PCI DSS Requirements for Shared Hosting Providers.",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
    ],
  },
  {
    id: "3",
    description: "Protect stored cardholder data",
    isActive: true,
    severity: "medium",
    nestedControls: [
      {
        id: "3.1",
        description:
          "Keep cardholder data storage to a minimum by implementing data retention and disposal policies, procedures and processes that include at least the following for all cardholder data (CHD) storage: • Limiting data storage amount and retention time to that which is required for legal, regulatory, and/or business requirements • Specific retention requirements for cardholder data • Processes for secure deletion of data when no longer needed • A quarterly process for identifying and securely deleting stored cardholder data that exceeds defined retention.",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "3.2",
        description:
          "Do not store sensitive authentication data after authorization (even if encrypted). If sensitive authentication data is received, render all data unrecoverable upon completion of the authorization process.",
        isActive: true,
        severity: "low",
        nestedControls: [
          {
            id: "3.2.1",
            description:
              "Do not store the full contents of any track (from the magnetic stripe located on the back of a card, equivalent data contained on a chip, or elsewhere) after authorization. This data is alternatively called full track, track, track 1, track 2, and magnetic-stripe data.",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "3.2.2",
            description:
              "Do not store the card verification code or value (three-digit or four-digit number printed on the front or back of a payment card used to verify card-not\u0002present transactions) after authorization.",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "3.2.3",
            description:
              "Do not store the personal identification number (PIN) or the encrypted PIN block after authorization.",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "3.3",
        description:
          "Mask PAN when displayed (the first six and last four digits are the maximum number of digits to be displayed), such that only personnel with a legitimate business need can see more than the first six/last four digits of the PAN.",
        isActive: true,
        severity: "low",
        compliance: 1,
      },
      {
        id: "3.4",
        description:
          "Render PAN unreadable anywhere it is stored (including on portable digital media, backup media, and in logs) by using any of the following approaches: • One-way hashes based on strong cryptography, (hash must be of the entire PAN) • Truncation (hashing cannot be used to replace the truncated segment of PAN) • Index tokens and pads (pads must be securely stored) • Strong cryptography with associated key-management processes and procedures.",
        isActive: true,
        severity: "medium",
        nestedControls: [
          {
            id: "3.4.1",
            description:
              "If disk encryption is used (rather than file- or column-level database encryption), logical access must be managed separately and independently of native operating system authentication and access control mechanisms (for example, by not using local user account databases or general network login credentials). Decryption keys must not be associated with user accounts. ",
            isActive: true,
            severity: "high",
            compliance: 1,
          },
        ],
      },
      {
        id: "3.5",
        description:
          "Document and implement procedures to protect keys used to secure stored cardholder data against disclosure and misuse:",
        isActive: true,
        severity: "low",
        nestedControls: [
          {
            id: "3.5.1",
            description:
              "Additional requirement for service providers only: Maintain a documented description of the cryptographic architecture that includes: • Details of all algorithms, protocols, and keys used for the protection of cardholder data, including key strength and expiry date • Description of the key usage for each key • Inventory of any HSMs and other SCDs used for key management ",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "3.5.2",
            description:
              "Restrict access to cryptographic keys to the fewest number of custodians necessary",
            isActive: true,
            severity: "medium",
            compliance: 0.9,
          },
          {
            id: "3.5.3",
            description:
              "Store secret and private keys used to encrypt/decrypt cardholder data in one (or more) of the following forms at all times: • Encrypted with a key-encrypting key that is at least as strong as the data\u0002encrypting key, and that is stored separately from the data-encrypting key • Within a secure cryptographic device (such as a hardware (host) security module (HSM) or PTS-approved point-of-interaction device) • As at least two full-length key components or key shares, in accordance with an industry\u0002accepted method ",
            isActive: true,
            severity: "medium",
            compliance: 0.6,
          },
          {
            id: "3.5.4",
            description:
              "Store cryptographic keys in the fewest possible locations.",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "3.6",
        description:
          "Fully document and implement all key\u0002management processes and procedures for cryptographic keys used for encryption of cardholder data, including the following:",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "3.7",
        description:
          "Ensure that security policies and operational procedures for protecting stored cardholder data are documented, in use, and known to all affected parties.",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
    ],
  },
  {
    id: "4",
    description:
      "Encrypt transmission of cardholder data across open, public networks",
    isActive: true,
    severity: "medium",
    nestedControls: [
      {
        id: "4.1",
        description:
          "Use strong cryptography and security protocols to safeguard sensitive cardholder data during transmission over open, public networks, including the following: • Only trusted keys and certificates are accepted. • The protocol in use only supports secure versions or configurations. • The encryption strength is appropriate for the encryption methodology in use.",
        isActive: true,
        severity: "medium",
        nestedControls: [
          {
            id: "4.1.1",
            description:
              "Ensure wireless networks transmitting cardholder data or connected to the cardholder data environment, use industry best practices to implement strong encryption for authentication and transmission.",
            isActive: true,
            severity: "high",
            compliance: 1,
          },
        ],
      },
      {
        id: "4.2",
        description:
          "Never send unprotected PANs by end user messaging technologies (for example, email, instant messaging, SMS, chat, etc.).",
        isActive: true,
        severity: "low",
        compliance: 0.1,
      },
      {
        id: "4.3",
        description:
          "Ensure that security policies and operational procedures for encrypting transmissions of cardholder data are documented, in use, and known to all affected parties.",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
    ],
  },
  {
    id: "5",
    description:
      "Protect all systems against malware and regularly update anti-virus software or programs",
    isActive: true,
    severity: "low",
    nestedControls: [
      {
        id: "5.1",
        description:
          "Deploy anti-virus software on all systems commonly affected by malicious software (particularly personal computers and servers).",
        isActive: true,
        severity: "medium",
        compliance: 0.1,
      },
      {
        id: "5.2",
        description:
          "Ensure that all anti-virus mechanisms are maintained as follows: • Are kept current, • Perform periodic scans • Generate audit logs which are retained per PCI DSS Requirement 10.7.",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "5.3",
        description:
          "Ensure that anti-virus mechanisms are actively running and cannot be disabled or altered by users, unless specifically authorized by management on a case-by-case basis for a limited time period.",
        isActive: true,
        severity: "high",
        compliance: 1,
      },
      {
        id: "5.4",
        description:
          "Ensure that security policies and operational procedures for protecting systems against malware are documented, in use, and known to all affected parties.",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
    ],
  },
  {
    id: "6",
    description: "Develop and maintain secure systems and applications",
    isActive: true,
    severity: "medium",
    nestedControls: [
      {
        id: "6.1",
        description:
          "Establish a process to identify security vulnerabilities, using reputable outside sources for security vulnerability information, and assign a risk ranking (for example, as “high,” “medium,” or “low”) to newly discovered security vulnerabilities. ",
        isActive: true,
        severity: "high",
        compliance: 1,
      },
      {
        id: "6.2",
        description:
          "Ensure that all system components and software are protected from known vulnerabilities by installing applicable vendor-supplied security patches. Install critical security patches within one month of release.",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "6.3",
        description:
          "Develop internal and external software applications (including web-based administrative access to applications) securely, as follows: • In accordance with PCI DSS (for example, secure authentication and logging) • Based on industry standards and/or best practices. • Incorporating information security throughout the software-development life cycle ",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "6.4",
        description:
          "Follow change control processes and procedures for all changes to system components. The processes must include the following:",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "6.5",
        description:
          "Address common coding vulnerabilities in software-development processes as follows: • Train developers at least annually in up\u0002to-date secure coding techniques, including how to avoid common coding vulnerabilities. • Develop applications based on secure coding guidelines.",
        isActive: true,
        severity: "medium",
        nestedControls: [
          {
            id: "6.5.1",
            description:
              "Injection flaws, particularly SQL injection. Also consider OS Command Injection, LDAP and XPath injection flaws as well as other injection flaws.",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "6.5.2",
            description: "Buffer overflows",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "6.5.3",
            description: "Insecure cryptographic storage",
            isActive: true,
            severity: "low",
            compliance: 0.7,
          },
          {
            id: "6.5.4",
            description: "Insecure communications",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "6.5.5",
            description: "Improper error handling",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "6.5.6",
            description:
              "All “high risk” vulnerabilities identified in the vulnerability identification process (as defined in PCI DSS Requirement 6.1).",
            isActive: true,
            severity: "medium",
            compliance: 0.5,
          },
          {
            id: "6.5.7",
            description: "Cross-site scripting (XSS)",
            isActive: true,
            severity: "medium",
            compliance: 0.3,
          },
          {
            id: "6.5.8",
            description:
              "Improper access control(such as insecure direct object references, failure to restrict URL access, directory traversal, and failure to restrict user access to functions).",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "6.5.9",
            description: "Cross-site request forgery (CSRF)",
            isActive: true,
            severity: "high",
            compliance: 1,
          },
          {
            id: "6.5.10",
            description: "Broken authentication and session management.",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "6.6",
        description:
          "For public-facing web applications, address new threats and vulnerabilities on an ongoing basis and ensure these applications are protected against known attacks by either of the following methods:",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "6.7",
        description:
          "Ensure that security policies and operational procedures for developing and maintaining secure systems and applications are documented, in use, and known to all affected parties.",
        isActive: true,
        severity: "low",
        compliance: 1,
      },
    ],
  },
  {
    id: "7:",
    description: "Restrict access to cardholder data by business need to know",
    isActive: true,
    severity: "low",
    nestedControls: [
      {
        id: "7.1",
        description:
          "Limit access to system components and cardholder data to only those individuals whose job requires such access.",
        isActive: true,
        severity: "medium",
        compliance: 1,
      },
      {
        id: "7.2",
        description:
          "Establish an access control system(s) for systems components that restricts access based on a user’s need to know, and is set to “deny all” unless specifically allowed. This access control system(s) must include the following:",
        isActive: true,
        severity: "high",
        compliance: 1,
      },
      {
        id: "7.3",
        description:
          "Ensure that security policies and operational procedures for restricting access to cardholder data are documented, in use, and known to all affected parties.",
        isActive: true,
        severity: "low",
        compliance: 1,
      },
    ],
  },
  {
    id: "8",
    description: "Identify and authenticate access to system components ",
    isActive: true,
    severity: "medium",
    compliance: 1,
  },
  {
    id: "9",
    description: "Restrict physical access to cardholder data",
    isActive: true,
    severity: "medium",
    compliance: 1,
  },
  {
    id: "10",
    description:
      "Track and monitor all access to network resources and cardholder data",
    isActive: true,
    severity: "medium",
    compliance: 1,
  },
  {
    id: "11",
    description: "Regularly test security systems and processes.",
    isActive: true,
    severity: "medium",
    compliance: 1,
  },
  {
    id: "12",
    description:
      "Maintain a policy that addresses information security for all personnel.",
    isActive: true,
    severity: "low",
    compliance: 1,
  },
];
