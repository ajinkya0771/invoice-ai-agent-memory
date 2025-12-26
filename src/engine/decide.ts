export function decideAction(invoice: any, suggestions: any[]) {
  let confidenceScore = 0.5;
  let requiresHumanReview = false;

  if (suggestions.length > 0) {
    confidenceScore += 0.2;
  }

  if (confidenceScore < 0.7) {
    requiresHumanReview = true;
  }

  return {
    normalizedInvoice: {
      ...invoice,
      serviceDate: suggestions[0]?.suggestedValue ?? invoice.serviceDate
    },
    requiresHumanReview,
    reasoning: requiresHumanReview
      ? "Low confidence, human review required"
      : "Auto-corrected using learned memory",
    confidenceScore
  };
}
