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
		outline: 1px solid var(--hardware-inset);
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
	}

	.switch-off {
		transform: rotateY(0deg) skewY(0deg) translateY(0);
		&::before {
			content: unset;
		}
	}
	.switch-on {
		transform: rotateY(15deg) skewY(15deg) translateY(-0.4em) translateX(0.15em);
		&::before {
			content: '';
			position: absolute;
			width: 0.4em;
			height: 2.5em;
			left: -0.4em;
			bottom: -0.45em;
			transform: skewY(-65deg);
			background-color: #a3310f;
		}
	}
	.illuminated .switch-off {
		transform: rotateY(-15deg) skewY(-15deg) translateY(-0.4em) translateX(-0.15em);
		&::before {
			content: '';
			position: absolute;
			width: 0.4em;
			height: 2.5em;
			right: -0.4em;
			bottom: -0.5em;
			transform: skewY(65deg);
			background-color: #872d12;
		}
	}
	.illuminated .switch-on {
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
		background-color: #ff6637;
		filter: drop-shadow(0px 0px 1em #ff6637);
		transform: rotateY(0deg) skewY(0deg) translateY(0);
		&::before {
			content: unset;
		}
	}

	/* .switch-on {
		height: 2.4em;
		width: 2.75em;
		left: 0.85em;
		bottom: 0.4em;
		transform: rotateY(15deg) skewY(15deg);
	}

	.switch-off {
		right: 0.5em;
		bottom: 0;
		color: #fff;
	}

	.switch-on::before,
	.switch-off::before {
		content: '';
		position: absolute;
		width: 0.4em;
		height: 2.45em;
		bottom: -0.45em;
		background-color: #742810;
		transform: skewY(-65deg);
	}

	.switch-on::before {
		left: -0.4em;
	}

	.switch-off::before {
		right: -0.375em;
		background-color: transparent;
		transform: skewY(65deg);
	}

	input:checked + .switch-on {
		background-color: #ff6637;
		color: #fff;
		bottom: 0px;
		left: 0.5em;
		height: 2.5em;
		width: 3em;
		transform: rotate(0deg) skewX(0deg);
	}

	input:checked + .switch-on::before {
		background-color: transparent;
		width: 3.0833em;
	}

	input:checked + .switch-on + .switch-off {
		background-color: #cc522c;
		color: #fbefe0;
		bottom: 0.4em;
		right: 0.8em;
		height: 2.4em;
		width: 2.75em;
		transform: rotate(-15deg) skewX(-15deg);
	}

	input:checked + .switch-on + .switch-off::before {
		background-color: #742810;
	}

	
	input:focus + .switch-on {
		color: #fbefe0;
	}

	input:checked:focus + .switch-on {
		color: #fbefe0;
	}

	input:focus + .switch-on + .switch-off {
		color: #fbefe0;
	}

	input:checked:focus + .switch-on + .switch-off {
		color: #fbefe0;
	} */
</style>
