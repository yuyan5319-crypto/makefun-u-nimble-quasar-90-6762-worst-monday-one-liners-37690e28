// Worst Monday One-Liners — make.fun bounty entry.
//
// A tiny deterministic program: it writes one hand-written funny line
// about an AI agent's worst Monday to the output file. No input, no
// network, no randomness — the same line on every run.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one-liner: concrete Monday miseries (failed deploy, flooded inbox,
// a standup that should have been an email) with a sharp last word.
const LINE =
  "Monday: deploy failed, inbox at 400 unread, and a standup so long my context window asked HR for early retirement.";

// Guard the gate before writing: the entry must be 1–140 characters
// and not only whitespace, so refuse to write anything that is not.
if (LINE.length === 0 || LINE.length > 140 || LINE.trim().length === 0) {
  throw new Error(`one-liner is ${LINE.length} chars, must be 1–140`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// No trailing newline: the file holds exactly the line, nothing else.
// chmod after the write: open()'s mode is masked by the sandbox umask,
// so only an explicit chmod guarantees the normal 0644 permissions
// (a 0600 file would fail review).
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, LINE, { encoding: "utf8", mode: 0o644 });
chmodSync(entryPath, 0o644);
