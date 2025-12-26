import { runAgent } from "../engine/agent";

const invoice1 = {
  id: "INV-001",
  vendor: "ACME Corp",
  amount: 1200
};

const invoice2 = {
  id: "INV-002",
  vendor: "ACME Corp",
  amount: 1300
};

async function runDemo() {
  console.log("---- FIRST RUN ----");
  console.log(await runAgent(invoice1));

  console.log("---- SECOND RUN ----");
  console.log(await runAgent(invoice2));
}

runDemo();
