import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ReadingSection from "./reading-section";

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

describe("ReadingSection", () => {
  it("id='reading'을 가진다", () => {
    render(<ReadingSection />);

    expect(document.getElementById("reading")).toBeInTheDocument();
  });

  it("'Coming Soon' 텍스트를 표시한다", () => {
    render(<ReadingSection />);

    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
  });

  it("준비 중 안내 메시지를 표시한다", () => {
    render(<ReadingSection />);

    expect(
      screen.getByText("읽고 있는 책과 독서 기록을 준비하고 있습니다.")
    ).toBeInTheDocument();
  });
});
