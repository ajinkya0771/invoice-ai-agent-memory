import sqlite3 from "sqlite3";
import path from "path";

export interface CorrectionRecord {
  id: number;
  issue_type: string;
  condition: string;
  resolution: string;
  confidence: number;
  reinforcement_count: number;
  last_updated: string;
}

const DB_PATH = path.join(__dirname, "../../database/memory.db");

export class MemoryStore {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(DB_PATH);
    this.initialize();
  }

  private initialize() {
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS vendor_memory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          vendor TEXT,
          pattern TEXT,
          target_field TEXT,
          confidence REAL,
          usage_count INTEGER,
          last_used TEXT
        )
      `);

      this.db.run(`
        CREATE TABLE IF NOT EXISTS correction_memory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          issue_type TEXT,
          condition TEXT,
          resolution TEXT,
          confidence REAL,
          reinforcement_count INTEGER,
          last_updated TEXT
        )
      `);

      this.db.run(`
        CREATE TABLE IF NOT EXISTS resolution_memory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          action TEXT,
          result TEXT,
          confidence_impact REAL,
          timestamp TEXT
        )
      `);

      this.db.run(`
        CREATE TABLE IF NOT EXISTS audit_trail (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          invoice_id TEXT,
          step TEXT,
          details TEXT,
          timestamp TEXT
        )
      `);
    });
  }

  // ---------- VENDOR MEMORY ----------
  addVendorMemory(
    vendor: string,
    pattern: string,
    targetField: string,
    confidence: number
  ) {
    this.db.run(
      `
      INSERT INTO vendor_memory
      (vendor, pattern, target_field, confidence, usage_count, last_used)
      VALUES (?, ?, ?, ?, 1, ?)
      `,
      [vendor, pattern, targetField, confidence, new Date().toISOString()]
    );
  }

  getVendorMemory(vendor: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    this.db.all(
      `SELECT * FROM vendor_memory WHERE vendor = ?`,
      [vendor],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

// -------- CORRECTION MEMORY READ --------
getCorrectionMemory(): Promise<CorrectionRecord[]> {
  return new Promise((resolve, reject) => {
    this.db.all(
      `SELECT * FROM correction_memory`,
      (err, rows: CorrectionRecord[]) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

// -------- CORRECTION MEMORY UPDATE --------
updateCorrectionConfidence(id: number, confidence: number) {
  this.db.run(
    `
    UPDATE correction_memory
    SET confidence = ?,
        reinforcement_count = reinforcement_count + 1,
        last_updated = ?
    WHERE id = ?
    `,
    [confidence, new Date().toISOString(), id]
  );
}
// -------- RESOLUTION MEMORY --------
addResolutionMemory(
  action: string,
  result: string,
  confidenceImpact: number
) {
  this.db.run(
    `
    INSERT INTO resolution_memory
    (action, result, confidence_impact, timestamp)
    VALUES (?, ?, ?, ?)
    `,
    [action, result, confidenceImpact, new Date().toISOString()]
  );
}
// -------- CORRECTION MEMORY INSERT --------
addCorrectionMemory(
  issueType: string,
  condition: string,
  resolution: string,
  confidence: number
) {
  this.db.run(
    `
    INSERT INTO correction_memory
    (issue_type, condition, resolution, confidence, reinforcement_count, last_updated)
    VALUES (?, ?, ?, ?, 1, ?)
    `,
    [
      issueType,
      condition,
      resolution,
      confidence,
      new Date().toISOString()
    ]
  );
}
}

