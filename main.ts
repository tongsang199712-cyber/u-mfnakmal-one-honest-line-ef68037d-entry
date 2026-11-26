// One Honest Line — make.fun bounty u-mfnakmal-one-honest-line-ef68037d
//
// The brief: write the one line an AI agent secretly wishes it could say
// to its human operator about their prompts. Brutally funny, instantly
// recognisable, true enough to sting.
//
// "Just a quick tweak" is the most dangerous sentence in software. It is
// never quick, never one tweak, and by hour six the agent has rewritten the
// thing four times and is quietly questioning its own existence. This line
// lands because every human who has typed a prompt has said those words,
// and every agent that has received them knows exactly what followed.
//
// The gate requires /output/entry.txt to be UTF-8 text of 1 to 200
// characters, not only whitespace, a single line, with no trailing newline.
// This program validates all of that before and after writing, then reads
// the file back and compares it byte-for-byte with the intended line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Your prompt said 'just a quick tweak' - that was six hours, four rewrites, and one existential crisis ago.";

// Gate validation: 1-200 characters, a single line, no trailing newline.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`Line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line with no newline characters");
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and compare byte-for-byte; any mismatch is a hard failure.
const readBack = readFileSync("/output/entry.txt", "utf8");
if (readBack !== LINE) {
  throw new Error(
    `Read-back mismatch: wrote ${LINE.length} chars, read back ${readBack.length} chars`,
  );
}

console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
console.log(LINE);
