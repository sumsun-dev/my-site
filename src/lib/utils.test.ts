import { describe, it, expect } from "vitest";
import { cn, formatDate, truncate } from "./utils";

describe("cn", () => {
  it("단일 클래스를 반환한다", () => {
    expect(cn("text-red")).toBe("text-red");
  });

  it("여러 클래스를 병합한다", () => {
    expect(cn("text-red", "bg-blue")).toBe("text-red bg-blue");
  });

  it("falsy 값을 무시한다", () => {
    expect(cn("text-red", false && "bg-blue", null, undefined)).toBe(
      "text-red"
    );
  });

  it("조건부 클래스를 처리한다", () => {
    const isActive = true;
    expect(cn("base", isActive && "active")).toBe("base active");
  });
});

describe("formatDate", () => {
  it("한국어 날짜 형식으로 변환한다", () => {
    const result = formatDate("2026-02-20");
    expect(result).toContain("2026");
    expect(result).toContain("2");
    expect(result).toContain("20");
  });

  it("ISO 문자열을 처리한다", () => {
    const result = formatDate("2025-12-25T00:00:00Z");
    expect(result).toContain("2025");
    expect(result).toContain("12");
    expect(result).toContain("25");
  });
});

describe("truncate", () => {
  it("짧은 문자열은 그대로 반환한다", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("긴 문자열을 잘라서 ...을 붙인다", () => {
    expect(truncate("hello world", 5)).toBe("hello...");
  });

  it("length와 동일한 길이의 문자열은 그대로 반환한다", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });

  it("빈 문자열을 처리한다", () => {
    expect(truncate("", 5)).toBe("");
  });
});
