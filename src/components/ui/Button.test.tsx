import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("children을 렌더링한다", () => {
    render(<Button>클릭</Button>);

    expect(screen.getByRole("button", { name: "클릭" })).toBeInTheDocument();
  });

  it("primary variant는 bg-accent-cyan 클래스를 가진다", () => {
    render(<Button variant="primary">Primary</Button>);

    expect(screen.getByRole("button")).toHaveClass("bg-accent-cyan");
  });

  it("outline variant는 border 클래스를 가진다", () => {
    render(<Button variant="outline">Outline</Button>);

    expect(screen.getByRole("button")).toHaveClass("border");
  });

  it("ghost variant는 text-text-secondary 클래스를 가진다", () => {
    render(<Button variant="ghost">Ghost</Button>);

    expect(screen.getByRole("button")).toHaveClass("text-text-secondary");
  });

  it("sm size는 text-xs 클래스를 가진다", () => {
    render(<Button size="sm">Small</Button>);

    expect(screen.getByRole("button")).toHaveClass("text-xs");
  });

  it("md size는 text-sm 클래스를 가진다", () => {
    render(<Button size="md">Medium</Button>);

    expect(screen.getByRole("button")).toHaveClass("text-sm");
  });

  it("onClick 핸들러를 호출한다", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("disabled 상태를 지원한다", () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
