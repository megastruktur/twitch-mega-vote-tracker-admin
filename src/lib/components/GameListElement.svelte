<script lang="ts">
	import { pb } from "$lib/pocketbase";
	import type { GamesResponse } from "$lib/pocketbase-types";
	import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
	import VoteAddField from "./VoteAddField.svelte";

  export let game: GamesResponse
  export let activeGameId: string

  const modalStore = getModalStore();
  let ref: any = null;

  function activateVoteEdit(game: GamesResponse) {
    activeGameId = game.id
  }

  async function removeGameModal(game: GamesResponse) {
    const modal: ModalSettings = {
      type: 'confirm',
      // Data
      title: 'Remove game',
      body: `Are you sure you wish to remove ${game.name}?`,
      // TRUE if confirm pressed, FALSE if cancel pressed
      response: async (r: boolean) => {
        if (r) {
          await pb.collection("games").delete(game.id)
        }
      },
    };
    modalStore.trigger(modal);
  }


  onMount(() => {
    if (ref !== null) {
      ref.focus()
    }
  })
</script>

<div class="flex justify-between w-full relative">

  <button class="btn btn-icon-sm variant-filled-error" on:click={() => removeGameModal(game)}>x</button>
  <button
    class="flex-auto w-36 whitespace-break-spaces"
    on:click={() => activateVoteEdit(game)}
    >{game.name}</button>

  <div class="">{game.votesTotal}</div>
  {#if activeGameId === game.id}
    <div class="absolute right-0">
      <VoteAddField {game} bind:activeGameId={activeGameId} />
    </div>
  {/if}
</div>
