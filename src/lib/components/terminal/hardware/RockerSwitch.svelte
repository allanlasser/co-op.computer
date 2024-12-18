<script lang="ts">
	import { Minus, Circle } from 'lucide-svelte';

	export let on = false;
</script>

<div class="container" class:illuminated={on}>
	<label class="rocker">
		<input type="checkbox" bind:checked={on} />
		<span class="switch-on" on:click={() => (on = false)}><Minus size={20} /></span>
		<span class="switch-off" on:click={() => (on = true)}><Circle size={20} /></span>
	</label>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		filter: brightness(0.75);
		transform: filter 0.125s linear;
	}

	.container.illuminated {
		filter: brightness(1.05);
	}

	/* Switch starts here */
	.rocker {
		box-sizing: content-box;
		display: inline-block;
		position: relative;
		/*
  SIZE OF SWITCH
  ==============
  All sizes are in em - therefore
  changing the font-size here
  will change the size of the switch.
  See .rocker-small below as example.
  */
		font-size: 0.75em;
		font-weight: bold;
		text-align: center;
		text-transform: uppercase;
		display: flex;
		background-color: #6a210b;
		outline: 2px solid var(--black-3);
		border-radius: 4px;
	}

	.illuminated .rocker {
		position: relative;
		background-color: #a3310f;
	}

	.rocker input {
		opacity: 0;
		width: 0;
		height: 0;
	}
	.switch-on,
	.switch-off {
		position: relative;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 2.5em;
		width: 3em;
		color: #fbefe0;
		background-color: #cc522c;
		border: 1px solid var(--black-1);
	}
	.switch-off {
		transform: skewY(0deg) translateY(0);
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	.switch-on {
		transform: skewY(10deg) translateY(-0.275em);
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
	.illuminated .switch-off {
		transform: skewY(-10deg) translateY(-0.275em);
	}
	.illuminated .switch-on {
		background-color: #ff6637;
		filter: drop-shadow(0px 0px 1em #ff6637);
		transform: rotateY(0deg) skewY(0deg) translateY(0);
	}
</style>
