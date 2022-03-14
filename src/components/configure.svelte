<script lang="ts">
	import { RiddleService } from '../services/riddle.service';
	import Amount from '../components/amount.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const riddleService = new RiddleService();

	export let maxNumber: number = 99999;
	export let bucketX: number = 1;
	export let bucketY: number = 1;
	export let target: number = 1;

	function runSimulation() {
		dispatch('simulate', {
			bucketX: bucketX,
			bucketY: bucketY,
			target: target
		});
	}

	$: maxTarget = bucketX + bucketY;
	$: isRunDisabled = !riddleService.hasSolution(bucketX, bucketY, target);
</script>

<div class="configure grid grid-cols-1 gap-4">
	<div class="rounded-t-lg bg-lime-500 p-2">
		<h2 class="text-xl font-bold">Configure Riddle</h2>
		<p>Select bucket sizes and target amount.</p>
	</div>
	<div>
		<Amount label="First Bucket Size:" max={maxNumber} bind:value={bucketX} />
	</div>
	<div>
		<Amount label="Second Bucket Size:" max={maxNumber} bind:value={bucketY} />
	</div>
	<div>
		<Amount label="Target Amount:" max={maxTarget} bind:value={target} />
	</div>
	{#if isRunDisabled}
		<div class="text-rose-600 border-rose-600 bg-rose-200 p-2">
			Run simulation when a valid scenario is configured.
		</div>
	{/if}
	<div>
		<button
			id="simulate"
			class="rounded-lg bg-lime-500 p-2 w-full disabled:bg-slate-400 hover:bg-lime-300"
			on:click={runSimulation}
			disabled={isRunDisabled}>Run</button
		>
	</div>
</div>

<style>
	.configure div {
		z-index: 50;
	}
</style>
