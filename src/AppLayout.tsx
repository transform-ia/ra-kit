import { Layout, AppBar, UserMenu, Logout } from 'react-admin'
import type { LayoutProps } from 'react-admin'
import { Box, Typography } from '@mui/material'

interface AppLayoutConfig {
  version?: string
  userMenuItems?: React.ReactNode
}

/**
 * Creates a stable AppLayout with fixed AppBar and UserMenu.
 * Call this at MODULE LEVEL (not inside a component) so that
 * CustomAppBar and CustomUserMenu are stable references — react-admin
 * remounts AppBar on new component references, resetting UserMenu state.
 *
 * @example
 * // In your AppLayout.tsx — at module level, not inside a component
 * export const AppLayout = createAppLayout({
 *   version: __APP_VERSION__,
 *   userMenuItems: <ChangePasswordMenuItem />,
 * })
 */
export function createAppLayout({ version, userMenuItems }: AppLayoutConfig = {}) {
  const CustomUserMenu = () => (
    <UserMenu>
      {userMenuItems}
      <Logout />
    </UserMenu>
  )

  const CustomAppBar = () => (
    <AppBar userMenu={<CustomUserMenu />}>
      <Box flex={1} />
      {version && (
        <Typography variant="caption" color="inherit" sx={{ opacity: 0.7, mr: 1 }}>
          v{version}
        </Typography>
      )}
    </AppBar>
  )

  return (props: LayoutProps) => <Layout {...props} appBar={CustomAppBar} />
}

/**
 * Drop-in AppLayout with version string and extensible UserMenu.
 * For stable UserMenu state, prefer `createAppLayout()` called at module level.
 */
export const AppLayout = createAppLayout()
