<script lang="ts">
	export let size: number;
	export let amount: number;
	export let scale: number = 300;

	$: waterHeight = ((scale * 0.75) / 100) * Math.trunc((amount / size) * 100);
	$: pixelSize = `${scale}px`;
</script>

<div class="grid justify-center">
	<h3 class="text-xl font-bold text-center">Size: {size} gal., Amount: {amount}</h3>
	<div class="bucket mt-1" style:height={pixelSize} style:width={pixelSize}>
		<img src="../../static/bucket.png" alt="Bucket {size}" />
		<div class="water" style:height="{waterHeight}px" />
	</div>
</div>

<style>
	.bucket {
		position: relative;
		overflow: hidden;
	}
	.bucket img {
		position: absolute;
		top: 0;
		z-index: 75;
		height: 100%;
		width: 100%;
	}
	.bucket .water {
		z-index: 50;
		position: absolute;
		bottom: 0;
		width: 100%;
		background-color: blue;
		border-top-left-radius: 50%;
		border-top-right-radius: 50%;
		transition-duration: 500ms;
	}
</style>
