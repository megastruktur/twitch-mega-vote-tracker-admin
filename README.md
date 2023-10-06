# Mega Vote Tracker Twitch extension Admin page

## Description
Admin area for the vote tracker Twitch extension.

## Tech Spec
- Sveltekit (https://kit.svelte.dev)
- Pocketbase (https://pocketbase.io)
- Skeleton (https://www.skeleton.dev)
- CORS-container (https://github.com/imjacobclark/cors-container)

## Notes

### Steam Web API Cors
- Steam Web API won't allow you to access it from your client, so I've deployed a CORS proxy using Cors-container docker image (taken from github, `that's important` as the package on dockerhub is outdated and won't allow Access-Control-Allow-Origin setting)

### .env.local / .env
PUBLIC_POCKETBASE_URL=

PUBLIC_CORS_PROXY_URL=
