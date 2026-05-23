import { createHash, randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export type IntakeSubmission = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  guestCount: string;
  cookieCount: string;
  designNotes: string;
  flavors: string;
  budget: string;
  referral: string;
};

export async function saveIntakeSubmission(
  data: Omit<IntakeSubmission, "id" | "createdAt">,
): Promise<IntakeSubmission> {
  const submissions = await readJsonFile<IntakeSubmission[]>(
    "intake-submissions.json",
    [],
  );
  const submission: IntakeSubmission = {
    ...data,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  submissions.push(submission);
  await writeJsonFile("intake-submissions.json", submissions);
  return submission;
}

export type ContractStatus = "draft" | "sent" | "signed";

export type ContractRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: ContractStatus;
  clientName: string;
  clientEmail: string;
  eventName: string;
  eventDate: string;
  totalAmount: string;
  templateId: string;
  bodyHtml: string;
  signToken: string;
  signedAt?: string;
  signerName?: string;
  signerEmail?: string;
  signatureDataUrl?: string;
  documentHash?: string;
  consentAccepted?: boolean;
};

export async function listContracts(): Promise<ContractRecord[]> {
  const contracts = await readJsonFile<ContractRecord[]>("contracts.json", []);
  return contracts.sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function getContractById(id: string): Promise<ContractRecord | null> {
  const contracts = await listContracts();
  return contracts.find((c) => c.id === id) ?? null;
}

export async function getContractByToken(
  token: string,
): Promise<ContractRecord | null> {
  const contracts = await listContracts();
  return contracts.find((c) => c.signToken === token) ?? null;
}

export async function saveContract(
  data: Omit<
    ContractRecord,
    "id" | "createdAt" | "updatedAt" | "signToken" | "status"
  >,
): Promise<ContractRecord> {
  const contracts = await listContracts();
  const now = new Date().toISOString();
  const contract: ContractRecord = {
    ...data,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    status: "sent",
    signToken: randomUUID().replace(/-/g, "").slice(0, 24),
  };
  contracts.push(contract);
  await writeJsonFile("contracts.json", contracts);
  return contract;
}

export async function updateContract(
  id: string,
  patch: Partial<ContractRecord>,
): Promise<ContractRecord | null> {
  const contracts = await listContracts();
  const index = contracts.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const updated: ContractRecord = {
    ...contracts[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  contracts[index] = updated;
  await writeJsonFile("contracts.json", contracts);
  return updated;
}

export function computeDocumentHash(payload: string): string {
  return createHash("sha256").update(payload).digest("hex");
}
