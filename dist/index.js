// src/AppLayout.tsx
import { createContext, useContext } from "react";
import { Layout, AppBar, UserMenu, Logout } from "react-admin";
import { Box, Typography } from "@mui/material";
import { jsx, jsxs } from "react/jsx-runtime";
var AppLayoutContext = createContext({});
var CustomUserMenu = () => {
  const { userMenuItems } = useContext(AppLayoutContext);
  return /* @__PURE__ */ jsxs(UserMenu, { children: [
    userMenuItems,
    /* @__PURE__ */ jsx(Logout, {})
  ] });
};
var CustomAppBar = () => {
  const { version } = useContext(AppLayoutContext);
  return /* @__PURE__ */ jsxs(AppBar, { userMenu: /* @__PURE__ */ jsx(CustomUserMenu, {}), children: [
    /* @__PURE__ */ jsx(Box, { flex: 1 }),
    version && /* @__PURE__ */ jsxs(Typography, { variant: "caption", color: "inherit", sx: { opacity: 0.7, mr: 1 }, children: [
      "v",
      version
    ] })
  ] });
};
var AppLayout = ({ version, userMenuItems, ...props }) => /* @__PURE__ */ jsx(AppLayoutContext.Provider, { value: { version, userMenuItems }, children: /* @__PURE__ */ jsx(Layout, { ...props, appBar: CustomAppBar }) });

// src/ChangePasswordDialog.tsx
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box as Box2,
  MenuItem
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useNotify } from "react-admin";
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ChangePasswordMenuItem = ({
  endpoint = "/admin/change-password",
  tokenKey = "admin_token"
}) => {
  const notify = useNotify();
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const reset = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirm("");
  };
  const handleSubmit = async () => {
    if (newPassword !== confirm) {
      notify("New passwords do not match", { type: "error" });
      return;
    }
    setSaving(true);
    try {
      const token = localStorage.getItem(tokenKey);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        notify(body.error ?? "Failed to change password", { type: "error" });
        return;
      }
      notify("Password changed", { type: "success" });
      setOpen(false);
      reset();
    } catch {
      notify("Failed to change password", { type: "error" });
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsxs2(MenuItem, { onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsx2(LockIcon, { fontSize: "small", sx: { mr: 1 } }),
      "Change Password"
    ] }),
    /* @__PURE__ */ jsxs2(Dialog, { open, onClose: () => {
      setOpen(false);
      reset();
    }, maxWidth: "xs", fullWidth: true, children: [
      /* @__PURE__ */ jsx2(DialogTitle, { children: "Change Password" }),
      /* @__PURE__ */ jsx2(DialogContent, { children: /* @__PURE__ */ jsxs2(Box2, { display: "flex", flexDirection: "column", gap: 2, mt: 1, children: [
        /* @__PURE__ */ jsx2(
          TextField,
          {
            label: "Current password",
            type: "password",
            size: "small",
            value: oldPassword,
            onChange: (e) => setOldPassword(e.target.value),
            autoFocus: true
          }
        ),
        /* @__PURE__ */ jsx2(
          TextField,
          {
            label: "New password",
            type: "password",
            size: "small",
            value: newPassword,
            onChange: (e) => setNewPassword(e.target.value)
          }
        ),
        /* @__PURE__ */ jsx2(
          TextField,
          {
            label: "Confirm new password",
            type: "password",
            size: "small",
            value: confirm,
            onChange: (e) => setConfirm(e.target.value)
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs2(DialogActions, { children: [
        /* @__PURE__ */ jsx2(Button, { onClick: () => {
          setOpen(false);
          reset();
        }, children: "Cancel" }),
        /* @__PURE__ */ jsx2(
          Button,
          {
            variant: "contained",
            onClick: handleSubmit,
            disabled: !oldPassword || !newPassword || !confirm || saving,
            children: "Change Password"
          }
        )
      ] })
    ] })
  ] });
};
export {
  AppLayout,
  ChangePasswordMenuItem
};
//# sourceMappingURL=index.js.map