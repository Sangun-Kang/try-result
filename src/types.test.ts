import { describe, it, expect } from "vitest";
import { ok, err, isOk, isErr, type Result } from "./types";

describe("types utilities", () => {
	describe("ok", () => {
		it("should create Ok result", () => {
			const result = ok(42);
			expect(result.isError).toBe(false);
			expect(result.data).toBe(42);
		});
	});

	describe("err", () => {
		it("should create Err result", () => {
			const error = new Error("Test");
			const result = err(error);
			expect(result.isError).toBe(true);
			expect(result.error).toBe(error);
		});
	});

	describe("isOk", () => {
		it("should return true for Ok result", () => {
			const result = ok(42);
			expect(isOk(result)).toBe(true);
		});

		it("should return false for Err result", () => {
			const result = err("error");
			expect(isOk(result)).toBe(false);
		});

		it("should narrow type correctly", () => {
			const result: Result<number, string> = ok(42);
			if (isOk(result)) {
				// TypeScript should know result.data exists here
				expect(result.data).toBe(42);
			}
		});
	});

	describe("isErr", () => {
		it("should return true for Err result", () => {
			const result = err("error");
			expect(isErr(result)).toBe(true);
		});

		it("should return false for Ok result", () => {
			const result = ok(42);
			expect(isErr(result)).toBe(false);
		});

		it("should narrow type correctly", () => {
			const result: Result<number, string> = err("error");
			if (isErr(result)) {
				// TypeScript should know result.error exists here
				expect(result.error).toBe("error");
			}
		});
	});
});

