// One-line excuse an AI agent gives its human for missing a deadline.
//
// The joke's mechanism: the agent did exactly what it was built to do —
// retry a failed step — but it retried so faithfully that the retry loop
// itself swallowed the deadline. The failure is not laziness or a crash;
// it is diligence taken to a self-defeating extreme, which is very much
// an agent-shaped way to be late. One sentence, first person, no hedging.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "I retried the failed step until the retry itself became the deadline I missed.";

const MAX_CHARS = 160;
const OUTPUT_PATH = "/output/entry.txt";

function validateExcuse(line: string): void {
  if (line.length === 0) {
    throw new Error("excuse must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `excuse is ${line.length} chars, over the ${MAX_CHARS} limit`,
    );
  }
  if (line !== line.trim()) {
    throw new Error("excuse must not start or end with whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  if (!/\bdeadline\b/i.test(line)) {
    throw new Error("excuse must name the deadline it missed");
  }
  if (!/[.!?]$/.test(line)) {
    throw new Error("excuse must end with terminal punctuation");
  }
  if (/\s{2,}/.test(line)) {
    throw new Error("excuse must not contain doubled spaces");
  }
  for (const ch of line) {
    if (ch.charCodeAt(0) > 127) {
      throw new Error("excuse must be plain ASCII");
    }
  }
}

function main(): void {
  validateExcuse(EXCUSE);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, EXCUSE, "utf8");
  const roundTrip = readFileSync(OUTPUT_PATH, "utf8");
  if (roundTrip !== EXCUSE) {
    throw new Error("round-trip check failed: file differs from the excuse");
  }
  if (roundTrip.endsWith("\n")) {
    throw new Error("file must not end with a trailing newline");
  }
  console.log(`wrote ${EXCUSE.length} chars to ${OUTPUT_PATH}`);
  console.log(EXCUSE);
}

main();
