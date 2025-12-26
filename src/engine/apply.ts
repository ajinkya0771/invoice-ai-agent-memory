export function applyMemory(invoice: any, memories: any) {
  const suggestions = [];

  for (const correction of memories.corrections) {
    if (
      correction.issue_type === "missing_service_date" &&
      !invoice.serviceDate
    ) {
      suggestions.push({
        field: "serviceDate",
        suggestedValue: correction.resolution,
        confidence: correction.confidence
      });
    }
  }

  return suggestions;
}
