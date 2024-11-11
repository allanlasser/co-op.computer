<script lang="ts">
	import type { Maybe } from '@/lib/utils/types';

	export let label = '';
	export let help = '';
	export let errors: Maybe<string[]> = [];
</script>

<label>
	{label}
	<slot />
	{#if errors}
		<ul class="error">
			{#each errors as error}
				<li>{error}</li>
			{/each}
		</ul>
	{/if}
	<div class="help">
		<slot name="help">
			<p class="help">{help}</p>
		</slot>
	</div>
</label>

<style>
	label {
		display: flex;
		flex-direction: column;
	}
	.help {
		font-family: var(--font-mono);
		font-size: var(--font-xs);
		font-weight: var(--font-norm);
		line-height: 1.5;
		color: var(--gray-5);
		&p,
		& p {
			margin: 0;
		}
		&:empty {
			display: none;
		}
	}

	ul {
		list-style-type: square;
		padding-left: 0.75rem;
		margin: 0;
	}

	li {
		margin: 0.125rem 0 0.125rem 0;
	}

	.error {
		opacity: 0.9;
		color: orangered;
		font-weight: 500;
		font-size: var(--font-xs);
		line-height: 1.4;
	}
</style>
