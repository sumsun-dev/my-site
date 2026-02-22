import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HobbiesSection from "./hobbies-section";
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

describe("HobbiesSection", () => {
  it("섹션 헤더를 렌더링한다", () => {
    render(<HobbiesSection />);

    // SectionHeader는 IntersectionObserver 기반 타이핑 애니메이션 사용
    // id로 섹션 헤더 존재 여부 확인
    const header = document.getElementById("hobbies");
    expect(header).toBeInTheDocument();
    expect(header?.querySelector("h2")).toBeInTheDocument();
  });

  it("id='hobbies'를 가진다", () => {
    render(<HobbiesSection />);

    expect(document.getElementById("hobbies")).toBeInTheDocument();
  });

  it("LIFE_PROFILE.hobbies 개수만큼 카드를 렌더링한다", () => {
    render(<HobbiesSection />);

    LIFE_PROFILE.hobbies.forEach((hobby) => {
      expect(screen.getByText(hobby.title)).toBeInTheDocument();
      expect(screen.getByText(hobby.desc)).toBeInTheDocument();
    });
  });

  it("취미 아이콘을 표시한다", () => {
    render(<HobbiesSection />);

    LIFE_PROFILE.hobbies.forEach((hobby) => {
      expect(screen.getByText(hobby.icon)).toBeInTheDocument();
    });
  });
});
