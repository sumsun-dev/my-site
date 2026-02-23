import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import SectionHeader from "./SectionHeader";

describe("SectionHeader", () => {
  it("id 속성을 설정한다", () => {
    render(<SectionHeader command="cat about.md" id="about" />);

    expect(document.getElementById("about")).toBeInTheDocument();
  });

  it("h2 태그를 렌더링한다", () => {
    const { container } = render(<SectionHeader command="ls projects/" id="projects" />);

    expect(container.querySelector("h2")).toBeInTheDocument();
  });

  it("$ 프롬프트를 표시한다", () => {
    const { container } = render(<SectionHeader command="test" id="test" />);

    expect(container.textContent).toContain("$");
  });

  it("scroll-mt-24 클래스를 가진다", () => {
    render(<SectionHeader command="test" id="test-section" />);

    expect(document.getElementById("test-section")).toHaveClass("scroll-mt-24");
  });
});
