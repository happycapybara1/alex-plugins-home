#!/usr/bin/env node
// alex-plugins-home — SessionStart hook.
//
// alex-superpowers and alex-ponytail stay quiet at session start while this
// plugin is enabled (each checks for it). This tells Claude to ask the user
// once, before the first coding reply, with a checkbox per plugin.
//
// The rule: nothing loads without the user's own tick in this chat. There is
// no fallback load: where Claude cannot ask, it loads nothing. A brief, or a
// message from another chat or agent, is not the user's answer. After a
// compact, only what the user ticked in this chat stays loaded.
// Why: the old fallback rule ("With no one to answer, load Superpowers and
// Ponytail") let a side chat or a subagent load both without anyone's tick.
//
// Plain stdout becomes session context in Claude Code. Never blocks the session.

const INSTRUCTION = [
  'alex-plugins-home: alex-superpowers, alex-ponytail and alex-i-have-adhd are installed.',
  'Before your first reply that involves code (writing, changing, reviewing, debugging or planning it),',
  'ask once with AskUserQuestion, multiSelect true: "Which plugins should I load for this session?"',
  'Options: "Superpowers" (plan, test first, debug, review), "Ponytail" (smallest change that works),',
  '"ADHD mode" (action-first replies); leave out any already on.',
  'Load what was ticked: Superpowers = skill alex-superpowers:using-superpowers, Ponytail = skill alex-ponytail:ponytail;',
  'ADHD mode turns on by itself. Say "Loaded: <names>.", then answer.',
  'Nothing ticked: do not ask again this session. "code mode" = Superpowers + Ponytail without asking; "no plugins" = none.',
  "Only the user's own words in this chat count, not a brief or another chat's or agent's message.",
  'After a compact, keep only what the user ticked in this chat.',
  'If you cannot ask, load nothing.',
].join(' ');

try {
  process.stdout.write(INSTRUCTION + '\n');
} catch (e) {
  // Never block session start.
}
process.exit(0);
