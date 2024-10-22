<nav class="page">
	<a class="home center" href="/">
		<h1><span class="co">co</span><span class="hyphen">-</span><span class="op">op</span></h1>
	</a>
</nav>

<style>
	nav {
		flex: 0 1 auto;
		display: grid;
		justify-content: center;
		align-items: stretch;
		grid-template-columns: 1fr;
		gap: calc(3 * var(--unit));
		padding: var(--unit) calc(2 * var(--unit));
		/* border-right: 2px solid var(--gray-1); */
	}
	nav a {
		display: block;
		text-decoration: none;
	}
	.right {
		text-align: right;
	}
	.left {
		text-align: left;
	}
	.center {
		text-align: center;
	}
	.account {
		display: flex;
		align-items: baseline;
		gap: var(--unit);
		font-size: var(--font-md);
		font-weight: var(--font-semi);
		padding: 0.5rem;
		border-radius: var(--br-3);
		border: 2px solid transparent;
		&:hover,
		&:focus {
			border: 2px solid var(--gray-2);
			box-shadow: 0 2px 0 var(--gray-2);
		}
		&:active {
			transform: translateY(2px);
			box-shadow: none;
		}
	}
	.signout {
		display: flex;
		fill: orangered;
		text-align: center;
	}
	.home {
		text-align: center;
		text-decoration: none;
		padding: 0.25rem 0.5rem;
		border-radius: var(--br-3);
		border: 2px solid transparent;
		&:hover,
		&:focus {
			border: 2px solid var(--gray-2);
			box-shadow: 0 2px 0 var(--gray-2);
		}
		&:active {
			transform: translateY(2px);
			box-shadow: none;
		}
	}
	.home h1 {
		font-size: calc(1.5 * var(--font-xl));
		font-weight: var(--font-bold);
		text-transform: uppercase;
	}
	.home p {
		font-size: var(--font-xs);
		font-weight: var(--font-semi);
		opacity: var(--o-70);
	}
	.co,
	.op,
	.hyphen {
		display: inline-block;
		color: var(--interactive);
		-webkit-text-stroke: 0.09375rem;
		-webkit-text-fill-color: transparent;
		letter-spacing: 0.0625rem;
	}
	.co {
		color: teal;
		-webkit-text-stroke-color: teal;
	}
	.op {
		color: orangered;
		-webkit-text-stroke-color: orangered;
	}
	.hyphen {
		color: indigo;
		-webkit-text-stroke-color: indigo;
	}
</style>
