import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PhilosophySection from "./philosophy-section";

// Framer Motion mock
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => {
      const { initial, whileInView, viewport, transition, ...rest } = props as Record<string, unknown>;
      void initial; void whileInView; void viewport; void transition;
      const htmlProps = Object.fromEntries(
        Object.entries(rest).filter(([, v]) => typeof v !== "object" || v === null)
      );
      return <div {...htmlProps}>{children}</div>;
    },
  },
}));

describe("PhilosophySection", () => {
  it("id='philosophy'를 가진다", () => {
    render(<PhilosophySection />);

    expect(document.getElementById("philosophy")).toBeInTheDocument();
  });

  it("'Coming Soon' 텍스트를 표시한다", () => {
    render(<PhilosophySection />);

    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
  });

  it("준비 중 안내 메시지를 표시한다", () => {
    render(<PhilosophySection />);

    expect(
      screen.getByText("삶의 철학과 가치관에 대한 이야기를 준비하고 있습니다.")
    ).toBeInTheDocument();
  });
});
