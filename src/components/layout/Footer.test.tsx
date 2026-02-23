import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { PROFILE } from "@/lib/constants";

describe("Footer", () => {
  it("footer 태그를 렌더링한다", () => {
    const { container } = render(<Footer />);

    expect(container.querySelector("footer")).toBeInTheDocument();
  });

  it("현재 연도를 표시한다", () => {
    render(<Footer />);

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("PROFILE.nameEn을 표시한다", () => {
    render(<Footer />);

    expect(screen.getByText(new RegExp(PROFILE.nameEn))).toBeInTheDocument();
  });

  it("Built with 텍스트를 표시한다", () => {
    render(<Footer />);

    expect(screen.getByText(/Built with/)).toBeInTheDocument();
  });
});
