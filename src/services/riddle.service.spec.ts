import { Bucket } from '../models/bucket';
import { RiddleService } from './riddle.service';

export {};
// import { mock } from "jest-mock-extended";

describe('Given riddle service', () => {
	const riddleService = new RiddleService();

	describe('when calling findPath method', () => {
		it('should find correct answer for 5, 3, 4.', async () => {
			const bucketA = new Bucket(5);
			const bucketB = new Bucket(3);
			const target = 4;

			const result = riddleService.findPath(bucketA, bucketB, target);

			expect(result.length).toEqual(8);
			expect(result).toEqual([
				[0, 0],
				[5, 0],
				[2, 3],
				[2, 0],
				[0, 2],
				[5, 2],
				[4, 3],
				[4, 0]
			]);
		});

		it('should find correct answer for 3, 5, 4.', async () => {
			const bucketA = new Bucket(5);
			const bucketB = new Bucket(3);
			const target = 4;

			const result = riddleService.findPath(bucketB, bucketA, target);

			expect(result.length).toEqual(8);
			expect(result).toEqual([
				[0, 0],
				[5, 0],
				[2, 3],
				[2, 0],
				[0, 2],
				[5, 2],
				[4, 3],
				[4, 0]
			]);
		});

		it('should find correct answer for 28, 32, 60.', async () => {
			const bucketA = new Bucket(28);
			const bucketB = new Bucket(32);
			const target = 60;

			const result = riddleService.findPath(bucketA, bucketB, target);

			expect(result.length).toEqual(3);
			expect(result).toEqual([
				[0, 0],
				[32, 0],
				[32, 28]
			]);
		});

		it('should find correct answer for 28, 32, 28.', async () => {
			const bucketA = new Bucket(28);
			const bucketB = new Bucket(32);
			const target = 28;

			const result = riddleService.findPath(bucketA, bucketB, target);

			expect(result.length).toEqual(2);
			expect(result).toEqual([
				[0, 0],
				[0, 28]
			]);
		});

		it('should throw error for 398, 4328, 221.', async () => {
			const bucketA = new Bucket(398);
			const bucketB = new Bucket(4328);
			const target = 221;

			expect(() => {
				riddleService.findPath(bucketA, bucketB, target);
			}).toThrow();
		});
	});

	describe('when calling gcf method', () => {
		it('should find highest common factor of 12 and 8.', async () => {
			const result = riddleService.gcf(12, 8);
			expect(result).toEqual(4);
		});

		it('should find highest common factor of primes.', async () => {
			const result = riddleService.gcf(5, 7);
			expect(result).toEqual(1);
		});

		it('should find highest common factor of 144 and 132.', async () => {
			const result = riddleService.gcf(144, 132);
			expect(result).toEqual(12);
		});

		it('should find self when given 0 for one number.', async () => {
			const result = riddleService.gcf(0, 132);
			expect(result).toEqual(132);
		});

		it('should find 0 when given 0 for both numbers.', async () => {
			const result = riddleService.gcf(0, 0);
			expect(result).toEqual(0);
		});
	});

	describe('when calling maxStepCount method', () => {
		it('should find correct step count for small numbers.', async () => {
			const result = riddleService.maxStepCount(5, 3);
			expect(result).toEqual(16);
		});

		it('should find correct step count for large numbers.', async () => {
			const result = riddleService.maxStepCount(200, 333);
			expect(result).toEqual(1066);
		});
	});

	describe('when calling hasSolution method', () => {
		it('should find correct answer for small numbers.', async () => {
			const result = riddleService.hasSolution(5, 3, 7);
			expect(result).toEqual(true);
		});

		it('should find correct answer for large numbers.', async () => {
			const result = riddleService.hasSolution(398, 4328, 424);
			expect(result).toEqual(true);
		});

		it('should find correct answer when target is not possible.', async () => {
			const result = riddleService.hasSolution(398, 4328, 221);
			expect(result).toEqual(false);
		});
	});
});
