export interface IBucket {
	size: number;
	space: number;
	amount: number;
    percentFull: number;
	fill(amount?: number);
	empty();
	transfer(bucket: IBucket);
}
