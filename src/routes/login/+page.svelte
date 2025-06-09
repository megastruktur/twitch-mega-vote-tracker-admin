<script lang="ts">
	import { goto } from "$app/navigation";
	import { pb, currentUser, logout } from "$lib/pocketbase";
	import { onDestroy } from "svelte";

  let email: string
  let password: string

  async function login() {
    try {
      const ad = await pb.collection('_superusers').authWithPassword(email, password);
      currentUser.set(ad)
      goto("/games")
    }
    catch (e) {
      console.error(e)
    }
  }
</script>

<div class="w-96 mx-auto h-screen flex flex-col items-center justify-center space-y-3">

  {#if !$currentUser || $currentUser.id === undefined}
    <label class="label w-full">
      <span>Email</span>
      <input class="input" type="text" placeholder="email" bind:value={email} />
    </label>
    
    <label class="label w-full">
      <span>Password</span>
      <input class="input" type="password" placeholder="password" bind:value={password} />
    </label>

    <button
      class="btn btn-lg variant-outline-success"
      type="submit"
      on:click={login}
      >Login</button>
  {:else}
    <h1 class="h1">Logged in as {$currentUser.email}</h1>
    <button class="btn btn-lg variant-filled-warning" on:click={logout}>Logout</button>
  {/if}
</div>
