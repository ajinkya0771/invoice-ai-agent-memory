import { MemoryStore } from "../memory/memoryStore";

const store = new MemoryStore();

export async function learnFromOutcome(
  invoice: any,
  decision: any
) {
  if (!decision.requiresHumanReview) {
    store.addCorrectionMemory(
      "missing_service_date",
      "serviceDate missing",
      decision.normalizedInvoice.serviceDate,
      decision.confidenceScore
    );
  }
}
