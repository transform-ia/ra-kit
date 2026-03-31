import * as react_jsx_runtime from 'react/jsx-runtime';
import { LayoutProps } from 'react-admin';

interface AppLayoutConfig {
    version?: string;
    userMenuItems?: React.ReactNode;
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
declare function createAppLayout({ version, userMenuItems }?: AppLayoutConfig): (props: LayoutProps) => react_jsx_runtime.JSX.Element;
/**
 * Drop-in AppLayout with version string and extensible UserMenu.
 * For stable UserMenu state, prefer `createAppLayout()` called at module level.
 */
declare const AppLayout: (props: LayoutProps) => react_jsx_runtime.JSX.Element;

interface ChangePasswordMenuItemProps {
    /** API endpoint for changing password. Default: `/admin/change-password` */
    endpoint?: string;
    /** localStorage key holding the Bearer token. Default: `admin_token` */
    tokenKey?: string;
}
declare const ChangePasswordMenuItem: ({ endpoint, tokenKey, }: ChangePasswordMenuItemProps) => react_jsx_runtime.JSX.Element;

export { AppLayout, ChangePasswordMenuItem, createAppLayout };
