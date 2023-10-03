<script lang="ts">
	import { pb } from "$lib/pocketbase";
	import type { GamesResponse } from "$lib/pocketbase-types";
	import { getGameAppId, getSteamGameData } from "$lib/steamGame";
	import { ProgressRadial } from "@skeletonlabs/skeleton";
	import { onDestroy, onMount } from "svelte";
	import GameListElement from "$lib/components/GameListElement.svelte";
	import { flip } from "svelte/animate";
	import { quintOut } from "svelte/easing";

  let games: GamesResponse[]
  let addGameUrl: string
  let activeGameId: string = ""

  async function getData() {

    games = await pb.collection("games").getFullList({
      sort: "-votesTotal"
    })
  }

  async function addGame() {
    console.log(addGameUrl)

    const gameAppId = getGameAppId(addGameUrl)
    const steamGameData = await getSteamGameData(gameAppId)

    const game = {
      name: steamGameData.name,
      steamLink: addGameUrl,
      votesTotal: 0
    }
    console.log(game)

    try {
      const record = await pb.collection("games").create(game);
      const recordSteamGameData = await pb.collection("steam_game_data").create({...steamGameData, game: record.id });
    } catch (error) {
      console.error(error);
    }

    addGameUrl = ""
  }

  onMount(async() => {
		pb.collection("games").subscribe("*", async (e) => {
			getData()
		})
  })

  onDestroy(async() => {
    pb.realtime.unsubscribe("games");
  })

</script>

<div class="mx-auto items-center w-96">
  {#await getData()}
    <ProgressRadial />
  {:then}
    <dl class="list-dl">
      {#each games as game(game.id)}
        <div animate:flip={{ delay: 250, duration: 250, easing: quintOut }}>
          <GameListElement {game} bind:activeGameId={activeGameId} />
        </div>
      {/each}

      <div>
        <input type="text" class="input" placeholder="Steam URL" bind:value={addGameUrl} />
        <button class="btn btn-icon variant-filled-success" on:click={addGame}>+</button>
      </div>
    </dl>
  {/await}

</div>
