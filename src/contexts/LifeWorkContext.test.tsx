import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { LifeWorkProvider } from "./LifeWorkContext";
import { useLifeWork } from "@/hooks/useLifeWork";

function wrapper({ children }: { children: React.ReactNode }) {
  return <LifeWorkProvider>{children}</LifeWorkProvider>;
}

describe("LifeWorkContext", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.documentElement.removeAttribute("data-life-mode");
  });

  afterEach(() => {
    vi.useRealTimers();
    document.documentElement.removeAttribute("data-life-mode");
  });

  it("초기 mode는 'work'이다", () => {
    const { result } = renderHook(() => useLifeWork(), { wrapper });
    expect(result.current.mode).toBe("work");
  });

  it("setMode('life')로 mode를 변경한다", () => {
    const { result } = renderHook(() => useLifeWork(), { wrapper });

    act(() => result.current.setMode("life"));

    expect(result.current.mode).toBe("life");
  });

  it("toggleMode()로 work↔life를 전환한다", () => {
    const { result } = renderHook(() => useLifeWork(), { wrapper });

    act(() => result.current.toggleMode());
    expect(result.current.mode).toBe("life");

    act(() => result.current.toggleMode());
    expect(result.current.mode).toBe("work");
  });

  it("setMode 후 isTransitioning이 true가 된다", () => {
    const { result } = renderHook(() => useLifeWork(), { wrapper });

    act(() => result.current.setMode("life"));

    expect(result.current.isTransitioning).toBe(true);
  });

  it("500ms 후 isTransitioning이 false가 된다", () => {
    const { result } = renderHook(() => useLifeWork(), { wrapper });

    act(() => result.current.setMode("life"));
    expect(result.current.isTransitioning).toBe(true);

    act(() => vi.advanceTimersByTime(500));
    expect(result.current.isTransitioning).toBe(false);
  });

  it("같은 mode로 setMode하면 변경하지 않는다", () => {
    const { result } = renderHook(() => useLifeWork(), { wrapper });

    act(() => result.current.setMode("work"));

    expect(result.current.isTransitioning).toBe(false);
  });

  it("mode='life'일 때 html에 data-life-mode='true'를 설정한다", () => {
    const { result } = renderHook(() => useLifeWork(), { wrapper });

    act(() => result.current.setMode("life"));

    expect(document.documentElement.getAttribute("data-life-mode")).toBe("true");
  });

  it("mode='work'일 때 html에서 data-life-mode를 제거한다", () => {
    const { result } = renderHook(() => useLifeWork(), { wrapper });

    act(() => result.current.setMode("life"));
    act(() => result.current.setMode("work"));

    expect(document.documentElement.hasAttribute("data-life-mode")).toBe(false);
  });
});
