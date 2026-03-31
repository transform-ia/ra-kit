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

## Key Pattern: Use `createAppLayout()` at Module Level

react-admin remounts `AppBar` whenever the `appBar` prop receives a new component reference, which resets `UserMenu` state (menu closes immediately on click).

**Always call `createAppLayout()` at MODULE LEVEL**, never inside a component:

```tsx
// CORRECT — module level, stable references
export const AppLayout = createAppLayout({
  version: __APP_VERSION__,
  userMenuItems: <ChangePasswordMenuItem />,
})

// WRONG — new component created on every render → UserMenu resets
export const AppLayout = (props) => {
  const CustomAppBar = () => <AppBar .../>  // ← breaks UserMenu
  return <Layout appBar={CustomAppBar} />
}
```

The exported `AppLayout` component is a convenience default with no config. For any real app, use `createAppLayout()`.
