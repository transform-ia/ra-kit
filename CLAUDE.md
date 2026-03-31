# ra-kit

Reusable React Admin components for TransformIA projects.

## Commands

```bash
npm run build   # Compile TypeScript → dist/ (ESM + CJS + types)
npm run dev     # Watch mode for local development
```

## Architecture

```
src/
  AppLayout.tsx          # Layout with versioned AppBar + extensible UserMenu
  ChangePasswordDialog.tsx  # "Change Password" MenuItem + Dialog
  index.ts               # Barrel export
dist/                    # Built output — committed to git (enables git dependencies)
```

## Adding a New Component

1. Create `src/MyComponent.tsx` with named export
2. Add peer deps to `package.json` if needed (not devDeps)
3. Export from `src/index.ts`
4. Run `npm run build` — commit `dist/` along with source

## Consuming as a Git Dependency

```bash
npm install github:transform-ia/ra-kit
```

In Dockerfile / CI, no registry auth needed — the repo is public and `dist/` is committed.

## Peer Dependencies

All MUI and react-admin packages are peer deps (not bundled). The consuming app must have:
`react`, `react-admin`, `@mui/material`, `@mui/icons-material`

## Key Pattern: AppLayout Uses React Context

`AppLayout` passes `version` and `userMenuItems` via `AppLayoutContext`, keeping `CustomAppBar` defined at module level (stable reference). Do NOT inline the AppBar component or pass a factory — react-admin remounts on new component references, breaking UserMenu state.
