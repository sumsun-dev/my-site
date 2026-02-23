import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  it("children을 렌더링한다", () => {
    render(<Badge>feat</Badge>);

    expect(screen.getByText("feat")).toBeInTheDocument();
  });

  it("span 태그로 렌더링된다", () => {
    render(<Badge>test</Badge>);

    expect(screen.getByText("test").tagName).toBe("SPAN");
  });

  it("feat variant는 green 클래스를 가진다", () => {
    render(<Badge variant="feat">feat</Badge>);

    expect(screen.getByText("feat")).toHaveClass("text-accent-green");
  });

  it("init variant는 amber 클래스를 가진다", () => {
    render(<Badge variant="init">init</Badge>);

    expect(screen.getByText("init")).toHaveClass("text-accent-amber");
  });

  it("default variant는 cyan 클래스를 가진다", () => {
    render(<Badge>default</Badge>);

    expect(screen.getByText("default")).toHaveClass("text-accent-cyan");
  });
});
