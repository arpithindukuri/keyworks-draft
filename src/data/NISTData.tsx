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
    id: "ID",
    description: "IDENTIFY",
    isActive: false,
    severity: "medium",
    compliance: 0.4,
    nestedControls: [
      {
        id: "ID.AM",
        description:
          "Asset Management The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization’s risk strategy.",
        isActive: true,
        severity: "medium",
        compliance: 0.7,
        nestedControls: [
          {
            id: "ID.AM-1",
            description:
              "Physical devices and systems within the organization are inventoried",
            isActive: true,
            severity: "high",
            compliance: 0.8,
          },
          {
            id: "ID.AM-2",
            description:
              "Software platforms and applications within the organization are inventoried",
            isActive: true,
            severity: "medium",
            compliance: 0.9,
          },
          {
            id: "ID.AM-3",
            description:
              "Organizational communication and data flows are mapped",
            isActive: true,
            severity: "medium",
            compliance: 0.5,
          },
          {
            id: "ID.AM-4",
            description: "External information systems are catalogued",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "ID.AM-5",
            description:
              "Resources (e.g., hardware, devices, data, time, personnel, and software) are prioritized based on their classification, criticality, and business value ",
            isActive: false,
            severity: "medium",
            compliance: 0.1,
          },
          {
            id: "ID.AM-6",
            description:
              "Cybersecurity roles and responsibilities for the entire workforce and third-party stakeholders (e.g., suppliers, customers, partners) are established",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "ID.BE",
        description:
          "Business Environment The organization’s mission, objectives, stakeholders, and activities are understood and prioritized; this information is used to inform cybersecurity roles, responsibilities, and risk management decisions.",
        isActive: true,
        severity: "medium",
        compliance: 0.9,
        nestedControls: [
          {
            id: "ID.BE-1",
            description:
              "The organization’s role in the supply chain is identified and communicated",
            isActive: false,
            severity: "medium",
            compliance: 0.8,
          },
          {
            id: "ID.BE-2",
            description:
              "The organization’s place in critical infrastructure and its industry sector is identified and communicated",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "ID.BE-3",
            description:
              "Priorities for organizational mission, objectives, and activities are established and communicated",
            isActive: false,
            severity: "medium",
            compliance: 0.2,
          },
          {
            id: "ID.BE-4",
            description:
              "Dependencies and critical functions for delivery of critical services are established",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "ID.BE-5",
            description:
              "Resilience requirements to support delivery of critical services are established for all operating states (e.g. under duress/attack, during recovery, normal operations)",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "ID.GV",
        description:
          "Governance The policies, procedures, and processes to manage and monitor the organization’s regulatory, legal, risk, environmental, and operational requirements are understood and inform the management of cybersecurity risk.",
        isActive: false,
        severity: "low",
        compliance: 1,
        nestedControls: [
          {
            id: "ID.GV-1",
            description:
              "Organizational cybersecurity policy is established and communicated",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "ID.GV-2",
            description:
              "Cybersecurity roles and responsibilities are coordinated and aligned with internal roles and external partners",
            isActive: false,
            severity: "low",
            compliance: 0.4,
          },
          {
            id: "ID.GV-3",
            description:
              "Legal and regulatory requirements regarding cybersecurity, including privacy and civil liberties obligations, are understood and managed",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "ID.GV-4",
            description:
              "Governance and risk management processes address cybersecurity risks",
            isActive: false,
            severity: "medium",
            compliance: 0.1,
          },
        ],
      },
      {
        id: "ID.RA",
        description:
          "Risk Assessment The organization understands the cybersecurity risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals.",
        isActive: true,
        severity: "low",
        compliance: 1,
        nestedControls: [
          {
            id: "ID.RA-1",
            description: "Asset vulnerabilities are identified and documented",
            isActive: true,
            severity: "medium",
            compliance: 1,
            requiredDocuments: [
              {
                name: "Asset Vulnerabilities",
              },
            ],
          },
          {
            id: "ID.RA-2",
            description:
              "Cyber threat intelligence is received from information sharing forums and sources",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "ID.RA-3",
            description:
              "Threats, both internal and external, are identified and documented",
            isActive: false,
            severity: "low",
            compliance: 0.8,
          },
          {
            id: "ID.RA-4",
            description:
              "Potential business impacts and likelihoods are identified",
            isActive: false,
            severity: "medium",
            compliance: 0.1,
          },
          {
            id: "ID.RA-5",
            description:
              "Threats, vulnerabilities, likelihoods, and impacts are used to determine risk",
            isActive: false,
            severity: "medium",
            compliance: 0.2,
          },
          {
            id: "ID.RA-6",
            description: "Risk responses are identified and prioritized",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "ID.RM",
        description:
          "Risk Management Strategy The organization’s priorities, constraints, risk tolerances, and assumptions are established and used to support operational risk decisions.",
        isActive: false,
        severity: "medium",
        compliance: 0.7,
        nestedControls: [
          {
            id: "ID.RM-1",
            description:
              "Risk management processes are established, managed, and agreed to by organizational stakeholders",
            isActive: true,
            severity: "medium",
            compliance: 0.5,
            requiredProcesses: [
              {
                name: "Risk Management Processes",
              },
            ],
          },
          {
            id: "ID.RM-2",
            description:
              "Organizational risk tolerance is determined and clearly expressed",
            isActive: true,
            severity: "medium",
            compliance: 0.4,
          },
          {
            id: "ID.RM-3",
            description:
              "The organization’s determination of risk tolerance is informed by its role in critical infrastructure and sector specific risk analysis",
            isActive: false,
            severity: "high",
            compliance: 0.7,
          },
        ],
      },
      {
        id: "ID.SC",
        description:
          "Supply Chain Risk Management The organization’s priorities, constraints, risk tolerances, and assumptions are established and used to support risk decisions associated with managing supply chain risk. The organization has established and implemented the processes to identify, assess and manage supply chain risks.",
        isActive: true,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "ID.SC-1",
            description:
              "Cyber supply chain risk management processes are identified, established, assessed, managed, and agreed to by organizational stakeholders",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "ID.SC-2",
            description:
              "Suppliers and third party partners of information systems, components, and services are identified, prioritized, and assessed using a cyber supply chain risk assessment process ",
            isActive: false,
            severity: "medium",
            compliance: 0.3,
          },
          {
            id: "ID.SC-3",
            description:
              "Contracts with suppliers and third-party partners are used to implement appropriate measures designed to meet the objectives of an organization’s cybersecurity program and Cyber Supply Chain Risk Management Plan.",
            isActive: true,
            severity: "low",
            compliance: 0.4,
          },
          {
            id: "ID.SC-4",
            description:
              "Suppliers and third-party partners are routinely assessed using audits, test results, or other forms of evaluations to confirm they are meeting their contractual obligations.",
            isActive: true,
            severity: "low",
            compliance: 0.2,
          },
          {
            id: "ID.SC-5",
            description:
              "Response and recovery planning and testing are conducted with suppliers and third-party providers",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "PR",
    description: "PROTECT",
    isActive: false,
    severity: "low",
    compliance: 1,
    nestedControls: [
      {
        id: "PR.AC",
        description:
          "Identity Management, Authentication and Access Control Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access to authorized activities and transactions.",
        isActive: false,
        severity: "medium",
        compliance: 0.5,
        nestedControls: [
          {
            id: "PR.AC-1",
            description:
              "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.AC-2",
            description: "Physical access to assets is managed and protected",
            isActive: false,
            severity: "medium",
            compliance: 0.5,
          },
          {
            id: "PR.AC-3",
            description: "Remote access is managed",
            isActive: true,
            severity: "high",
            compliance: 0.2,
          },
          {
            id: "PR.AC-4",
            description:
              "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties",
            isActive: true,
            severity: "medium",
            compliance: 0.7,
          },
          {
            id: "PR.AC-5",
            description:
              "Network integrity is protected (e.g., network segregation, network segmentation)",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.AC-6",
            description:
              "Identities are proofed and bound to credentials and asserted in interactions",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.AC-7",
            description:
              "Users, devices, and other assets are authenticated (e.g., single-factor, multi-factor) commensurate with the risk of the transaction (e.g., individuals’ security and privacy risks and other organizational risks)",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "PR.AT",
        description:
          "Awareness and Training The organization’s personnel and partners are provided cybersecurity awareness education and are trained to perform their cybersecurity-related duties and responsibilities consistent with related policies, procedures, and agreements.",
        isActive: false,
        severity: "low",
        compliance: 1,
        nestedControls: [
          {
            id: "PR.AT-1",
            description: "All users are informed and trained ",
            isActive: true,
            severity: "medium",
            compliance: 0.7,
          },
          {
            id: "PR.AT-2",
            description:
              "Privileged users understand their roles and responsibilities ",
            isActive: false,
            severity: "medium",
            compliance: 0.2,
          },
          {
            id: "PR.AT-3",
            description:
              "Third-party stakeholders (e.g., suppliers, customers, partners) understand their roles and responsibilities ",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.AT-4",
            description:
              "Senior executives understand their roles and responsibilities ",
            isActive: true,
            severity: "high",
            compliance: 0.9,
          },
          {
            id: "PR.AT-5",
            description:
              "Physical and cybersecurity personnel understand their roles and responsibilities ",
            isActive: true,
            severity: "medium",
            compliance: 0.2,
          },
        ],
      },
      {
        id: "PR.DS",
        description:
          "Data Security Information and records (data) are managed consistent with the organization’s risk strategy to protect the confidentiality, integrity, and availability of information.",
        isActive: false,
        severity: "low",
        compliance: 1,
        nestedControls: [
          {
            id: "PR.DS-1",
            description: "Data-at-rest is protected",
            isActive: true,
            severity: "medium",
            compliance: 0.7,
          },
          {
            id: "PR.DS-2",
            description: "Data-in-transit is protected",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.DS-3",
            description:
              "Assets are formally managed throughout removal, transfers, and disposition",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.DS-4",
            description:
              "Adequate capacity to ensure availability is maintained",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.DS-5",
            description: "Protections against data leaks are implemented",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.DS-6",
            description:
              "Integrity checking mechanisms are used to verify software, firmware, and information integrity",
            isActive: false,
            severity: "medium",
            compliance: 0.4,
          },
          {
            id: "PR.DS-7",
            description:
              "The development and testing environment(s) are separate from the production environment",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.DS-8",
            description:
              "Integrity checking mechanisms are used to verify hardware integrity",
            isActive: true,
            severity: "medium",
            compliance: 0.7,
          },
        ],
      },
      {
        id: "PR.IP",
        description:
          "Information Protection Processes and Procedures (PR.IP): Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets.",
        isActive: false,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "PR.IP-1",
            description:
              "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.IP-2",
            description:
              "A System Development Life Cycle to manage systems is implemented",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.IP-3",
            description: "Configuration change control processes are in place",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.IP-4",
            description:
              "Backups of information are conducted, maintained, and tested ",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.IP-5",
            description:
              "Policy and regulations regarding the physical operating environment for organizational assets are met",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.IP-6",
            description: "Data is destroyed according to policy",
            isActive: false,
            severity: "medium",
            compliance: 0.9,
          },
          {
            id: "PR.IP-7",
            description: "Protection processes are improved",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.IP-8",
            description: "Effectiveness of protection technologies is shared ",
            isActive: false,
            severity: "medium",
            compliance: 0.7,
          },
          {
            id: "PR.IP-9",
            description:
              "Response plans (Incident Response and Business Continuity) and recovery plans (Incident Recovery and Disaster Recovery) are in place and managed",
            isActive: true,
            severity: "low",
            compliance: 0.9,
          },
          {
            id: "PR.IP-10",
            description: "Response and recovery plans are tested",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.IP-11",
            description:
              "Cybersecurity is included in human resources practices (e.g., deprovisioning, personnel screening)",
            isActive: false,
            severity: "medium",
            compliance: 0.2,
          },
          {
            id: "PR.IP-12",
            description:
              "A vulnerability management plan is developed and implemented",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "PR.MA",
        description:
          "Maintenance Maintenance and repairs of industrial control and information system components are performed consistent with policies and procedures.",
        isActive: false,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "PR.MA-1",
            description:
              "Maintenance and repair of organizational assets are performed and logged, with approved and controlled tools",
            isActive: true,
            severity: "high",
            compliance: 0.9,
          },
          {
            id: "PR.MA-2",
            description:
              "Remote maintenance of organizational assets is approved, logged, and performed in a manner that prevents unauthorized access",
            isActive: false,
            severity: "low",
            compliance: 0.9,
          },
        ],
      },
      {
        id: "PR.PT",
        description:
          "Protective Technology Technical security solutions are managed to ensure the security and resilience of systems and assets, consistent with related policies, procedures, and agreements.",
        isActive: true,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "PR.PT-1",
            description:
              "Audit/log records are determined, documented, implemented, and reviewed in accordance with policy",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.PT-2",
            description:
              "Removable media is protected and its use restricted according to policy",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.PT-3",
            description:
              "The principle of least functionality is incorporated by configuring systems to provide only essential capabilities",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.PT-4",
            description: "Communications and control networks are protected",
            isActive: false,
            severity: "medium",
            compliance: 0.4,
          },
          {
            id: "PR.PT-5",
            description:
              "Mechanisms (e.g., failsafe, load balancing, hot swap) are implemented to achieve resilience requirements in normal and adverse situations",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "DE",
    description: "DETECT",
    isActive: true,
    severity: "high",
    compliance: 1,
    nestedControls: [
      {
        id: "DE.AE",
        description:
          "Anomalies and Events Anomalous activity is detected and the potential impact of events is understood.",
        isActive: false,
        severity: "medium",
        compliance: 0.6,
        nestedControls: [
          {
            id: "DE.AE-1",
            description:
              "A baseline of network operations and expected data flows for users and systems is established and managed",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "DE.AE-2",
            description:
              "Detected events are analyzed to understand attack targets and methods",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "DE.AE-3",
            description:
              "Event data are collected and correlated from multiple sources and sensors",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "DE.AE-4",
            description: "Impact of events is determined",
            isActive: true,
            severity: "high",
            compliance: 1,
          },
          {
            id: "DE.AE-5",
            description: "Incident alert thresholds are established",
            isActive: false,
            severity: "high",
            compliance: 1,
          },
        ],
      },
      {
        id: "DE.CM",
        description:
          "Security Continuous Monitoring The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures.",
        isActive: true,
        severity: "medium",
        compliance: 0.9,
        nestedControls: [
          {
            id: "DE.CM-1",
            description:
              "The network is monitored to detect potential cybersecurity events",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "DE.CM-2",
            description:
              "The physical environment is monitored to detect potential cybersecurity events",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "DE.CM-3",
            description:
              "Personnel activity is monitored to detect potential cybersecurity events",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "DE.CM-4",
            description: "Malicious code is detected",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "DE.CM-5",
            description: "Unauthorized mobile code is detected",
            isActive: false,
            severity: "low",
            compliance: 0.4,
          },
          {
            id: "DE.CM-6",
            description:
              "External service provider activity is monitored to detect potential cybersecurity events",
            isActive: true,
            severity: "medium",
            compliance: 0.6,
          },
          {
            id: "DE.CM-7",
            description:
              "Monitoring for unauthorized personnel, connections, devices, and software is performed",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "DE.CM-8",
            description: "Vulnerability scans are performed",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "DE.DP",
        description:
          "Detection Processes Detection processes and procedures are maintained and tested to ensure awareness of anomalous events.",
        isActive: false,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "DE.DP-1",
            description:
              "Roles and responsibilities for detection are well defined to ensure accountability",
            isActive: true,
            severity: "high",
            compliance: 1,
          },
          {
            id: "DE.DP-2",
            description:
              "Detection activities comply with all applicable requirements",
            isActive: true,
            severity: "high",
            compliance: 0.5,
          },
          {
            id: "DE.DP-3",
            description: "Detection processes are tested",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "DE.DP-4",
            description: "Event detection information is communicated",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "DE.DP-5",
            description: "Identities and credentials are issued",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "RS",
    description: "RESPOND",
    isActive: true,
    severity: "medium",
    compliance: 0.2,
    nestedControls: [
      {
        id: "RS.RP",
        description:
          "Response Planning Response processes and procedures are executed and maintained, to ensure response to detected cybersecurity incidents.",
        isActive: true,
        severity: "high",
        compliance: 0.4,
        nestedControls: [
          {
            id: "RS.RP-1",
            description:
              "Response plan is executed during or after an incident",
            isActive: false,
            severity: "medium",
            compliance: 0.2,
          },
        ],
      },
      {
        id: "RS.CO",
        description:
          "Communications Response activities are coordinated with internal and external stakeholders (e.g. external support from law enforcement agencies).",
        isActive: false,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "RS.CO-1",
            description:
              "Personnel know their roles and order of operations when a response is needed",
            isActive: false,
            severity: "low",
            compliance: 0.3,
          },
          {
            id: "RS.CO-2",
            description:
              "Incidents are reported consistent with established criteria",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "RS.CO-3",
            description: "Information is shared consistent with response plans",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "RS.CO-4",
            description:
              "Coordination with stakeholders occurs consistent with response plans",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "RS.CO-5",
            description:
              "Voluntary information sharing occurs with external stakeholders to achieve broader cybersecurity situational awareness ",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "RS.AN",
        description:
          "Analysis Analysis is conducted to ensure effective response and support recovery activities.",
        isActive: false,
        severity: "medium",
        compliance: 0.8,
        nestedControls: [
          {
            id: "RS.AN-1",
            description:
              "Notifications from detection systems are investigated ",
            isActive: true,
            severity: "medium",
            compliance: 0.8,
          },
          {
            id: "RS.AN-2",
            description: "The impact of the incident is understood",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "RS.AN-3",
            description: "Forensics are performed",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "RS.AN-4",
            description:
              "Incidents are categorized consistent with response plans",
            isActive: false,
            severity: "low",
            compliance: 0.6,
          },
          {
            id: "RS.AN-5",
            description:
              "Processes are established to receive, analyze and respond to vulnerabilities disclosed to the organization from internal and external sources (e.g. internal testing, security bulletins, or security researchers)",
            isActive: true,
            severity: "medium",
            compliance: 0.8,
          },
        ],
      },
      {
        id: "RS.MI",
        description:
          "Mitigation Activities are performed to prevent expansion of an event, mitigate its effects, and resolve the incident.",
        isActive: true,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "RS.MI-1",
            description: "Incidents are contained",
            isActive: false,
            severity: "medium",
            compliance: 0.4,
          },
          {
            id: "RS.MI-2",
            description: "Incidents are mitigated",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "RS.MI-3",
            description:
              "Newly identified vulnerabilities are mitigated or documented as accepted risks",
            isActive: true,
            severity: "low",
            compliance: 0.3,
          },
        ],
      },
      {
        id: "RS.IM",
        description:
          "Improvements Organizational response activities are improved by incorporating lessons learned from current and previous detection/response activities.",
        isActive: true,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "RS.IM-1",
            description: "Response plans incorporate lessons learned",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "RS.IM-2",
            description: "Response strategies are updated",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "RC",
    description: "RECOVER",
    isActive: true,
    severity: "medium",
    compliance: 1,
    nestedControls: [
      {
        id: "RC.RP",
        description:
          "Recovery Planning Recovery processes and procedures are executed and maintained to ensure restoration of systems or assets affected by cybersecurity incidents.",
        isActive: false,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "RC.RP-1",
            description:
              "Recovery plan is executed during or after a cybersecurity incident ",
            isActive: false,
            severity: "medium",
            compliance: 0.1,
          },
          {
            id: "RC.IM",
            description:
              "Improvements Recovery planning and processes are improved by incorporating lessons learned into future activities.",
            isActive: true,
            severity: "medium",
            compliance: 1,
            nestedControls: [],
          },
          {
            id: "RC.IM-1",
            description: "Recovery plans incorporate lessons learned",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "RC.IM-2",
            description: "Recovery strategies are updated",
            isActive: true,
            severity: "low",
            compliance: 0.3,
          },
        ],
      },
      {
        id: "RC.CO",
        description:
          "Communications Restoration activities are coordinated with internal and external parties (e.g. coordinating centers, Internet Service Providers, owners of attacking systems, victims, other CSIRTs, and vendors).",
        isActive: false,
        severity: "low",
        compliance: 1,
        nestedControls: [
          {
            id: "RC.CO-1",
            description: "Public relations are managed",
            isActive: false,
            severity: "medium",
            compliance: 0.8,
          },
          {
            id: "RC.CO-2",
            description: "Reputation is repaired after an incident ",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "RC.CO-3",
            description:
              "Recovery activities are communicated to internal and external stakeholders as well as executive and management teams",
            isActive: true,
            severity: "low",
            compliance: 0.6,
          },
        ],
      },
    ],
  },
];
