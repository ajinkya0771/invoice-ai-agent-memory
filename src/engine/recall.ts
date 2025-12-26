import { MemoryStore } from "../memory/memoryStore";

const store = new MemoryStore();

export async function recallMemory(invoice: any) {
  const vendorMemory = await store.getVendorMemory(invoice.vendor);
  const correctionMemory = await store.getCorrectionMemory();

  return {
    corrections: correctionMemory,
    vendorMemory: vendorMemory,
    auditTrail: [
      "Recall started",
      `Found ${correctionMemory.length} correction memories`,
      `Vendor memory loaded for ${invoice.vendor}`
    ]
  };
}
