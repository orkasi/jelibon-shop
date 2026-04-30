import test from "node:test";
import assert from "node:assert/strict";

import {
  getLanguageSwitchResult,
  getLocalizedPathname,
  isTurkishOnlyPath,
  resolveLanguageFromPath,
  sanitizeLanguageForPath,
} from "../src/lib/language-routing.ts";

test("Turkish legal routes always resolve as Turkish", () => {
  assert.equal(resolveLanguageFromPath("/gizlilik-politikasi", "en"), "tr");
  assert.equal(resolveLanguageFromPath("/kullanim-kosullari", "en"), "tr");
});

test("Stored English is ignored on Turkish-only routes", () => {
  assert.equal(sanitizeLanguageForPath("/gizlilik-politikasi", "en"), "tr");
});

test("Explicit language switching on Turkish legal routes maps back to English", () => {
  assert.deepEqual(getLanguageSwitchResult("/gizlilik-politikasi", "en"), {
    language: "en",
    pathname: "/privacy-policy",
  });
  assert.deepEqual(getLanguageSwitchResult("/kullanim-kosullari", "en"), {
    language: "en",
    pathname: "/terms-and-conditions",
  });
});

test("Localized route switching maps paired legal pages", () => {
  assert.equal(getLocalizedPathname("/privacy-policy", "tr"), "/gizlilik-politikasi");
  assert.equal(getLocalizedPathname("/gizlilik-politikasi", "en"), "/privacy-policy");
});

test("Turkish-only route detection is limited to legal pages", () => {
  assert.equal(isTurkishOnlyPath("/gizlilik-politikasi"), true);
  assert.equal(isTurkishOnlyPath("/shop"), false);
});
