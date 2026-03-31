import { Layout, AppBar, UserMenu, Logout } from 'react-admin'
import type { LayoutProps } from 'react-admin'
import { Box, Typography } from '@mui/material'

interface AppLayoutProps extends LayoutProps {
  version?: string
  userMenuItems?: React.ReactNode
}

const makeCustomAppBar = (version?: string, userMenuItems?: React.ReactNode) => {
  const CustomUserMenu = () => (
    <UserMenu>
      {userMenuItems}
      <Logout />
    </UserMenu>
  )

  return () => (
    <AppBar userMenu={<CustomUserMenu />}>
      <Box flex={1} />
      {version && (
        <Typography variant="caption" color="inherit" sx={{ opacity: 0.7, mr: 1 }}>
          v{version}
        </Typography>
      )}
    </AppBar>
  )
}

export const AppLayout = ({ version, userMenuItems, ...props }: AppLayoutProps) => {
  const CustomAppBar = makeCustomAppBar(version, userMenuItems)
  return <Layout {...props} appBar={CustomAppBar} />
}
