import { logAudit } from "../utils/audit";
import { recallMemory } from "./recall";
import { applyMemory } from "./apply";
import { decideAction } from "./decide";
import { learnFromOutcome } from "./learn";

export interface AgentResult {
  normalizedInvoice: any;
  proposedCorrections: any[];
  requiresHumanReview: boolean;
  reasoning: string;
  confidenceScore: number;

  // REQUIRED FOR ASSIGNMENT
  auditTrail: any[];
  memoryUpdates: string[];
}

export async function runAgent(invoice: any): Promise<AgentResult> {
  // 1️⃣ Recall
  const memories = await recallMemory(invoice);

  // 2️⃣ Apply
  const suggestions = applyMemory(invoice, memories);

  // 3️⃣ Decide
  const decision = decideAction(invoice, suggestions);

  // 4️⃣ Learn
  await learnFromOutcome(invoice, decision);

  return {
  normalizedInvoice: decision.normalizedInvoice,
  proposedCorrections: suggestions,
  requiresHumanReview: decision.requiresHumanReview,
  reasoning: decision.reasoning,
  confidenceScore: decision.confidenceScore,

  // REQUIRED FOR ASSIGNMENT
  auditTrail: memories.auditTrail,
  memoryUpdates: [
    decision.requiresHumanReview
      ? "Escalated for human review"
      : "Learned from automated decision"
  ]
  }
};