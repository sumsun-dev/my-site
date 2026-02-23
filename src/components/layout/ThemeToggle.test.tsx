import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";

const mockSetTheme = vi.fn();
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: mockSetTheme }),
}));

describe("ThemeToggle", () => {
  it("테마 전환 버튼을 렌더링한다", () => {
    render(<ThemeToggle />);

    expect(screen.getByRole("button", { name: "테마 전환" })).toBeInTheDocument();
  });

  it("클릭 시 setTheme을 호출한다", () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: "테마 전환" }));
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("aria-label이 설정되어 있다", () => {
    render(<ThemeToggle />);

    expect(screen.getByLabelText("테마 전환")).toBeInTheDocument();
  });
});
