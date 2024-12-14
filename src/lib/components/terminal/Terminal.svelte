<script lang="ts">
	import { PowerIcon, PowerOff } from 'lucide-svelte';
	import { get, writable } from 'svelte/store';
	import RockerSwitch from './hardware/RockerSwitch.svelte';
	import Screen from './hardware/Screen.svelte';
	import Logo from './hardware/Logo.svelte';
	import Vents from './hardware/Vents.svelte';
	import StatusLED, { type Status } from './hardware/StatusLED.svelte';
	import Dialog from '../ui/Dialog.svelte';
	import OS from './software/OS.svelte';

	const isPoweredOn = writable(false);
	const isSignedIn = writable(false);

	function powerOn() {
		isPoweredOn.set(!get(isPoweredOn));
		promptSignIn();
	}

	function powerOff() {
		isPoweredOn.set(false);
		signOut();
	}

	function promptSignIn() {
		// Logic to prompt for sign in
		isSignedIn.set(true);
	}

	function signOut() {
		// Logic to sign out
		isSignedIn.set(false);
	}

	function togglePower() {
		isPoweredOn.update((value) => !value);
	}

	let status: Status;
	$: status = $isPoweredOn ? 'ok' : 'idle';
</script>

<div class="terminal" class:powered-off={!$isPoweredOn}>
	<Screen powered={$isPoweredOn}>
		{#if $isPoweredOn}
			<OS>
				<Dialog hideClose>
					<p>Welcome to CO-OP!</p>
				</Dialog>
			</OS>
		{/if}
	</Screen>
	<div class="hardware-controls">
		<Logo />
		<div class="hardware-controls">
			<StatusLED {status} />
			<RockerSwitch bind:on={$isPoweredOn} />
		</div>
	</div>
</div>

<style>
	.terminal {
		display: flex;
		margin: 0 auto;
		width: 53rem;
		height: 52rem;
		padding: 1.5rem 1.5rem 0.75rem 1.5rem;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		flex-shrink: 0;
		background: var(--hardware);
		background: linear-gradient(0deg, rgba(255, 219, 183, 0.16) 0%, rgba(255, 219, 183, 0.16) 100%),
			var(--hardware);
		background-blend-mode: lighten, normal;
		border-radius: 2rem;
		border-bottom-right-radius: 1rem;
		border-bottom-left-radius: 1rem;
	}

	.hardware-controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2.25rem;
		align-self: stretch;
	}
</style>
