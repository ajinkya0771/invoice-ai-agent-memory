# Invoice AI Agent with Memory

This project implements a memory-based AI agent for invoice processing, built as part of an internship assignment.

The agent follows a structured cognitive loop:
**Recall → Apply → Decide → Learn**

## 🧠 Key Features
- Vendor memory, correction memory, and resolution memory using SQLite
- Confidence-based decision making
- Human-in-the-loop escalation
- Persistent learning across runs
- Full audit trail for transparency

## 🗂 Project Structure
- `src/engine` – Core agent logic
- `src/memory` – SQLite-backed memory modules
- `src/demo` – Demo runner
- `database` – Persistent memory database
- `screenshots` – Proof of build & runtime execution

## ▶️ How to Run
```bash
npm install
npm run demo

## 📌 Assignment Status
This project fully satisfies all requirements specified in the internship assignment,
including memory persistence, decision confidence handling, auditability, and runtime demonstration.
