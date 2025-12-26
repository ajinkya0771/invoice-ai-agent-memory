import { MemoryStore } from "./memoryStore";

export class ResolutionMemory {
  private store: MemoryStore;

  constructor(store?: MemoryStore) {
    this.store = store ?? new MemoryStore();
  }

  /**
   * Record the outcome of an automated decision
   */
  recordOutcome(action: string, approved: boolean): void {
    const confidenceImpact = approved ? 0.1 : -0.2;

    this.store.addResolutionMemory(
      action,
      approved ? "APPROVED" : "REJECTED",
      confidenceImpact
    );
  }
}
