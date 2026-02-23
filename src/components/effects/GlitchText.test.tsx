import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GlitchText from "./GlitchText";

describe("GlitchText", () => {
  it("텍스트를 렌더링한다", () => {
    render(<GlitchText text="Hello World" />);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("data-text 속성을 설정한다", () => {
    render(<GlitchText text="Glitch" />);

    expect(screen.getByText("Glitch")).toHaveAttribute("data-text", "Glitch");
  });

  it("glitch 클래스를 가진다", () => {
    render(<GlitchText text="Test" />);

    expect(screen.getByText("Test")).toHaveClass("glitch");
  });

  it("추가 className을 병합한다", () => {
    render(<GlitchText text="Test" className="text-2xl" />);

    expect(screen.getByText("Test")).toHaveClass("text-2xl");
  });
});
