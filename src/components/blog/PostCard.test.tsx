import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PostCard from "./PostCard";
import type { Post } from "@/types";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string } & Record<string, unknown>) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const mockPost: Post = {
  id: "1",
  title: "테스트 포스트",
  slug: "test-post",
  content: "본문 내용",
  excerpt: "테스트 요약입니다",
  cover_image: null,
  category: "기술",
  tags: ["React", "TypeScript"],
  published: true,
  created_at: "2025-01-15T00:00:00Z",
  updated_at: "2025-01-15T00:00:00Z",
};

describe("PostCard", () => {
  it("포스트 제목을 렌더링한다", () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText("테스트 포스트")).toBeInTheDocument();
  });

  it("카테고리 Badge를 표시한다", () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText("기술")).toBeInTheDocument();
  });

  it("날짜를 표시한다", () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText(/2025년/)).toBeInTheDocument();
  });

  it("excerpt를 표시한다", () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText("테스트 요약입니다")).toBeInTheDocument();
  });

  it("태그를 표시한다", () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText("#React")).toBeInTheDocument();
    expect(screen.getByText("#TypeScript")).toBeInTheDocument();
  });

  it("/blog/{slug} 링크를 가진다", () => {
    render(<PostCard post={mockPost} />);

    const link = screen.getByText("테스트 포스트").closest("a");
    expect(link).toHaveAttribute("href", "/blog/test-post");
  });
});
