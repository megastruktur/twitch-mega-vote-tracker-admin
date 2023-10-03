<script lang="ts">
	import { pb } from "$lib/pocketbase";
	import type { GamesResponse } from "$lib/pocketbase-types";
	import { onMount } from "svelte";

  export let game: GamesResponse
  export let activeGameId: string
  let ref: any = null
  let voteAmount: number

  function focusOut() {
    if (voteAmount === undefined || voteAmount === 0) {
      activeGameId = ""
    }
  }

  async function gameAddVote() {
    
    if (voteAmount !== 0) {
    
      try {
        await pb.collection("votes").create({
          game: game.id,
          amount: voteAmount
        })
    
        await pb.collection("games").update(game.id, {
          votesTotal: game.votesTotal + voteAmount
        })
      }
      catch (error) {
        console.log(error)
      }
    }

    activeGameId = ""
  }

  onMount(() => {
    if (ref !== null) {
      ref.focus()
    }
  })
</script>

<form>
  
  <input
    class="input remove-arrow w-20" type=number
    bind:this={ref} bind:value={voteAmount}
    on:focusout={focusOut}
    />

    <button class="btn btn-icon-sm variant-filled-tertiary" on:click={gameAddVote}>+</button>

</form>
