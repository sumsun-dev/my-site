import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DailyLifeSection from "./daily-life-section";
import { LIFE_PROFILE } from "@/lib/constants";

// Framer Motion mock
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => {
      const { variants, initial, whileInView, viewport, ...rest } = props as Record<string, unknown>;
      void variants; void initial; void whileInView; void viewport;
      const htmlProps = Object.fromEntries(
        Object.entries(rest).filter(
          ([k]) => !k.startsWith("variants") && typeof rest[k] !== "object"
        )
      );
      return <div {...htmlProps}>{children}</div>;
    },
  },
}));

describe("DailyLifeSection", () => {
  it("섹션 헤더를 렌더링한다", () => {
    render(<DailyLifeSection />);

    // SectionHeader는 IntersectionObserver 기반 타이핑 애니메이션 사용
    const header = document.getElementById("daily");
    expect(header).toBeInTheDocument();
    expect(header?.querySelector("h2")).toBeInTheDocument();
  });

  it("id='daily'를 가진다", () => {
    render(<DailyLifeSection />);

    expect(document.getElementById("daily")).toBeInTheDocument();
  });

  it("LIFE_PROFILE.dailyLife 개수만큼 일과 항목을 렌더링한다", () => {
    render(<DailyLifeSection />);

    LIFE_PROFILE.dailyLife.forEach((entry) => {
      expect(screen.getByText(entry.time)).toBeInTheDocument();
      expect(screen.getByText(entry.activity)).toBeInTheDocument();
    });
  });

  it("일과 아이콘을 표시한다", () => {
    render(<DailyLifeSection />);

    LIFE_PROFILE.dailyLife.forEach((entry) => {
      expect(screen.getByText(entry.icon)).toBeInTheDocument();
    });
  });
});
