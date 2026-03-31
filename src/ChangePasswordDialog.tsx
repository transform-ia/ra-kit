import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { useNotify } from 'react-admin'

interface ChangePasswordMenuItemProps {
  /** API endpoint for changing password. Default: `/admin/change-password` */
  endpoint?: string
  /** localStorage key holding the Bearer token. Default: `admin_token` */
  tokenKey?: string
}

export const ChangePasswordMenuItem = ({
  endpoint = '/admin/change-password',
  tokenKey = 'admin_token',
}: ChangePasswordMenuItemProps) => {
  const notify = useNotify()
  const [open, setOpen] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [saving, setSaving] = useState(false)

  const reset = () => {
    setOldPassword('')
    setNewPassword('')
    setConfirm('')
  }

  const handleSubmit = async () => {
    if (newPassword !== confirm) {
      notify('New passwords do not match', { type: 'error' })
      return
    }
    setSaving(true)
    try {
      const token = localStorage.getItem(tokenKey)
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        notify((body as { error?: string }).error ?? 'Failed to change password', { type: 'error' })
        return
      }
      notify('Password changed', { type: 'success' })
      setOpen(false)
      reset()
    } catch {
      notify('Failed to change password', { type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <MenuItem onClick={() => setOpen(true)}>
        <LockIcon fontSize="small" sx={{ mr: 1 }} />
        Change Password
      </MenuItem>

      <Dialog open={open} onClose={() => { setOpen(false); reset() }} maxWidth="xs" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Current password"
              type="password"
              size="small"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              autoFocus
            />
            <TextField
              label="New password"
              type="password"
              size="small"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Confirm new password"
              type="password"
              size="small"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false); reset() }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!oldPassword || !newPassword || !confirm || saving}
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
