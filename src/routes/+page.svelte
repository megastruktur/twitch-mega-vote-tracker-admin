<script lang="ts">
	import { pb } from "$lib/pocketbase";
	import type { GamesResponse } from "$lib/pocketbase-types";
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import type { UnsubscribeFunc } from "pocketbase";
	import { onDestroy } from "svelte";

	let games: GamesResponse[]

	let unsubscribeGames: UnsubscribeFunc

	async function getData() {
		unsubscribeGames = await pb.collection("games").subscribe("*", loadGames)
		await loadGames()
	}

	async function loadGames() {
		games = await pb.collection("games").getFullList({
			sort: "-votesTotal"
		})
	}

	onDestroy(() => {
		if (unsubscribeGames !== undefined) {
			unsubscribeGames()
		}
	})
</script>

{#await getData()}
	<ProgressBar />
{:then}
	{#if games !== undefined}
		<div class="w-96 ml-3">
			{#each games as game(game.id)}
				<div class="flex justify-between border-b text-xl">
					<span class="w-60 flex-wrap">{game.name}</span>
					<span class="w-10">{game.votesTotal}</span>
				</div>
			{/each}
		</div>
	{/if}
{/await}
