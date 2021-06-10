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
        description: "Asset Management The data",
        isActive: true,
        severity: "medium",
        compliance: 0.7,
        nestedControls: [
          {
            id: "ID.AM-1",
            description: " personnel",
            isActive: true,
            severity: "high",
            compliance: 0.8,
          },
          {
            id: "ID.AM-2",
            description: " devices",
            isActive: true,
            severity: "medium",
            compliance: 0.9,
          },
          {
            id: "ID.AM-3",
            description: " systems",
            isActive: true,
            severity: "medium",
            compliance: 0.5,
          },
          {
            id: "ID.AM-4",
            description:
              " and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization’s risk strategy.",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "ID.AM-5",
            description:
              "Physical devices and systems within the organization are inventoried",
            isActive: false,
            severity: "medium",
            compliance: 0.1,
          },
          {
            id: "ID.AM-6",
            description:
              "Software platforms and applications within the organization are inventoried",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "ID.BE",
        description: "Organizational communication and data flows are mapped",
        isActive: true,
        severity: "medium",
        compliance: 0.9,
        nestedControls: [
          {
            id: "ID.BE-1",
            description: "External information systems are catalogued",
            isActive: false,
            severity: "medium",
            compliance: 0.8,
          },
          {
            id: "ID.BE-2",
            description: "Resources (e.g.",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "ID.BE-3",
            description: " hardware",
            isActive: false,
            severity: "medium",
            compliance: 0.2,
          },
          {
            id: "ID.BE-4",
            description: " devices",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "ID.BE-5",
            description: " data",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "ID.GV",
        description: " time",
        isActive: false,
        severity: "low",
        compliance: 1,
        nestedControls: [
          {
            id: "ID.GV-1",
            description: " personnel",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "ID.GV-2",
            description:
              " and software) are prioritized based on their classification",
            isActive: false,
            severity: "low",
            compliance: 0.4,
          },
          {
            id: "ID.GV-3",
            description: " criticality",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "ID.GV-4",
            description: " and business value ",
            isActive: false,
            severity: "medium",
            compliance: 0.1,
          },
        ],
      },
      {
        id: "ID.RA",
        description:
          "Cybersecurity roles and responsibilities for the entire workforce and third-party stakeholders (e.g.",
        isActive: true,
        severity: "low",
        compliance: 1,
        nestedControls: [
          {
            id: "ID.RA-1",
            description: " suppliers",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "ID.RA-2",
            description: " customers",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "ID.RA-3",
            description: " partners) are established",
            isActive: false,
            severity: "low",
            compliance: 0.8,
          },
          {
            id: "ID.RA-4",
            description: "Business Environment The organization’s mission",
            isActive: false,
            severity: "medium",
            compliance: 0.1,
          },
          {
            id: "ID.RA-5",
            description: " objectives",
            isActive: false,
            severity: "medium",
            compliance: 0.2,
          },
          {
            id: "ID.RA-6",
            description: " stakeholders",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "ID.RM",
        description:
          " and activities are understood and prioritized; this information is used to inform cybersecurity roles",
        isActive: false,
        severity: "medium",
        compliance: 0.7,
        nestedControls: [
          {
            id: "ID.RM-1",
            description: " responsibilities",
            isActive: true,
            severity: "medium",
            compliance: 0.5,
          },
          {
            id: "ID.RM-2",
            description: " and risk management decisions.",
            isActive: true,
            severity: "medium",
            compliance: 0.4,
          },
          {
            id: "ID.RM-3",
            description:
              "The organization’s role in the supply chain is identified and communicated",
            isActive: false,
            severity: "high",
            compliance: 0.7,
          },
        ],
      },
      {
        id: "ID.SC",
        description:
          "The organization’s place in critical infrastructure and its industry sector is identified and communicated",
        isActive: true,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "ID.SC-1",
            description: "Priorities for organizational mission",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "ID.SC-2",
            description: " objectives",
            isActive: false,
            severity: "medium",
            compliance: 0.3,
          },
          {
            id: "ID.SC-3",
            description: " and activities are established and communicated",
            isActive: true,
            severity: "low",
            compliance: 0.4,
          },
          {
            id: "ID.SC-4",
            description:
              "Dependencies and critical functions for delivery of critical services are established",
            isActive: true,
            severity: "low",
            compliance: 0.2,
          },
          {
            id: "ID.SC-5",
            description:
              "Resilience requirements to support delivery of critical services are established for all operating states (e.g. under duress/attack",
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
    description: " during recovery",
    isActive: false,
    severity: "low",
    compliance: 1,
    nestedControls: [
      {
        id: "PR.AC",
        description: " normal operations)",
        isActive: false,
        severity: "medium",
        compliance: 0.5,
        nestedControls: [
          {
            id: "PR.AC-1",
            description: "Governance The policies",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.AC-2",
            description: " procedures",
            isActive: false,
            severity: "medium",
            compliance: 0.5,
          },
          {
            id: "PR.AC-3",
            description:
              " and processes to manage and monitor the organization’s regulatory",
            isActive: true,
            severity: "high",
            compliance: 0.2,
          },
          {
            id: "PR.AC-4",
            description: " legal",
            isActive: true,
            severity: "medium",
            compliance: 0.7,
          },
          {
            id: "PR.AC-5",
            description: " risk",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.AC-6",
            description: " environmental",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.AC-7",
            description:
              " and operational requirements are understood and inform the management of cybersecurity risk.",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "PR.AT",
        description:
          "Organizational cybersecurity policy is established and communicated",
        isActive: false,
        severity: "low",
        compliance: 1,
        nestedControls: [
          {
            id: "PR.AT-1",
            description:
              "Cybersecurity roles and responsibilities are coordinated and aligned with internal roles and external partners",
            isActive: true,
            severity: "medium",
            compliance: 0.7,
          },
          {
            id: "PR.AT-2",
            description:
              "Legal and regulatory requirements regarding cybersecurity",
            isActive: false,
            severity: "medium",
            compliance: 0.2,
          },
          {
            id: "PR.AT-3",
            description: " including privacy and civil liberties obligations",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.AT-4",
            description: " are understood and managed",
            isActive: true,
            severity: "high",
            compliance: 0.9,
          },
          {
            id: "PR.AT-5",
            description:
              "Governance and risk management processes address cybersecurity risks",
            isActive: true,
            severity: "medium",
            compliance: 0.2,
          },
        ],
      },
      {
        id: "PR.DS",
        description:
          "Risk Assessment The organization understands the cybersecurity risk to organizational operations (including mission",
        isActive: false,
        severity: "low",
        compliance: 1,
        nestedControls: [
          {
            id: "PR.DS-1",
            description: " functions",
            isActive: true,
            severity: "medium",
            compliance: 0.7,
          },
          {
            id: "PR.DS-2",
            description: " image",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.DS-3",
            description: " or reputation)",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.DS-4",
            description: " organizational assets",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.DS-5",
            description: " and individuals.",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.DS-6",
            description: "Asset vulnerabilities are identified and documented",
            isActive: false,
            severity: "medium",
            compliance: 0.4,
          },
          {
            id: "PR.DS-7",
            description:
              "Cyber threat intelligence is received from information sharing forums and sources",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.DS-8",
            description: "Threats",
            isActive: true,
            severity: "medium",
            compliance: 0.7,
          },
        ],
      },
      {
        id: "PR.IP",
        description: " both internal and external",
        isActive: false,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "PR.IP-1",
            description: " are identified and documented",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.IP-2",
            description:
              "Potential business impacts and likelihoods are identified",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.IP-3",
            description: "Threats",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.IP-4",
            description: " vulnerabilities",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.IP-5",
            description: " likelihoods",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.IP-6",
            description: " and impacts are used to determine risk",
            isActive: false,
            severity: "medium",
            compliance: 0.9,
          },
          {
            id: "PR.IP-7",
            description: "Risk responses are identified and prioritized",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.IP-8",
            description:
              "Risk Management Strategy The organization’s priorities",
            isActive: false,
            severity: "medium",
            compliance: 0.7,
          },
          {
            id: "PR.IP-9",
            description: " constraints",
            isActive: true,
            severity: "low",
            compliance: 0.9,
          },
          {
            id: "PR.IP-10",
            description: " risk tolerances",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.IP-11",
            description:
              " and assumptions are established and used to support operational risk decisions.",
            isActive: false,
            severity: "medium",
            compliance: 0.2,
          },
          {
            id: "PR.IP-12",
            description: "Risk management processes are established",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "PR.MA",
        description: " managed",
        isActive: false,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "PR.MA-1",
            description: " and agreed to by organizational stakeholders",
            isActive: true,
            severity: "high",
            compliance: 0.9,
          },
          {
            id: "PR.MA-2",
            description:
              "Organizational risk tolerance is determined and clearly expressed",
            isActive: false,
            severity: "low",
            compliance: 0.9,
          },
        ],
      },
      {
        id: "PR.PT",
        description:
          "The organization’s determination of risk tolerance is informed by its role in critical infrastructure and sector specific risk analysis",
        isActive: true,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "PR.PT-1",
            description:
              "Supply Chain Risk Management The organization’s priorities",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.PT-2",
            description: " constraints",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "PR.PT-3",
            description: " risk tolerances",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "PR.PT-4",
            description:
              " and assumptions are established and used to support risk decisions associated with managing supply chain risk. The organization has established and implemented the processes to identify",
            isActive: false,
            severity: "medium",
            compliance: 0.4,
          },
          {
            id: "PR.PT-5",
            description: " assess and manage supply chain risks.",
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
    description: "Cyber supply chain risk management processes are identified",
    isActive: true,
    severity: "high",
    compliance: 1,
    nestedControls: [
      {
        id: "DE.AE",
        description: " established",
        isActive: false,
        severity: "medium",
        compliance: 0.6,
        nestedControls: [
          {
            id: "DE.AE-1",
            description: " assessed",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "DE.AE-2",
            description: " managed",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "DE.AE-3",
            description: " and agreed to by organizational stakeholders",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "DE.AE-4",
            description:
              "Suppliers and third party partners of information systems",
            isActive: true,
            severity: "high",
            compliance: 1,
          },
          {
            id: "DE.AE-5",
            description: " components",
            isActive: false,
            severity: "high",
            compliance: 1,
          },
        ],
      },
      {
        id: "DE.CM",
        description: " and services are identified",
        isActive: true,
        severity: "medium",
        compliance: 0.9,
        nestedControls: [
          {
            id: "DE.CM-1",
            description: " prioritized",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "DE.CM-2",
            description:
              " and assessed using a cyber supply chain risk assessment process ",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "DE.CM-3",
            description:
              "Contracts with suppliers and third-party partners are used to implement appropriate measures designed to meet the objectives of an organization’s cybersecurity program and Cyber Supply Chain Risk Management Plan.",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "DE.CM-4",
            description:
              "Suppliers and third-party partners are routinely assessed using audits",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "DE.CM-5",
            description: " test results",
            isActive: false,
            severity: "low",
            compliance: 0.4,
          },
          {
            id: "DE.CM-6",
            description:
              " or other forms of evaluations to confirm they are meeting their contractual obligations.",
            isActive: true,
            severity: "medium",
            compliance: 0.6,
          },
          {
            id: "DE.CM-7",
            description:
              "Response and recovery planning and testing are conducted with suppliers and third-party providers",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "DE.CM-8",
            description: "PROTECT",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "DE.DP",
        description: "Identity Management",
        isActive: false,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "DE.DP-1",
            description:
              " Authentication and Access Control Access to physical and logical assets and associated facilities is limited to authorized users",
            isActive: true,
            severity: "high",
            compliance: 1,
          },
          {
            id: "DE.DP-2",
            description: " processes",
            isActive: true,
            severity: "high",
            compliance: 0.5,
          },
          {
            id: "DE.DP-3",
            description: " and devices",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "DE.DP-4",
            description:
              " and is managed consistent with the assessed risk of unauthorized access to authorized activities and transactions.",
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
    description: " managed",
    isActive: true,
    severity: "medium",
    compliance: 0.2,
    nestedControls: [
      {
        id: "RS.RP",
        description: " verified",
        isActive: true,
        severity: "high",
        compliance: 0.4,
        nestedControls: [
          {
            id: "RS.RP-1",
            description: " revoked",
            isActive: false,
            severity: "medium",
            compliance: 0.2,
          },
        ],
      },
      {
        id: "RS.CO",
        description: " and audited for authorized devices",
        isActive: false,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "RS.CO-1",
            description: " users and processes",
            isActive: false,
            severity: "low",
            compliance: 0.3,
          },
          {
            id: "RS.CO-2",
            description: "Physical access to assets is managed and protected",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "RS.CO-3",
            description: "Remote access is managed",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "RS.CO-4",
            description: "Access permissions and authorizations are managed",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "RS.CO-5",
            description:
              " incorporating the principles of least privilege and separation of duties",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
        ],
      },
      {
        id: "RS.AN",
        description: "Network integrity is protected (e.g.",
        isActive: false,
        severity: "medium",
        compliance: 0.8,
        nestedControls: [
          {
            id: "RS.AN-1",
            description: " network segregation",
            isActive: true,
            severity: "medium",
            compliance: 0.8,
          },
          {
            id: "RS.AN-2",
            description: " network segmentation)",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "RS.AN-3",
            description:
              "Identities are proofed and bound to credentials and asserted in interactions",
            isActive: false,
            severity: "low",
            compliance: 1,
          },
          {
            id: "RS.AN-4",
            description: "Users",
            isActive: false,
            severity: "low",
            compliance: 0.6,
          },
          {
            id: "RS.AN-5",
            description: " devices",
            isActive: true,
            severity: "medium",
            compliance: 0.8,
          },
        ],
      },
      {
        id: "RS.MI",
        description: " and other assets are authenticated (e.g.",
        isActive: true,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "RS.MI-1",
            description: " single-factor",
            isActive: false,
            severity: "medium",
            compliance: 0.4,
          },
          {
            id: "RS.MI-2",
            description:
              " multi-factor) commensurate with the risk of the transaction (e.g.",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "RS.MI-3",
            description:
              " individuals’ security and privacy risks and other organizational risks)",
            isActive: true,
            severity: "low",
            compliance: 0.3,
          },
        ],
      },
      {
        id: "RS.IM",
        description:
          "Awareness and Training The organization’s personnel and partners are provided cybersecurity awareness education and are trained to perform their cybersecurity-related duties and responsibilities consistent with related policies",
        isActive: true,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "RS.IM-1",
            description: " procedures",
            isActive: true,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "RS.IM-2",
            description: " and agreements.",
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
    description: "All users are informed and trained ",
    isActive: true,
    severity: "medium",
    compliance: 1,
    nestedControls: [
      {
        id: "RC.RP",
        description:
          "Privileged users understand their roles and responsibilities ",
        isActive: false,
        severity: "medium",
        compliance: 1,
        nestedControls: [
          {
            id: "RC.RP-1",
            description: "Third-party stakeholders (e.g.",
            isActive: false,
            severity: "medium",
            compliance: 0.1,
          },
          {
            id: "RC.IM",
            description: " suppliers",
            isActive: true,
            severity: "medium",
            compliance: 1,
            nestedControls: [],
          },
          {
            id: "RC.IM-1",
            description: " customers",
            isActive: false,
            severity: "medium",
            compliance: 1,
          },
          {
            id: "RC.IM-2",
            description:
              " partners) understand their roles and responsibilities ",
            isActive: true,
            severity: "low",
            compliance: 0.3,
          },
        ],
      },
      {
        id: "RC.CO",
        description:
          "Senior executives understand their roles and responsibilities ",
        isActive: false,
        severity: "low",
        compliance: 1,
        nestedControls: [
          {
            id: "RC.CO-1",
            description:
              "Physical and cybersecurity personnel understand their roles and responsibilities ",
            isActive: false,
            severity: "medium",
            compliance: 0.8,
          },
          {
            id: "RC.CO-2",
            description:
              "Data Security Information and records (data) are managed consistent with the organization’s risk strategy to protect the confidentiality",
            isActive: true,
            severity: "low",
            compliance: 1,
          },
          {
            id: "RC.CO-3",
            description: " integrity",
            isActive: true,
            severity: "low",
            compliance: 0.6,
          },
        ],
      },
    ],
  },
];
