import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ReadingSection from "./reading-section";
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

describe("ReadingSection", () => {
  it("id='reading'을 가진다", () => {
    render(<ReadingSection />);

    expect(document.getElementById("reading")).toBeInTheDocument();
  });

  it("섹션 헤더를 렌더링한다", () => {
    render(<ReadingSection />);

    const header = document.getElementById("reading");
    expect(header?.querySelector("h2")).toBeInTheDocument();
  });

  it("LIFE_PROFILE.books 개수만큼 책 카드를 렌더링한다", () => {
    render(<ReadingSection />);

    LIFE_PROFILE.books.forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });

  it("각 책의 제목과 저자를 표시한다", () => {
    render(<ReadingSection />);

    LIFE_PROFILE.books.forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
      expect(screen.getByText(book.author)).toBeInTheDocument();
    });
  });

  it("status에 따라 Badge를 표시한다", () => {
    render(<ReadingSection />);

    const finishedCount = LIFE_PROFILE.books.filter((b) => b.status === "finished").length;
    const readingCount = LIFE_PROFILE.books.filter((b) => b.status === "reading").length;
    const wishlistCount = LIFE_PROFILE.books.filter((b) => b.status === "wishlist").length;

    const badges = screen.getAllByText(/^(finished|reading|wishlist)$/);
    const finished = badges.filter((el) => el.textContent === "finished");
    const reading = badges.filter((el) => el.textContent === "reading");
    const wishlist = badges.filter((el) => el.textContent === "wishlist");

    expect(finished).toHaveLength(finishedCount);
    expect(reading).toHaveLength(readingCount);
    expect(wishlist).toHaveLength(wishlistCount);
  });

  it("review가 있는 책은 리뷰를 표시한다", () => {
    render(<ReadingSection />);

    const booksWithReview = LIFE_PROFILE.books.filter((b) => b.review);
    booksWithReview.forEach((book) => {
      expect(screen.getByText(book.review!)).toBeInTheDocument();
    });
  });
});
