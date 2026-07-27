# OctoFit frontend

This Vite app serves as the presentation tier for the OctoFit multi-tier application.

## Environment configuration

Create a local environment file named `.env.local` in this folder and define `VITE_CODESPACE_NAME` if you want the app to target a Codespaces backend URL.

Example:

```env
VITE_CODESPACE_NAME=my-codespace
```

If `VITE_CODESPACE_NAME` is not set, the frontend falls back to `http://localhost:8000/api/`.
