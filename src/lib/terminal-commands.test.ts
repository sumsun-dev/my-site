import { describe, it, expect } from "vitest";
import { executeCommand } from "./terminal-commands";
import type { CommandOutput } from "./terminal-commands";

function getContent(outputs: CommandOutput[]): string {
  return outputs.map((o) => o.content).join("\n");
}

describe("executeCommand", () => {
  it("help 명령어가 사용 가능한 명령어 목록을 반환한다", () => {
    const result = executeCommand("help");
    expect(result).not.toBe("clear");

    const outputs = result as CommandOutput[];
    const content = getContent(outputs);
    expect(content).toContain("사용 가능한 명령어");
    expect(content).toContain("whoami");
  });

  it("whoami 명령어가 프로필 정보를 반환한다", () => {
    const result = executeCommand("whoami") as CommandOutput[];
    const content = getContent(result);
    expect(content).toContain("엄상현");
    expect(content).toContain("Sanghyun Eom");
  });

  it("clear 명령어가 'clear' 문자열을 반환한다", () => {
    expect(executeCommand("clear")).toBe("clear");
  });

  it("빈 입력은 빈 배열을 반환한다", () => {
    expect(executeCommand("")).toEqual([]);
    expect(executeCommand("   ")).toEqual([]);
  });

  it("존재하지 않는 명령어에 에러를 반환한다", () => {
    const result = executeCommand("nonexistent") as CommandOutput[];
    expect(result[0].type).toBe("error");
    expect(result[0].content).toContain("command not found");
  });

  it("sudo 명령어가 권한 에러를 반환한다", () => {
    const result = executeCommand("sudo rm -rf /") as CommandOutput[];
    expect(result[0].type).toBe("error");
    expect(result[0].content).toContain("Permission denied");
  });

  it("rm 명령어가 읽기 전용 에러를 반환한다", () => {
    const result = executeCommand("rm -rf /") as CommandOutput[];
    expect(result[0].type).toBe("error");
    expect(result[0].content).toContain("read-only");
  });

  it("git log 명령어가 커리어 히스토리를 반환한다", () => {
    const result = executeCommand("git log") as CommandOutput[];
    const content = getContent(result);
    expect(content).toContain("commit");
    expect(content).toContain("DeSpread");
  });

  it("about 명령어가 키워드를 반환한다", () => {
    const result = executeCommand("about") as CommandOutput[];
    const content = getContent(result);
    expect(content).toContain("about.md");
  });

  it("links 명령어가 SNS 링크를 반환한다", () => {
    const result = executeCommand("links") as CommandOutput[];
    const content = getContent(result);
    expect(content).toContain("GitHub");
    expect(content).toContain("Telegram");
  });

  it("echo 명령어가 인자를 출력한다", () => {
    const result = executeCommand("echo hello world") as CommandOutput[];
    expect(result[0].content).toBe("hello world");
  });

  it("pwd 명령어가 경로를 반환한다", () => {
    const result = executeCommand("pwd") as CommandOutput[];
    expect(result[0].content).toContain("/home/visitor");
  });

  it("대소문자를 구분하지 않는다", () => {
    const result = executeCommand("HELP");
    expect(result).not.toBe("clear");

    const outputs = result as CommandOutput[];
    const content = getContent(outputs);
    expect(content).toContain("사용 가능한 명령어");
  });

  it("입력 앞뒤 공백을 제거한다", () => {
    const result = executeCommand("  help  ");
    expect(result).not.toBe("clear");

    const outputs = result as CommandOutput[];
    const content = getContent(outputs);
    expect(content).toContain("사용 가능한 명령어");
  });
});
