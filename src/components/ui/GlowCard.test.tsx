import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import GlowCard from "./GlowCard";

describe("GlowCard", () => {
  it("children을 렌더링한다", () => {
    render(<GlowCard>카드 내용</GlowCard>);

    expect(screen.getByText("카드 내용")).toBeInTheDocument();
  });

  it("className을 병합한다", () => {
    const { container } = render(<GlowCard className="custom-class">내용</GlowCard>);

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("spotlight div를 포함한다", () => {
    const { container } = render(<GlowCard>내용</GlowCard>);

    expect(container.querySelector(".spotlight")).toBeInTheDocument();
  });

  it("glow-card 클래스를 가진다", () => {
    const { container } = render(<GlowCard>내용</GlowCard>);

    expect(container.firstChild).toHaveClass("glow-card");
  });

  it("mouseMove 시 CSS 변수를 설정한다", () => {
    const { container } = render(<GlowCard>내용</GlowCard>);
    const card = container.firstChild as HTMLElement;

    fireEvent.mouseMove(card, { clientX: 100, clientY: 50 });

    expect(card.style.getPropertyValue("--mouse-x")).toBeTruthy();
    expect(card.style.getPropertyValue("--mouse-y")).toBeTruthy();
  });
});
