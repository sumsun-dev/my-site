import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLifeWork } from "./useLifeWork";
import { LifeWorkProvider } from "@/contexts/LifeWorkContext";

describe("useLifeWork", () => {
  it("Provider 내에서 mode, setMode, toggleMode에 접근할 수 있다", () => {
    const { result } = renderHook(() => useLifeWork(), {
      wrapper: ({ children }) => (
        <LifeWorkProvider>{children}</LifeWorkProvider>
      ),
    });

    expect(result.current.mode).toBe("work");
    expect(typeof result.current.setMode).toBe("function");
    expect(typeof result.current.toggleMode).toBe("function");
    expect(typeof result.current.isTransitioning).toBe("boolean");
  });

  it("Provider 밖에서도 기본값으로 동작한다", () => {
    // createContext에 기본값이 제공되어 있어 에러를 throw하지 않음
    const { result } = renderHook(() => useLifeWork());

    expect(result.current.mode).toBe("work");
    expect(typeof result.current.setMode).toBe("function");
  });
});
