import { format } from "date-fns";
import { Alert, Control } from "../redux/frameworkSlice";

export const ISOAlerts: Alert[] = [
  // {
  //   title: "Control 13.1.3",
  //   child: (
  //     <>
  //       <strong>High Risk Alert:</strong> An unauthorized device has connected
  //       to, or has attempted to connect to, the segregated OT ICS network in
  //       violation of ISO27001 Control 13.1.3
  //     </>
  //   ),
  //   severity: "error",
  //   timestamp: format(new Date(), "T"),
  // },
  // {
  //   title: "Control A.10.1.2",
  //   child: (
  //     <>
  //       <strong>No Risk:</strong> All cryptographic keys are fully stored and
  //       backed up. ISO27001 Control A.10.1.2 is no longer in violation.
  //     </>
  //   ),
  //   severity: "success",
  //   timestamp: format(new Date(), "T"),
  // },
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
  // {
  //   title: "Control A.14.1.2",
  //   child: (
  //     <>
  //       <strong>No Risk:</strong> All systems connected to public networks are
  //       now appropriately secured. ISO27001 Control A.14.1.2 is no longer in
  //       violation.
  //     </>
  //   ),
  //   severity: "success",
  //   timestamp: format(new Date(), "T"),
  // },
  // {
  //   title: "Control A.11.1.1",
  //   child: (
  //     <>
  //       <strong>No Risk:</strong> All sensitive areas are now appropriately
  //       secured. ISO27001 Control A.11.1.1 is no longer in violation.
  //     </>
  //   ),
  //   severity: "success",
  //   timestamp: format(new Date(), "T"),
  // },
  {
    title: "Control A.14.2.3",
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
    id: "4.1",
    isActive: true,
    description: "Understanding the organization and its context",
    severity: "low",
    compliance: 1,
  },
  {
    id: "4.2",
    isActive: true,
    description:
      "Understanding the needs and expectations of interested parties",
    severity: "low",
    compliance: 1,
  },
  {
    id: "4.3",
    isActive: true,
    description:
      "Determining the scope of the information security management system",
    severity: "low",
    compliance: 1,
  },
  {
    id: "4.4",
    isActive: true,
    description: "Information security management system",
    severity: "low",
    compliance: 1,
  },
  {
    id: "5.1",
    isActive: true,
    description: "Leadership and commitment",
    severity: "low",
    compliance: 1,
  },
  {
    id: "5.2",
    isActive: true,
    description: "Information Security Policy",
    severity: "low",
    compliance: 1,
  },
  {
    id: "5.3",
    isActive: true,
    description: "Organizational roles responsibilities and authorities",
    severity: "low",
    compliance: 1,
  },
  {
    id: "6.1",
    isActive: true,
    description: "Actions to address risks and opportunities",
    severity: "low",
    compliance: 1,
  },
  {
    id: "6.2",
    isActive: true,
    description: "Information security objectives and planning to achieve them",
    severity: "low",
    compliance: 1,
  },
  {
    id: "7.1",
    isActive: true,
    description: "Resources",
    severity: "low",
    compliance: 1,
  },
  {
    id: "7.2",
    isActive: true,
    description: "Competence",
    severity: "low",
    compliance: 1,
  },
  {
    id: "7.3",
    isActive: true,
    description: "Awareness",
    severity: "low",
    compliance: 1,
  },
  {
    id: "7.4",
    isActive: true,
    description: "Communication",
    severity: "low",
    compliance: 1,
  },
  {
    id: "7.5",
    isActive: true,
    description: "Documented information",
    severity: "low",
    compliance: 1,
  },
  {
    id: "8.1",
    isActive: true,
    description: "Operational planning and control",
    severity: "low",
    compliance: 1,
  },
  {
    id: "8.2",
    isActive: true,
    description: "Information security risk assessment",
    severity: "low",
    compliance: 1,
  },
  {
    id: "8.3",
    isActive: true,
    description: "Information security risk treatment",
    severity: "low",
    compliance: 1,
  },
  {
    id: "9.1",
    isActive: true,
    description: "Monitoring measurement analysis and evaluation",
    severity: "low",
    compliance: 1,
  },
  {
    id: "9.2",
    isActive: true,
    description: "Internal audit",
    severity: "low",
    compliance: 1,
  },
  {
    id: "9.3",
    isActive: true,
    description: "Management review",
    severity: "low",
    compliance: 1,
  },
  {
    id: "10.1",
    isActive: true,
    description: "Nonconformity and corrective action",
    severity: "low",
    compliance: 1,
  },
  {
    id: "10.2",
    isActive: true,
    description: "Continual improvement",
    severity: "low",
    compliance: 1,
  },
  {
    id: "A.5",
    isActive: true,
    description: "Information security policies",
    severity: "low",
    nestedControls: [
      {
        id: "A.5.1",
        isActive: true,
        description: "Management direction of information security",
        severity: "low",
        nestedControls: [
          {
            id: "A.5.1.1",
            isActive: true,
            description: "Policies for Information Security",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.5.1.2",
            isActive: true,
            description: "Review of the policies for information security",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "A.6",
    isActive: true,
    description: "Organization of information security",
    severity: "low",
    nestedControls: [
      {
        id: "A.6.1",
        isActive: true,
        description: "Internal organization",
        severity: "low",
        nestedControls: [
          {
            id: "A.6.1.1",
            isActive: true,
            description: "Policies for Information Security",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.6.1.2",
            isActive: true,
            description: "Review of the policies for information security",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.6.1.3",
            isActive: true,
            description: "Policies for Information Security",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.6.1.4",
            isActive: true,
            description: "Review of the policies for information security",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.6.2",
        isActive: true,
        description: "Mobile devices and teleworking",
        severity: "low",
        nestedControls: [
          {
            id: "A.6.2.1",
            isActive: true,
            description: "Mobile device policy",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.6.2.2",
            isActive: true,
            description: "Teleworking",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "A.7",
    isActive: true,
    description: "Human resource security",
    severity: "low",
    nestedControls: [
      {
        id: "A.7.1",
        isActive: true,
        description: "Prior to Employment",
        severity: "medium",
        nestedControls: [
          {
            id: "A.7.1.1",
            isActive: true,
            description: "Prior to employment",
            severity: "high",
            compliance: 0.1,
          },
          {
            id: "A.7.1.2",
            isActive: true,
            description: "Terms and conditions of employment",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.7.2",
        isActive: true,
        description: "During employment",
        severity: "low",
        nestedControls: [
          {
            id: "A.7.2.1",
            isActive: true,
            description: "Management responsibilities",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.7.2.2",
            isActive: true,
            description:
              "Information security awareness education and training",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.7.2.3",
            isActive: true,
            description: "Disciplinary process",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.7.3",
        isActive: true,
        description: "Termination and change of employment",
        severity: "low",
        nestedControls: [
          {
            id: "A.7.3.1",
            isActive: true,
            description: "Termination or change of employment responsibilities",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "A.8",
    isActive: true,
    description: "Asset management",
    severity: "low",
    nestedControls: [
      {
        id: "A.8.1",
        isActive: true,
        description: "Responsibility for assets",
        severity: "low",
        nestedControls: [
          {
            id: "A.8.1.1",
            isActive: true,
            description: "Inventory of assets",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.8.1.2",
            isActive: true,
            description: "Ownership of assets",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.8.1.3",
            isActive: true,
            description: "Acceptable use of assets",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.8.1.4",
            isActive: true,
            description: "Return of assets",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.8.2",
        isActive: true,
        description: "Information classification",
        severity: "low",
        nestedControls: [
          {
            id: "A.8.2.1",
            isActive: true,
            description: "Classification of information",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.8.2.2",
            isActive: true,
            description: "Labeling of information",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.8.2.3",
            isActive: true,
            description: "Handling of assets",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.8.3",
        isActive: true,
        description: "Media handling",
        severity: "low",
        nestedControls: [
          {
            id: "A.8.3.1",
            isActive: true,
            description: "Management of removable media",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.8.3.2",
            isActive: true,
            description: "Disposal of media",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.8.3.3",
            isActive: true,
            description: "Physical media transfer",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "A.9",
    isActive: true,
    description: "Access control",
    severity: "low",
    nestedControls: [
      {
        id: "A.9.1",
        isActive: true,
        description: "Business requirements of access control",
        severity: "low",
        nestedControls: [
          {
            id: "A.9.1.1",
            isActive: true,
            description: "Access control policy",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.9.1.2",
            isActive: true,
            description: "Access of networks and network services",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.9.2",
        isActive: true,
        description: "User access management",
        severity: "low",
        nestedControls: [
          {
            id: "A.9.2.1",
            isActive: true,
            description: "User registration and de-registration",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.9.2.2",
            isActive: true,
            description: "User access provisioning",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.9.2.3",
            isActive: true,
            description: "Management of privileged access rights",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.9.2.4",
            isActive: true,
            description:
              "Management of secret authentication information of users",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.9.2.5",
            isActive: true,
            description: "Review of user access rights",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.9.2.6",
            isActive: true,
            description: "Removal or adjustment of access rights",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.9.3",
        isActive: true,
        description: "User responsibilities",
        severity: "low",
        nestedControls: [
          {
            id: "A.9.3.1",
            isActive: true,
            description: "User responsibilities",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.9.4",
        isActive: true,
        description: "System and application access control",
        severity: "low",
        nestedControls: [
          {
            id: "A.9.4.1",
            isActive: true,
            description: "Information access restriction",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.9.4.2",
            isActive: true,
            description: "Secure log-on procedure",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.9.4.3",
            isActive: true,
            description: "Password management system",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.9.4.4",
            isActive: true,
            description: "Use of privileged utility programs",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.9.4.5",
            isActive: true,
            description: "Access control to program source code",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "A.10",
    isActive: true,
    description: "Cryptography",
    severity: "low",
    nestedControls: [
      {
        id: "A.10.1",
        isActive: true,
        description: "Cryptographic controls",
        severity: "low",
        nestedControls: [
          {
            id: "A.10.1.1",
            isActive: true,
            description: "Policy on the use of cryptographic controls",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.10.1.2",
            isActive: true,
            description: "Key Management",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "A.11",
    isActive: true,
    description: "Physical and environmental security",
    severity: "low",
    nestedControls: [
      {
        id: "A.11.1",
        isActive: true,
        description: "Secure areas",
        severity: "low",
        nestedControls: [
          {
            id: "A.11.1.1",
            isActive: true,
            description: "Physical security perimeter",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.11.1.2",
            isActive: true,
            description: "Physical entry control",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.11.1.3",
            isActive: true,
            description: "Securing offices rooms and facilities",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.11.1.4",
            isActive: true,
            description:
              "Protecting against external and environmental threats",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.11.1.5",
            isActive: true,
            description: "Working in secure areas",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.11.1.6",
            isActive: true,
            description: "Delivery and loading areas",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.11.2",
        isActive: true,
        description: "Equipment",
        severity: "low",
        nestedControls: [
          {
            id: "A.11.2.1",
            isActive: true,
            description: "Equipment siting and protection",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.11.2.2",
            isActive: true,
            description: "Supporting utilities",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.11.2.3",
            isActive: true,
            description: "Cabling security",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.11.2.4",
            isActive: true,
            description: "Equipment maintenance",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.11.2.5",
            isActive: true,
            description: "Removal of assets",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.11.2.6",
            isActive: true,
            description: "Security of equipment and assets off-premises",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.11.2.7",
            isActive: true,
            description: "Secure disposal or re-use of equipment",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.11.2.8",
            isActive: true,
            description: "Unattended user equipment",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.11.2.9",
            isActive: true,
            description: "Clear desk and clear screen policy",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "A.12",
    isActive: true,
    description: "Operations security",
    severity: "low",
    nestedControls: [
      {
        id: "A.12.1",
        isActive: true,
        description: "Operational procedures and responsibilities",
        severity: "low",
        nestedControls: [
          {
            id: "A.12.1.1",
            isActive: true,
            description: "Documented operating procedures",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.12.1.2",
            isActive: true,
            description: "Change management",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.12.1.3",
            isActive: true,
            description: "Capacity management",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.12.1.4",
            isActive: true,
            description:
              "Separation of development testing and operational environments",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.12.2",
        isActive: true,
        description: "Protection from malware",
        severity: "low",
        nestedControls: [
          {
            id: "A.12.2.1",
            isActive: true,
            description: "Controls against malware",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.12.3",
        isActive: true,
        description: "Backup",
        severity: "low",
        nestedControls: [
          {
            id: "A.12.3.1",
            isActive: true,
            description: "Information backup",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.12.4",
        isActive: true,
        description: "Logging and monitoring",
        severity: "low",
        nestedControls: [
          {
            id: "A.12.4.1",
            isActive: true,
            description: "Event logging",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.12.4.2",
            isActive: true,
            description: "Protection of log information",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.12.4.3",
            isActive: true,
            description: "Administrator and operator logs",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.12.4.4",
            isActive: true,
            description: "Clock synchronization",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.12.5",
        isActive: true,
        description: "Control of operational software",
        severity: "low",
        nestedControls: [
          {
            id: "A.12.5.1",
            isActive: true,
            description: "Installation of software on operational systems",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.12.6",
        isActive: true,
        description: "Technical vulnerability management",
        severity: "low",
        nestedControls: [
          {
            id: "A.12.6.1",
            isActive: true,
            description: "Management of systems audit controls",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.12.6.2",
            isActive: true,
            description: "Restrictions on software installation",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.12.7",
        isActive: true,
        description: "Information systems audit considerations",
        severity: "low",
        nestedControls: [
          {
            id: "A.12.7.1",
            isActive: true,
            description: "Information systems audit controls",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "A.13",
    isActive: true,
    description: "Communications security",
    severity: "low",
    nestedControls: [
      {
        id: "A.13.1",
        isActive: true,
        description: "Network Security Management",
        severity: "low",
        nestedControls: [
          {
            id: "A.13.1.1",
            isActive: true,
            description: "Network Controls",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.13.1.2",
            isActive: true,
            description: "Security of network services",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.13.1.3",
            isActive: true,
            description: "Segregation in networks",
            severity: "low",
            compliance: 0.99,
          },
        ],
      },
      {
        id: "A.13.2",
        isActive: true,
        description: "Information Transfer",
        severity: "low",
        nestedControls: [
          {
            id: "A.13.2.1",
            isActive: true,
            description: "Information transfer policies and procedures",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.13.2.2",
            isActive: true,
            description: "Agreements on information transfer",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.13.2.3",
            isActive: true,
            description: "Electronic messaging",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.13.2.4",
            isActive: true,
            description: "Confidentiality or non-disclosure agreements",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "A.14",
    isActive: true,
    description: "System acquisition development and maintenance",
    severity: "low",
    nestedControls: [
      {
        id: "A.14.1",
        isActive: true,
        description: "Security requirements of information systems",
        severity: "low",
        nestedControls: [
          {
            id: "A.14.1.1",
            isActive: true,
            description:
              "Information security requirements analysis and specification",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.14.1.2",
            isActive: true,
            description: "Securing application services on public networks",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.14.1.3",
            isActive: true,
            description: "Protecting application services transactions",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.14.2",
        isActive: true,
        description: "Security in development and support processes",
        severity: "low",
        nestedControls: [
          {
            id: "A.14.2.1",
            isActive: true,
            description: "Secure development policy",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.14.2.2",
            isActive: true,
            description: "System changes control procedures",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.14.2.3",
            isActive: true,
            description:
              "Technical review of applications after operating platform changes",
            severity: "medium",
            compliance: 0.6,
          },
          {
            id: "A.14.2.4",
            isActive: true,
            description: "Restrictions on changes to software packages",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.14.2.5",
            isActive: true,
            description: "Secure system engineering principles",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.14.2.6",
            isActive: true,
            description: "Secure development environment",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.14.2.7",
            isActive: true,
            description: "Outsourced development",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.14.2.8",
            isActive: true,
            description: "System security testing",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.14.2.9",
            isActive: true,
            description: "System acceptance testing",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.14.3",
        isActive: true,
        description: "Test data",
        severity: "low",
        nestedControls: [
          {
            id: "A.14.3.1",
            isActive: true,
            description: "Protection of test data",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "A.15",
    isActive: true,
    description: "Supplier relationships",
    severity: "low",
    nestedControls: [
      {
        id: "A.15.1",
        isActive: true,
        description: "Information security policy for supplier relationships",
        severity: "low",
        nestedControls: [
          {
            id: "A.15.1.1",
            isActive: true,
            description:
              "Information security policy for supplier relationships",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.15.1.2",
            isActive: true,
            description: "Addressing security within supplier agreements",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.15.1.3",
            isActive: true,
            description:
              "Information and communications technology supply chain",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.15.2",
            isActive: true,
            description: "Supplier service delivery management",
            severity: "low",
            compliance: 1,
            nestedControls: [],
          },
          {
            id: "A.15.2.1",
            isActive: true,
            description: "Monitoring and review of supplier services",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.15.2.2",
            isActive: true,
            description: "Managing changes to supplier services",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "A.16",
    isActive: true,
    description: "Information security incident management",
    severity: "low",
    nestedControls: [
      {
        id: "A.16.1",
        isActive: true,
        description:
          "Management of information security incidents and improvements",
        severity: "low",
        nestedControls: [
          {
            id: "A.16.1.1",
            isActive: true,
            description: "Responsibilities and procedures",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.16.1.2",
            isActive: true,
            description: "Reporting information security events",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.16.1.3",
            isActive: true,
            description: "Reporting information security weaknesses",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.16.1.4",
            isActive: true,
            description:
              "Assessment of and decision on information security events",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.16.1.5",
            isActive: true,
            description: "Response to information security incidents",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.16.1.6",
            isActive: true,
            description: "Learning from information security incidents",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.16.1.7",
            isActive: true,
            description: "Collection of evidence",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "A.17",
    isActive: true,
    description:
      "Information security aspects of business continuity management",
    severity: "low",
    nestedControls: [
      {
        id: "A.17.1",
        isActive: true,
        description: "Information security continuity",
        severity: "low",
        nestedControls: [
          {
            id: "A.17.1.1",
            isActive: true,
            description: "Planning information security continuity",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.17.1.2",
            isActive: true,
            description: "Implementing information security continuity",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.17.1.3",
            isActive: true,
            description:
              "Verify review and evaluate information security continuity",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.17.2",
        isActive: true,
        description: "Redundancies",
        severity: "low",
        nestedControls: [
          {
            id: "A.17.2.1",
            isActive: true,
            description: "Availability of information processing facilities",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
  {
    id: "A.18",
    isActive: true,
    description: "Compliance",
    severity: "low",
    nestedControls: [
      {
        id: "A.18.1",
        isActive: true,
        description: "Compliance with legal and contractual requirements",
        severity: "low",
        nestedControls: [
          {
            id: "A.18.1.1",
            isActive: true,
            description:
              "Identification of applicable legislation and contractual requirements",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.18.1.2",
            isActive: true,
            description: "Intellectual property rights",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.18.1.3",
            isActive: true,
            description: "Protection of records",
            severity: "high",
            compliance: 0.1,
          },
          {
            id: "A.18.1.4",
            isActive: true,
            description:
              "Privacy and protection of personally identifiable information",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.18.1.5",
            isActive: true,
            description: "Regulation of cryptographic controls",
            severity: "low",
            compliance: 1,
          },
        ],
      },
      {
        id: "A.18.2",
        isActive: true,
        description: "Information security reviews",
        severity: "low",
        nestedControls: [
          {
            id: "A.18.2.1",
            isActive: true,
            description: "Independent review of information security",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.18.2.2",
            isActive: true,
            description: "Compliance with security policies and standards",
            severity: "low",
            compliance: 1,
          },
          {
            id: "A.18.2.3",
            isActive: true,
            description: "Technical compliance review",
            severity: "low",
            compliance: 1,
          },
        ],
      },
    ],
  },
];
