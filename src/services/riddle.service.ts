import type { IRiddleService } from 'src/interfaces/riddle-service.interface';
import type { IBucket } from '../interfaces/bucket.interface';

export class RiddleService implements IRiddleService {
	public hasSolution(a: number, b: number, c: number): boolean {
		let can = c % this.gcf(a, b) == 0;
		can = can && (a + b) >= c;
		return can;
	}

	public gcf(a: number, b: number): number {
		// console.log(`gcd: a: ${a} or ${b}`);
		const r = a % b;
		if (r > 0) {
			return this.gcf(b, r);
		}
		return b;
	}

	public maxStepCount(a, b): number {
		return a * 2 + b * 2;
	}

	public findPath(
		a: IBucket,
		b: IBucket,
		c: number,
		context?: { found: boolean; count: number }
	): number[][] {
		if (!this.hasSolution(a.size, b.size, c)) {
			throw new Error(`No solution for finding ${c} with ${a.size} and ${b.size}`);
		}
		const find = this.trampoline(this.traverse);
		if (!context) {
			context = {
				found: false,
				count: this.maxStepCount(a, b)
			};
		}
		if (a.size > b.size) {
			return find([[0, 0]], a, b, c, context);
		} else {
			return find([[0, 0]], b, a, c, context);
		}
	}

	private traverse(
		path: number[][],
		a: IBucket,
		b: IBucket,
		c: number,
		context: { found: boolean; count: number }
	) {
		// console.log(`[${path[path.length-1]}]`);
		if (a.size + b.size === c) {
			a.fill();
			path.push([a.size, 0]);
			b.fill();
			path.push([a.size, b.size]);
			context.found = true;
		} else if (a.amount === 0 && a.size === c) {
			a.fill();
			path.push([a.size, 0]);
			context.found = true;
		} else if (b.amount === 0 && b.size === c) {
			b.fill();
			path.push([0, b.size]);
			context.found = true;
		} else if (a.amount + b.amount === c) {
			context.found = true;
		} else if (a.amount === c) {
			path.push([a.amount, 0]);
			context.found = true;
		} else if (b.amount === c) {
			path.push([0, b.amount]);
			context.found = true;
		}
		if (context.found === true || context.count-- < 0) {
			return path;
		}
		if (a.amount === 0 && b.amount === b.size && a.size + b.size !== c) {
			b.transfer(a);
		} else if (a.amount > 0 && b.amount < b.size) {
			a.transfer(b);
		} else if (a.amount > 0 && b.amount > 0) {
			b.empty();
		} else {
			a.fill();
		}
		path.push([a.amount, b.amount]);
		return () => this.traverse(path, a, b, c, context);
	}

	private trampoline =
		(fn) =>
		(...args) => {
			let result = fn.call(this, ...args);
			while (typeof result === 'function') {
				result = result();
			}
			return result;
		};
}
