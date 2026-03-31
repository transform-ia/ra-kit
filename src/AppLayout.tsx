import { createContext, useContext } from 'react'
import { Layout, AppBar, UserMenu, Logout } from 'react-admin'
import type { LayoutProps } from 'react-admin'
import { Box, Typography } from '@mui/material'

interface AppLayoutConfig {
  version?: string
  userMenuItems?: React.ReactNode
}

const AppLayoutContext = createContext<AppLayoutConfig>({})

const CustomUserMenu = () => {
  const { userMenuItems } = useContext(AppLayoutContext)
  return (
    <UserMenu>
      {userMenuItems}
      <Logout />
    </UserMenu>
  )
}

const CustomAppBar = () => {
  const { version } = useContext(AppLayoutContext)
  return (
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

interface AppLayoutProps extends LayoutProps {
  version?: string
  userMenuItems?: React.ReactNode
}

export const AppLayout = ({ version, userMenuItems, ...props }: AppLayoutProps) => (
  <AppLayoutContext.Provider value={{ version, userMenuItems }}>
    <Layout {...props} appBar={CustomAppBar} />
  </AppLayoutContext.Provider>
)
