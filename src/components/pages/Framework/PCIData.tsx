import { format } from "date-fns";
import { Alert } from "../../../redux/frameworkSlice";
import { controlType, createControl } from "./AllOverviews";

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

export const PCIControls: controlType[] = [
  createControl(
    "1.1",
    "Establish and implement firewall and router configuration standards that include the following:",
    "Low",
    0,
    true
  ),
  createControl(
    "1.1.1",
    "A formal process for approving and testing all network connections and changes to the firewall and router configurations",
    "Medium",
    0,
    false
  ),
  createControl(
    "1.1.2",
    "Current network diagram that identifies all connections between the cardholder data environment and other networks, including any wireless networks",
    "Medium",
    0,
    false
  ),
  createControl(
    "1.1.3",
    "Current diagram that shows all cardholder data flows across systems and networks",
    "Low",
    0,
    false
  ),
  createControl(
    "1.1.4",
    "Requirements for a firewall at each Internet connection and between any demilitarized zone (DMZ) and the internal network zone",
    "Low",
    0,
    false
  ),
  createControl(
    "1.1.5",
    "Description of groups, roles, and responsibilities for management of network components",
    "Medium",
    0,
    false
  ),
  createControl(
    "1.1.6",
    "Documentation of business justification and approval for use of all services, protocols, and ports allowed, including documentation of security features implemented for those protocols considered to be insecure.",
    "Low",
    0,
    true
  ),
  createControl(
    "1.1.7",
    "Requirement to review firewall and router rule sets at least every six months",
    "Low",
    0,
    false
  ),
  createControl(
    "1.2",
    "Build firewall and router configurations that restrict connections between untrusted networks and any system components in the cardholder data environment.",
    "High",
    14,
    false
  ),
  createControl(
    "1.2.1",
    "Restrict inbound and outbound traffic to that which is necessary for the cardholder data environment, and specifically deny all other traffic.",
    "Medium",
    0,
    false
  ),
  createControl(
    "1.2.2",
    "Secure and synchronize router configuration files.",
    "Medium",
    0,
    false
  ),
  createControl(
    "1.2.3",
    "Install perimeter firewalls between all wireless networks and the cardholder data environment, and configure these firewalls to deny or, if traffic is necessary for business purposes, permit only authorized traffic between the wireless environment and the cardholder data environment. ",
    "Medium",
    10,
    true
  ),
  createControl(
    "1.3",
    "Prohibit direct public access between the Internet and any system component in the cardholder data environment.",
    "Medium",
    2,
    false
  ),
  createControl(
    "1.3.1",
    "Implement a DMZ to limit inbound traffic to only system components that provide authorized publicly accessible services, protocols, and ports.",
    "Low",
    0,
    false
  ),
  createControl(
    "1.3.2",
    "Limit inbound Internet traffic to IP addresses within the DMZ.",
    "Medium",
    19,
    false
  ),
  createControl(
    "1.3.3",
    "Implement anti-spoofing measures to detect and block forged source IP addresses from entering the network.",
    "Low",
    0,
    false
  ),
  createControl(
    "1.3.4",
    "Do not allow unauthorized outbound traffic from the cardholder data environment to the Internet.",
    "Medium",
    0,
    false
  ),
  createControl(
    "1.3.5",
    "Permit only “established” connections into the network.",
    "Low",
    0,
    false
  ),
  createControl(
    "1.3.6",
    "Place system components that store cardholder data (such as a database) in an internal network zone, segregated from the DMZ and other untrusted networks.",
    "Medium",
    0,
    true
  ),
  createControl(
    "1.3.7",
    "Do not disclose private IP addresses and routing information to unauthorized parties.",
    "Low",
    0,
    false
  ),
  createControl(
    "1.4",
    "Install personal firewall software or equivalent functionality on any portable computing devices (including company and/or employee-owned) that connect to the Internet when outside the network (for example, laptops used by employees), and which are also used to access the CDE.",
    "Medium",
    0,
    false
  ),
  createControl(
    "1.5",
    "Ensure that security policies and operational procedures for managing firewalls are documented, in use, and known to all affected parties",
    "High",
    0,
    false
  ),
];
