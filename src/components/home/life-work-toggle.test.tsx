import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Framer Motion mock
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const mockSetMode = vi.fn();
const mockToggleMode = vi.fn();

vi.mock("@/hooks/useLifeWork", () => ({
  useLifeWork: vi.fn(() => ({
    mode: "work" as const,
    setMode: mockSetMode,
    toggleMode: mockToggleMode,
    isTransitioning: false,
  })),
}));

import { useLifeWork } from "@/hooks/useLifeWork";
import LifeWorkToggle from "./life-work-toggle";

const mockedUseLifeWork = vi.mocked(useLifeWork);

describe("LifeWorkToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseLifeWork.mockReturnValue({
      mode: "work",
      setMode: mockSetMode,
      toggleMode: mockToggleMode,
      isTransitioning: false,
    });
  });

  it("WORK, LIFE 버튼 2개를 렌더링한다", () => {
    render(<LifeWorkToggle />);

    expect(screen.getByText("WORK")).toBeInTheDocument();
    expect(screen.getByText("LIFE")).toBeInTheDocument();
  });

  it("mode='work'일 때 WORK 모드 전환 aria-label이 있다", () => {
    render(<LifeWorkToggle />);

    expect(screen.getByLabelText("WORK 모드로 전환")).toBeInTheDocument();
    expect(screen.getByLabelText("LIFE 모드로 전환")).toBeInTheDocument();
  });

  it("LIFE 버튼 클릭 시 setMode('life')를 호출한다", async () => {
    const user = userEvent.setup();
    render(<LifeWorkToggle />);

    await user.click(screen.getByLabelText("LIFE 모드로 전환"));

    expect(mockSetMode).toHaveBeenCalledWith("life");
  });

  it("WORK 버튼 클릭 시 setMode('work')를 호출한다", async () => {
    const user = userEvent.setup();
    render(<LifeWorkToggle />);

    await user.click(screen.getByLabelText("WORK 모드로 전환"));

    expect(mockSetMode).toHaveBeenCalledWith("work");
  });

  it("isTransitioning=true일 때 버튼이 disabled된다", () => {
    mockedUseLifeWork.mockReturnValue({
      mode: "work",
      setMode: mockSetMode,
      toggleMode: mockToggleMode,
      isTransitioning: true,
    });

    render(<LifeWorkToggle />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
