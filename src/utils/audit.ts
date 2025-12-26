export type AuditEntry = {
  step: string;
  message: string;
  timestamp: string;
};

export function logAudit(step: string, message: string): AuditEntry {
  return {
    step,
    message,
    timestamp: new Date().toISOString()
  };
}
