<script context="module">
  export const prerender = true;
</script>
<script>
	import { onMount } from 'svelte';
	import { search } from '../search.js';

	let searchInput;
	let ready = false;
	let searchTerm = '';
	let limit = 25;

	$: results = search({ searchTerm, limit });
	onMount(() => {
		ready = true;
		searchInput.focus();
	});
</script>

<h1>ICD-10 search (in browser)</h1>

<form hidden={!ready} on:submit|preventDefault={() => {}}>
	<label for="ICD_10_search">Search Text: </label>
	<input
		id="ICD_10_search"
		bind:this={searchInput}
		disabled={!results}
		type="text"
		bind:value={searchTerm}
		placeholder="Search"
	/>
	<button
		on:click={() => {
			limit = 25;
			searchTerm = '';
		}}>reset</button
	>
</form>
{#await results}
	<div>Loading ICD-10 Index...</div>
{:then results}
	<label for="resultlist">Results ({results.data.length} of {results.meta.count}):</label>
	<ol id="resultlist">
		{#each results.data as result}
			<li>
				<code
					><a href={`https://www.aapc.com/codes/icd-10-codes/${result?.CONCEPT_CODE}`}
						>{result?.CONCEPT_CODE}</a
					></code
				>: {result?.VALUE}
			</li>
		{/each}
	</ol>
	{#if results.meta.count === 0}
		<div>No Results yet</div>
	{/if}
	{#if results.meta.count > results.data.length}
		<button
			on:click={() => {
				limit = limit * 2;
			}}
			value="More">More</button
		>
		<button
			on:click={() => {
				limit = results.meta.count;
			}}
			value="Show All">Show All {results.meta.count}</button
		>
	{/if}
{:catch fail}something promised did not work out as planned {fail}
{/await}
