import { business } from "./content";

export type ContractTemplate = {
  id: string;
  name: string;
  description: string;
};

export const contractTemplates: ContractTemplate[] = [
  {
    id: "standard-order",
    name: "Standard Cookie Order Agreement",
    description: "General terms for custom decorated sugar cookie orders",
  },
  {
    id: "event-deposit",
    name: "Event Order with Deposit",
    description: "Larger events with deposit and balance schedule",
  },
];

function wrapBody(inner: string): string {
  return `<div class="contract-prose">${inner}</div>`;
}

export function buildContractBody(
  templateId: string,
  fields: {
    clientName: string;
    clientEmail: string;
    eventName: string;
    eventDate: string;
    totalAmount: string;
  },
): string {
  const dateFormatted = fields.eventDate
    ? new Date(fields.eventDate + "T12:00:00").toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "TBD";

  const common = `
    <p><strong>Provider:</strong> ${business.name}</p>
    <p><strong>Client:</strong> ${fields.clientName} (${fields.clientEmail})</p>
    <p><strong>Event / Order:</strong> ${fields.eventName}</p>
    <p><strong>Event Date:</strong> ${dateFormatted}</p>
    <p><strong>Agreed Amount:</strong> ${fields.totalAmount}</p>
  `;

  if (templateId === "event-deposit") {
    return wrapBody(`
      <h2>Event Cookie Order Agreement (with Deposit)</h2>
      ${common}
      <h3>1. Services</h3>
      <p>Provider agrees to prepare hand-decorated custom sugar cookies as discussed and approved in writing (email or order form). Designs are subject to final approval by Provider.</p>
      <h3>2. Deposit & Payment</h3>
      <p>A non-refundable deposit of 50% of the agreed amount is due upon signing. The remaining balance is due 7 days before the event date. Orders are not confirmed until the deposit is received.</p>
      <h3>3. Lead Time & Changes</h3>
      <p>Client agrees to submit final design details at least 14 days before the event. Changes requested after approval may incur additional fees and are subject to availability.</p>
      <h3>4. Cancellation</h3>
      <p>Cancellations more than 21 days before the event: deposit may be applied to a future order within 6 months. Cancellations within 21 days: deposit is forfeited.</p>
      <h3>5. Food Allergies</h3>
      <p>Cookies contain wheat, eggs, and dairy unless otherwise agreed in writing. Client is responsible for communicating guest allergies; Provider is not liable for undisclosed allergens.</p>
      <h3>6. Electronic Signature</h3>
      <p>By signing electronically below, Client agrees this agreement is binding and that the electronic record may be retained as proof of acceptance.</p>
    `);
  }

  return wrapBody(`
    <h2>Custom Sugar Cookie Order Agreement</h2>
    ${common}
    <h3>1. Order Details</h3>
    <p>Provider will prepare custom decorated sugar cookies according to the design and quantity agreed upon between the parties. Final designs must be approved by Provider.</p>
    <h3>2. Payment</h3>
    <p>Full payment (or agreed deposit) is due as specified in the order confirmation. Production begins after payment is received unless otherwise agreed.</p>
    <h3>3. Pickup / Delivery</h3>
    <p>Client is responsible for pickup at the agreed time unless delivery was arranged in advance for an additional fee. Provider is not responsible for damage after pickup.</p>
    <h3>4. Satisfaction & Quality</h3>
    <p>Provider guarantees professionally decorated cookies. Minor color variation is normal in hand-decorated work. Concerns must be reported within 24 hours of pickup.</p>
    <h3>5. Electronic Signature</h3>
    <p>By signing electronically below, Client agrees to these terms and authorizes ${business.name} to proceed with the order as described.</p>
  `);
}
