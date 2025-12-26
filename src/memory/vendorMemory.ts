import { MemoryStore } from "./memoryStore";

export class VendorMemory {
  private store: MemoryStore;

  constructor(store: MemoryStore) {
    this.store = store;
  }

  async applyVendorMemory(
    invoice: any
  ): Promise<{
    updates: any;
    reasoning: string[];
    confidenceBoost: number;
  }> {
    const updates: any = {};
    const reasoning: string[] = [];
    let confidenceBoost = 0;

    const vendorMemories = await this.store.getVendorMemory(invoice.vendor);

    for (const memory of vendorMemories) {
      if (
        invoice.rawText &&
        invoice.rawText.toLowerCase().includes(memory.pattern.toLowerCase())
      ) {
        if (memory.confidence >= 0.7) {
          updates[memory.target_field] =
            updates[memory.target_field] ?? "AUTO_FILLED";

          reasoning.push(
            `Applied vendor memory: '${memory.pattern}' → ${memory.target_field}`
          );

          confidenceBoost += 0.1;
        } else {
          reasoning.push(
            `Vendor memory found but confidence too low (${memory.confidence})`
          );
        }
      }
    }

    return { updates, reasoning, confidenceBoost };
  }
}
