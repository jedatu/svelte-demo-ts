<script lang="ts">
	import { RiddleService } from '../services/riddle.service';
	import Configure from '../components/configure.svelte';
	import BucketView from '../components/bucket-view.svelte';
	import type { ISimulationEvent } from '../models/simulation-event';
	import { Bucket } from '../models/bucket';

	const riddleService = new RiddleService();

	let speed: number = 1000;
	let xValue: number = 1;
	let yValue: number = 1;
	let zValue: number = 1;
	let bucketX: Bucket = new Bucket(xValue);
	let bucketY: Bucket = new Bucket(yValue);
	let heightX: number;
	let heightY: number;
	let bucketXAmount: number = bucketX.amount;
	let bucketYAmount: number = bucketY.amount;

	$: if (xValue >= yValue) {
		heightX = 200;
	} else {
		const tmp = Math.trunc((xValue * 200) / yValue);
		heightX = tmp > 20 ? tmp : 20;
	}

	$: if (yValue >= xValue) {
		heightY = 200;
	} else {
		const tmp = Math.trunc((yValue * 200) / xValue);
		heightY = tmp > 20 ? tmp : 20;
	}

	$: if (bucketX?.size !== xValue) {
		bucketX = new Bucket(xValue);
		bucketXAmount = 0;
	}

	$: if (bucketY?.size !== yValue) {
		bucketY = new Bucket(yValue);
		bucketYAmount = 0;
	}

	function runSimulation(event: ISimulationEvent) {
		bucketX.empty();
		bucketY.empty();
		const results = riddleService.findPath(bucketX, bucketY, event.detail.target);
		renderSimulation(results);
	}

	function renderSimulation(path: number[][]) {
		let actions = Promise.resolve();
		for (let i = 0; i < path.length; i++) {
			actions = actions.then(async () => {
				await changeState.apply(null, path[i]);
			});
		}
		actions.then(() => {
			console.log('Done');
		});
	}

	async function changeState(x: number, y: number) {
		bucketXAmount = (bucketX.size > bucketY.size) ? x : y;
		bucketYAmount = (bucketX.size > bucketY.size) ? y : x;
		await new Promise((resolve) => setTimeout(resolve, speed));
	}
</script>

<svelte:head>
	<title>Water Jug Riddle</title>
</svelte:head>

<div class="bg-400 flex items-center justify-center z-50">
	<div class="grid grid-cols-2 md:grid-cols-8 gap-6">
		<div class="col-span-2 md:col-span-8 rounded-b-lg bg-lime-500 p-5">
			<h1 class="text-3xl font-bold">Water Jug Riddle</h1>
		</div>
		<div class="col-span-2 md:col-span-2">
			<Configure
				bind:bucketX={xValue}
				bind:bucketY={yValue}
				bind:target={zValue}
				on:simulate={runSimulation}
			/>
		</div>
		<div class="col-span-1 md:col-span-3 justify-center">
			<BucketView scale={heightX} size={xValue} amount={bucketXAmount} />
		</div>
		<div class="col-span-1 md:col-span-3 justify-center">
			<BucketView scale={heightY} size={yValue} amount={bucketYAmount} />
		</div>
		<div class="col-span-2 md:col-span-8 md:invisible">
			<img class="z-0" src="../../static/lake.jpg" alt="Lake" width="100%" />
		</div>
		<div class="lake col-span-2 md:col-span-8 md:visible">
			<img class="z-0" src="../../static/lake.jpg" alt="Lake" width="100%" />
		</div>
	</div>
</div>

<style>
	.lake {
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
