import { describe, it, expect } from "vitest";
import {
  extractSchemeId,
  isDemoUser,
  isDemoScheme,
  DEMO_SCHEME_ID,
} from "../schemes";

describe("extractSchemeId", () => {
  it("maps a known full name to its scheme id", () => {
    expect(extractSchemeId("A66-WJ")).toBe("A66-WJ");
  });

  it("falls back to the first word for unknown names", () => {
    expect(extractSchemeId("UNKNOWN Some Scheme")).toBe("UNKNOWN");
  });

  it("returns null for empty input", () => {
    expect(extractSchemeId("")).toBeNull();
    expect(extractSchemeId(null)).toBeNull();
  });
});

describe("isDemoUser", () => {
  it("detects demo via schemeIds array", () => {
    expect(isDemoUser({ schemeIds: ["A66-WJ", DEMO_SCHEME_ID] })).toBe(true);
  });

  it("detects demo via legacy single schemeId", () => {
    expect(isDemoUser({ schemeId: DEMO_SCHEME_ID })).toBe(true);
  });

  it("is false for non-demo users and missing profile", () => {
    expect(isDemoUser({ schemeIds: ["A66-WJ"] })).toBe(false);
    expect(isDemoUser(null)).toBe(false);
  });
});

describe("isDemoScheme", () => {
  it("identifies the demo scheme id", () => {
    expect(isDemoScheme(DEMO_SCHEME_ID)).toBe(true);
    expect(isDemoScheme("A66-WJ")).toBe(false);
  });
});
