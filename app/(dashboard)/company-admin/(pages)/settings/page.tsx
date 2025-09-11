'use client';

import { useState } from 'react';
import ProfileSettings from '../settings/components/accounts/ProfileSettings';
import SecuritySettings from '../settings/components/accounts/SecuritySettings';
import LoginSessions from '../settings/components/accounts/loginSessions'; // fixed casing
import DangerZone from '../settings/components/accounts/DangerZone';
import ChangePasswordModal from '../settings/components/accounts/ChangePasswordModal';
import DeleteAccountModal from '../settings/components/accounts/DeleteAccountModal';

export default function AdminSettingsPage() {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <ProfileSettings />
      <SecuritySettings
        onChangePassword={() => setIsChangePasswordOpen(true)}
      />
      <LoginSessions />
      <DangerZone onDelete={() => setIsDeleteOpen(true)} />

      {/* Modals */}
      <ChangePasswordModal
        open={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
      <DeleteAccountModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      />
    </div>
  );
}
