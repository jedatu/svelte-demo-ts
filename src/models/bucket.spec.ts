import { Bucket } from '../models/bucket';

export {};
// import { mock } from "jest-mock-extended";

describe('Given the Bucket model', () => {
	it('should fill correctly.', () => {
		const b = new Bucket(10);
		b.fill();
		expect(b.amount).toEqual(10);
	});

	it('should throw error when non-empty bucket is filled.', () => {
		const b = new Bucket(10);
		b.fill(1);
		expect(() => {
			b.fill();
		}).toThrow();
	});

	it('should throw error when non-empty bucket is filled.', () => {
		const b = new Bucket(10);
		expect(() => {
			b.fill(13);
		}).toThrow();
	});

	it('should transfer without overfilling.', () => {
		const a = new Bucket(10);
		const b = new Bucket(5);
		a.fill();
		a.transfer(b);
		expect(a.amount).toEqual(5);
		expect(b.amount).toEqual(5);
	});

	it('should ensure integers only.', () => {
		const a = new Bucket(2.5);
		a.fill();
		expect(a.amount).toEqual(2);
	});

	it('should empty to zero.', () => {
		const a = new Bucket(5);
		a.fill();
		a.empty();
		expect(a.amount).toEqual(0);
	});

	it('should calculate percent full correctly.', () => {
		const a = new Bucket(50);
		a.fill(25);
		expect(a.percentFull).toEqual(50);
	});

	it('should calculate space available correctly.', () => {
		const a = new Bucket(50);
		a.fill(25);
		expect(a.space).toEqual(25);
	});
});
