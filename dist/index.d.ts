import * as react_jsx_runtime from 'react/jsx-runtime';
import { LayoutProps } from 'react-admin';

interface AppLayoutProps extends LayoutProps {
    version?: string;
    userMenuItems?: React.ReactNode;
}
declare const AppLayout: ({ version, userMenuItems, ...props }: AppLayoutProps) => react_jsx_runtime.JSX.Element;

interface ChangePasswordMenuItemProps {
    /** API endpoint for changing password. Default: `/admin/change-password` */
    endpoint?: string;
    /** localStorage key holding the Bearer token. Default: `admin_token` */
    tokenKey?: string;
}
declare const ChangePasswordMenuItem: ({ endpoint, tokenKey, }: ChangePasswordMenuItemProps) => react_jsx_runtime.JSX.Element;

export { AppLayout, ChangePasswordMenuItem };
