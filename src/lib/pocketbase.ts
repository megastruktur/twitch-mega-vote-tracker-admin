import Pocketbase from "pocketbase"
import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
import { writable } from "svelte/store"

const pocketbaseUrl = PUBLIC_POCKETBASE_URL

export const pb = new Pocketbase(pocketbaseUrl)
pb.autoCancellation(false)


export const currentUser = writable(pb.authStore.model)

pb.authStore.onChange((auth) => {
  console.log("AuthStore changed", auth)
  currentUser.set(pb.authStore.model)
  if (document !== undefined) {
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
  }
})

try {
  if (!pb.authStore.isValid) {
    currentUser.set(null)
  }
} catch (_) {
  console.log("Error")
}

export async function logout() {
  pb.authStore.clear()
  currentUser.set(null)
}
