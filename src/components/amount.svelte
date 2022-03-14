<script lang="ts" context="module">
  let instance = 0;
</script>

<script lang="ts">
  instance++;

  export let label: string = "";
  export let min: number = 1;
  export let max: number = 1;
  export let value: number = 1;

  let inputId: string = `cust_amount_${instance}`;

  function increment() {
    if (value < max) {
      value++;
    }
  }

  function decrement() {
    if (value > min) {
      value--;
    }
  }

  function cleanInput(e) {
    value =
      Number(e.currentTarget.value) <= min
        ? min
        : Math.trunc(Number(e.currentTarget.value));
  }

  function preventBackspace(e) {
    let keys = [8];
    if (keys.includes(e.keyCode)) e.preventDefault();
  }
</script>

<div class="cust-amount-input h-10 w-full mb-5">
  <label
    for={inputId}
    class="w-full text-gray-700 text-sm font-semibold"
    >{label}
  </label>
  <div
    class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1"
  >
    <button
      on:click={decrement}
      class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
    >
      <span class="m-auto text-2xl font-thin">−</span>
    </button>
    <input
      id={inputId}
      type="number"
      class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
      {value}
      {min}
      {max}
      on:keydown={preventBackspace}
      on:input={cleanInput}
    />
    <button
      on:click={increment}
      class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
    >
      <span class="m-auto text-2xl font-thin">+</span>
    </button>
  </div>
  <div class="clearboth" />
</div>

<style>
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .cust-amount-input input:focus {
    outline: none !important;
  }

  .cust-amount-input button:focus {
    outline: none !important;
  }
</style>
