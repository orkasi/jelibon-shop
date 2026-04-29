import test from "node:test";
import assert from "node:assert/strict";

import {
  getCompactSizeLabel,
  getTranslatedSizeLabel,
} from "../src/lib/language-format.ts";

test("Turkish size labels are fully translated", () => {
  assert.equal(getTranslatedSizeLabel("tr", "Small"), "Küçük");
  assert.equal(getTranslatedSizeLabel("tr", "Medium"), "Orta");
  assert.equal(getTranslatedSizeLabel("tr", "Large"), "Büyük");
  assert.equal(getTranslatedSizeLabel("tr", "X-Large"), "Ekstra Büyük");
});

test("Turkish compact size labels stay compact in controls", () => {
  assert.equal(getCompactSizeLabel("tr", "Small"), "S");
  assert.equal(getCompactSizeLabel("tr", "4X-Large"), "4XL");
});
