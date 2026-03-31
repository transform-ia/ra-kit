"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AppLayout: () => AppLayout,
  ChangePasswordMenuItem: () => ChangePasswordMenuItem
});
module.exports = __toCommonJS(index_exports);

// src/AppLayout.tsx
var import_react_admin = require("react-admin");
var import_material = require("@mui/material");
var import_jsx_runtime = require("react/jsx-runtime");
var makeCustomAppBar = (version, userMenuItems) => {
  const CustomUserMenu = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_admin.UserMenu, { children: [
    userMenuItems,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_admin.Logout, {})
  ] });
  return () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_admin.AppBar, { userMenu: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomUserMenu, {}), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Box, { flex: 1 }),
    version && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_material.Typography, { variant: "caption", color: "inherit", sx: { opacity: 0.7, mr: 1 }, children: [
      "v",
      version
    ] })
  ] });
};
var AppLayout = ({ version, userMenuItems, ...props }) => {
  const CustomAppBar = makeCustomAppBar(version, userMenuItems);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_admin.Layout, { ...props, appBar: CustomAppBar });
};

// src/ChangePasswordDialog.tsx
var import_react = require("react");
var import_material2 = require("@mui/material");
var import_Lock = __toESM(require("@mui/icons-material/Lock"), 1);
var import_react_admin2 = require("react-admin");
var import_jsx_runtime2 = require("react/jsx-runtime");
var ChangePasswordMenuItem = ({
  endpoint = "/admin/change-password",
  tokenKey = "admin_token"
}) => {
  const notify = (0, import_react_admin2.useNotify)();
  const [open, setOpen] = (0, import_react.useState)(false);
  const [oldPassword, setOldPassword] = (0, import_react.useState)("");
  const [newPassword, setNewPassword] = (0, import_react.useState)("");
  const [confirm, setConfirm] = (0, import_react.useState)("");
  const [saving, setSaving] = (0, import_react.useState)(false);
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_material2.MenuItem, { onClick: () => setOpen(true), children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_Lock.default, { fontSize: "small", sx: { mr: 1 } }),
      "Change Password"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_material2.Dialog, { open, onClose: () => {
      setOpen(false);
      reset();
    }, maxWidth: "xs", fullWidth: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.DialogTitle, { children: "Change Password" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_material2.Box, { display: "flex", flexDirection: "column", gap: 2, mt: 1, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_material2.TextField,
          {
            label: "Current password",
            type: "password",
            size: "small",
            value: oldPassword,
            onChange: (e) => setOldPassword(e.target.value),
            autoFocus: true
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_material2.TextField,
          {
            label: "New password",
            type: "password",
            size: "small",
            value: newPassword,
            onChange: (e) => setNewPassword(e.target.value)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_material2.TextField,
          {
            label: "Confirm new password",
            type: "password",
            size: "small",
            value: confirm,
            onChange: (e) => setConfirm(e.target.value)
          }
        )
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_material2.DialogActions, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.Button, { onClick: () => {
          setOpen(false);
          reset();
        }, children: "Cancel" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_material2.Button,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppLayout,
  ChangePasswordMenuItem
});
//# sourceMappingURL=index.cjs.map