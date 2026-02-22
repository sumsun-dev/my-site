import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PhilosophySection from "./philosophy-section";
import { LIFE_PROFILE } from "@/lib/constants";

// Framer Motion mock
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => {
      const { variants, initial, whileInView, viewport, transition, ...rest } =
        props as Record<string, unknown>;
      void variants; void initial; void whileInView; void viewport; void transition;
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

  it("섹션 헤더를 렌더링한다", () => {
    render(<PhilosophySection />);

    const header = document.getElementById("philosophy");
    expect(header?.querySelector("h2")).toBeInTheDocument();
  });

  it("LIFE_PROFILE.quotes 개수만큼 인용구를 렌더링한다", () => {
    render(<PhilosophySection />);

    LIFE_PROFILE.quotes.forEach((quote) => {
      expect(screen.getByText(quote.text)).toBeInTheDocument();
    });
  });

  it("각 인용구의 텍스트와 출처를 표시한다", () => {
    render(<PhilosophySection />);

    LIFE_PROFILE.quotes.forEach((quote) => {
      expect(screen.getByText(quote.text)).toBeInTheDocument();
      expect(screen.getByText(`— ${quote.source}`)).toBeInTheDocument();
    });
  });

  it("아이콘을 표시한다", () => {
    render(<PhilosophySection />);

    LIFE_PROFILE.quotes.forEach((quote) => {
      expect(screen.getByText(quote.icon)).toBeInTheDocument();
    });
  });
});
