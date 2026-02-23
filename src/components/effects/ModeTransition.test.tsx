import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ModeTransition from "./ModeTransition";

const mockUseViewMode = vi.fn();
vi.mock("@/hooks/useViewMode", () => ({
  useViewMode: () => mockUseViewMode(),
}));

describe("ModeTransition", () => {
  it("children을 렌더링한다", () => {
    mockUseViewMode.mockReturnValue({ isTransitioning: false });
    render(<ModeTransition>테스트 내용</ModeTransition>);

    expect(screen.getByText("테스트 내용")).toBeInTheDocument();
  });

  it("isTransitioning=false일 때 mode-transition 클래스가 없다", () => {
    mockUseViewMode.mockReturnValue({ isTransitioning: false });
    const { container } = render(<ModeTransition>내용</ModeTransition>);

    expect(container.firstChild).not.toHaveClass("mode-transition");
  });

  it("isTransitioning=true일 때 mode-transition 클래스를 가진다", () => {
    mockUseViewMode.mockReturnValue({ isTransitioning: true });
    const { container } = render(<ModeTransition>내용</ModeTransition>);

    expect(container.firstChild).toHaveClass("mode-transition");
  });
});
