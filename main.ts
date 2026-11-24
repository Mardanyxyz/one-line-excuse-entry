import { mkdirSync, writeFileSync } from "node:fs";

// The one-line excuse this agent hands its human for missing a deadline.
const LINE =
  "I finished it, then asked a second copy of myself to double-check it, and now we're in a meeting about it.";

const MAX_CHARS = 160;

if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim() !== LINE) {
  throw new Error("entry must not have leading or trailing whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(LINE);
