import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const defaults = JSON.parse(readFileSync(new URL("./defaults.json", import.meta.url)));

const REQUIRED_LIGHT_KEYS = [
  "--radius", "--background", "--foreground", "--card", "--card-foreground",
  "--popover", "--popover-foreground", "--primary", "--primary-foreground",
  "--secondary", "--secondary-foreground", "--muted", "--muted-foreground",
  "--accent", "--accent-foreground", "--destructive", "--destructive-foreground",
  "--border", "--input", "--ring", "--font-sans",
  "--spacing-xs", "--spacing-sm", "--spacing-md", "--spacing-lg", "--spacing-xl",
  "--success", "--success-foreground", "--warning", "--warning-foreground",
  "--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5",
];
const REQUIRED_DARK_KEYS = [
  "--background", "--foreground", "--card", "--card-foreground",
  "--popover", "--popover-foreground", "--primary", "--primary-foreground",
  "--secondary", "--secondary-foreground", "--muted", "--muted-foreground",
  "--accent", "--accent-foreground", "--destructive", "--destructive-foreground",
  "--border", "--input", "--ring",
  "--success", "--success-foreground", "--warning", "--warning-foreground",
  "--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5",
];

test("defaults.json has light and dark blocks", () => {
  assert.ok(defaults.light);
  assert.ok(defaults.dark);
});

test("light block has every key the ProjectsCLI generator expects", () => {
  for (const key of REQUIRED_LIGHT_KEYS) {
    assert.ok(key in defaults.light, `missing light key ${key}`);
  }
});

test("dark block has every key the ProjectsCLI generator expects", () => {
  for (const key of REQUIRED_DARK_KEYS) {
    assert.ok(key in defaults.dark, `missing dark key ${key}`);
  }
});

test("no light/dark value is empty", () => {
  for (const [theme, vars] of [["light", defaults.light], ["dark", defaults.dark]]) {
    for (const [key, value] of Object.entries(vars)) {
      assert.ok(typeof value === "string" && value.length > 0, `${theme}.${key} is empty`);
    }
  }
});
