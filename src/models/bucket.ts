import type { IBucket } from "src/interfaces/bucket.interface";

export class Bucket implements IBucket {
	private amt = 0;
    readonly size: number;

	constructor(size: number) {
        this.size = Math.trunc(size);
    }

	get space(): number {
		return this.size - this.amt;
	}

	get amount(): number {
		return this.amt;
	}

    get percentFull(): number {
        return this.amount / (this.size || 1) * 100;
    }

	fill(amount?: number) {
		const value = amount ?? this.size;
		if (value > this.space) {
			throw new Error(`Overfilled ${this.size} `);
		}
		this.amt += value;
	}

	empty() {
		this.amt = 0;
	}

	transfer(bucket: Bucket) {
		//amt 4 -> bucket space = 1
		const value = bucket.space >= this.amt ? this.amt : bucket.space;
		this.amt -= value;
		// console.log(`SEND: ${value}`)
		bucket.fill(value);
	}
}
