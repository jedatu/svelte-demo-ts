import type { IBucket } from "./bucket.interface";

export interface IRiddleService {
	hasSolution(a: number, b: number, target: number);
	maxStepCount(a: number, b: number);
    findPath(
		a: IBucket,
		b: IBucket,
		target: number,
		context?: { found: boolean; count: number }
	);
}