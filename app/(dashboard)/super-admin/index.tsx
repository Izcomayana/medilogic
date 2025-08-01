import { RoleGuard } from '@/components/RoleGuard'
import React from 'react'

export const SuperAdmin = () => {
  return (
        <RoleGuard allowedRoles={["super_admin"]}>
      <SuperAdmin />
    </RoleGuard>
  )
}
