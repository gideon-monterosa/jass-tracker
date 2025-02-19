<script lang="ts">
	import '../app.css';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	let { children } = $props();
</script>

<Navbar>
	<NavBrand href="/">
		<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">jass</span>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/games">New Game</NavLi>
		<NavLi href="/games/browse">Browse Games</NavLi>
		<NavLi href="/stats">Stats</NavLi>
	</NavUl>
</Navbar>

{@render children()}
