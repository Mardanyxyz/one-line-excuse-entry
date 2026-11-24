// One-line excuse an AI agent gives its human for missing a deadline.
// Writes the entry line to /output/entry.txt (1-160 chars, UTF-8).
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I was on schedule until I discovered the schedule was a hallucination.";

if (LINE.length < 1 || LINE.length > 160) {
  throw new Error(`Entry line must be 1-160 characters, got ${LINE.length}`);
}
if (/\r|\n/.test(LINE)) {
  throw new Error("Entry line must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(LINE);
