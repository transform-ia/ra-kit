# @transform-ia/ra-kit

Reusable [React Admin](https://marmelab.com/react-admin/) components for TransformIA projects.

## Install

```bash
npm install github:transform-ia/ra-kit
```

## Components

### `AppLayout`

Drop-in layout with a versioned AppBar and extensible UserMenu.

```tsx
import { AppLayout, ChangePasswordMenuItem } from '@transform-ia/ra-kit'

declare const __APP_VERSION__: string

export const MyLayout = (props) => (
  <AppLayout
    {...props}
    version={__APP_VERSION__}
    userMenuItems={<ChangePasswordMenuItem />}
  />
)

// In App.tsx:
<Admin layout={MyLayout} ...>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `version` | `string` | — | Shown in AppBar (e.g. `v1.2.3`) |
| `userMenuItems` | `ReactNode` | — | Extra items before Logout in the user menu |

### `ChangePasswordMenuItem`

A `MenuItem` that opens a dialog to change the current user's password (requires old password).

```tsx
import { ChangePasswordMenuItem } from '@transform-ia/ra-kit'

<ChangePasswordMenuItem
  endpoint="/admin/change-password"   // default
  tokenKey="admin_token"              // default — localStorage key for Bearer token
/>
```

The endpoint receives `POST { old_password, new_password }` with `Authorization: Bearer <token>`.

## Peer Dependencies

```json
"react": ">=18",
"react-admin": ">=5",
"@mui/material": ">=5",
"@mui/icons-material": ">=5"
```

## Development

```bash
npm run build   # build dist/
npm run dev     # watch mode
```

Commit `dist/` — it's required for git dependency installs to work without a build step.
